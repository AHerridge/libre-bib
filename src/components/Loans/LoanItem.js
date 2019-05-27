import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class LoanItem extends Component {
  render() {
    const { loan, firebase, all } = this.props;

    return (
      <tr>
        {/* <td>{loan.id ? loan.id : 'Not Found'}</td> */}
        <td>{loan.book ? loan.book.title : 'Not Found'}</td>
        {all && loan.user && <td>{loan.user.username}</td>}
        <td>
          {loan.checkoutDate
            ? new Date(loan.checkoutDate).toLocaleDateString()
            : 'Not Found'}
        </td>
        <td>
          {loan.dueDate
            ? new Date(loan.dueDate).toLocaleDateString()
            : 'Not Found'}
        </td>
        <td>
          <a href="#">
            <i
              className="material-icons red-text text-darken-2"
              onClick={firebase.deleteLoan.bind(firebase, loan.id)}
            >
              delete
            </i>
          </a>
        </td>
      </tr>
    );
  }
}

export default withFirebase(LoanItem);
