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

    this.query = this.props.firebase.loans();

    if (!this.props.all)
      this.query = this.query.where(
        'user.id',
        '==',
        this.props.authUser.id,
      );

    this.query = this.query.onSnapshot(snapshot => {
      if (snapshot.size) {
        let loans = [];

        snapshot.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ loading: false, loans: loans });
      } else {
        this.setState({ loans: null, loading: false });
      }
    });
  };

  componentWillUnmount() {
    this.query();
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
