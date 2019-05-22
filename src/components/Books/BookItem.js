import React, { Component } from 'react';

class BookItem extends Component {
  render() {
    const { book } = this.props;

    return (
      <React.Fragment>
        <h4>Title: {book.title}</h4>
      </React.Fragment>
    );
  }
}

export default BookItem;
