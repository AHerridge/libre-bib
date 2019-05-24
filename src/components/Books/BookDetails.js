import React, { Component } from 'react';
import { withGoogleBooks } from '../GoogleBooks';

class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.googlebooks
      .findOne(`${this.props.match.params.id}`)
      .then(book => {
        this.setState({ book });
      });
  }

  render() {
    const { book } = this.state;

    return (
      <div>
        {book ? (
          <div>
            <div className="row">
              <div className="col l4">
                <img
                  className="materialboxed responsive-img"
                  width="200"
                  src={book.imageLinks.thumbnail}
                  alt="Book Cover"
                />
              </div>
              <div className="col l8">
                <h3>{book.title}</h3>
                <h4>{book.authors}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p>{book.description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12" />
              <button className="waves-effect waves-light btn-large">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <center>
            <h4>
              Book with ID: {this.props.match.params.id} was not found
            </h4>
          </center>
        )}
      </div>
    );
  }
}

export default withGoogleBooks(BookDetails);
