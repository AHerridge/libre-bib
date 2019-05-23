import React, { Component } from 'react';

class LoanItem extends Component {
  render() {
    const { loan } = this.props;

    return (
      <React.Fragment>
        <li>
          <p>
            ID: {loan.id ? loan.id : 'Not Found'}
            Book: {loan.book ? loan.book.title : 'Not Found'}
            User: {loan.user ? loan.user.username : 'Not Found'}
          </p>
        </li>
      </React.Fragment>
    );
  }
}

export default LoanItem;
