import React from 'react';
import { withFirebase } from '../Firebase';

function CheckoutButton(props) {
  const { firebase, book, authUser } = props;

  return (
    <button
      className="waves-effect waves-light btn-large"
      onClick={firebase.createLoan.bind(firebase, authUser, book)}
    >
      <i className="material-icons">book</i>
      Checkout
    </button>
  );
}

export default withFirebase(CheckoutButton);
