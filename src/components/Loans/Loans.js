import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withGoogleBooks } from '../GoogleBooks';
import LoanList from './LoanList';

class Loans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loans: [],
    };
  }

  componentDidMount() {
    this.onListenForLoans();
  }

  onListenForLoans = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .loans()
      .where('userId', '==', 'HBhOkecqgQfeKTvE2Sy9fpVPIb23')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let loans = [];
          snapshot.forEach(doc => {
            let loan = { id: doc.id, book: {}, user: {} };

            console.log(doc.data().bookId);
            this.props.googlebooks
              .findOne(`isbn: ${doc.data().bookId}`)
              .then(result => {
                loans[loans.indexOf(loan)].book = result;
                this.setState({ loans });
              });

            console.log(doc.data().userId);
            this.props.firebase
              .user(doc.data().userId)
              .get()
              .then(result => {
                loans[loans.indexOf(loan)].user = result.data();
                this.setState({ loans });
              });
            // TODO loan.user = authUser;
            loans.push(loan);
          });

          this.setState({
            loans: loans,
            loading: false,
          });
        } else {
          this.setState({ loans: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loans, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {loans && <LoanList authUser={authUser} loans={loans} />}

            {!loans && <div>There are no loans ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(
  withGoogleBooks,
  withFirebase,
)(Loans);
