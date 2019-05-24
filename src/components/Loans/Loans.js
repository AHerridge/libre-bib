import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { withGoogleBooks } from '../GoogleBooks';
import LoanList from './LoanList';

class Loans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.onListenForLoans();
  }

  onListenForLoans = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .loans()
      .where('userId', '==', this.props.authUser.id)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let loans = [];
          let loaded = 0;
          snapshot.forEach(doc => {
            let loan = {
              id: doc.id,
              book: {},
              user: this.props.authUser,
            };

            this.props.googlebooks
              .findOne(`isbn: ${doc.data().bookId}`)
              .then(result => {
                loans[loans.indexOf(loan)].book = result;

                loaded++;
                if (loaded === loans.length)
                  this.setState({ loans, loading: false });
              });

            loans.push(loan);
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
            <h3>Loans</h3>

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
  withAuthorization(authUser => !!authUser),
)(Loans);
