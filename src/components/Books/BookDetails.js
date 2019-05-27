import React, { Component } from 'react';
import { compose } from 'recompose';
import { withGoogleBooks } from '../GoogleBooks';
import CheckoutButton from '../Checkout';
import { withAuthorization, AuthUserContext } from '../Session';

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
                  src={book.image}
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
              <AuthUserContext.Consumer>
                {authUser => (
                  <CheckoutButton book={book} authUser={authUser} />
                )}
              </AuthUserContext.Consumer>
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

const condition = authUser => !!authUser;

export default compose(
  withGoogleBooks,
  withAuthorization(condition),
)(BookDetails);
