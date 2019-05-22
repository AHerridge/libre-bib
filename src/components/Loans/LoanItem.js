import React, { Component } from 'react';

class LoanItem extends Component {
  render() {
    const { loan } = this.props;

    console.log(loan);

    return (
      <React.Fragment>
        <li>
          <h4>
            ID: {loan.id ? loan.id : 'Not Found'}
            Book: {loan.book ? loan.book.title : 'Not Found'}
            User: {loan.user ? loan.user.username : 'Not Found'}
          </h4>
        </li>
      </React.Fragment>
    );
  }
}

export default LoanItem;
