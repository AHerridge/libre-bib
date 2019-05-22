import axios from 'axios';

const api_key = 'AIzaSyDJTAUgkEgJ6ht7pTLk1osRm4cFPgqn9hw';

class GoogleBooks {
  async findAll(q) {
    let books = [];

    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?&q=${q}&key=${api_key}`,
      )
      .then(res => {
        let book = res.data.items[0].volumeInfo;
        books.push(book);
      });

    return books;
  }

  async findOne(q) {
    let book = {};

    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?&q=${q}&maxResults=1&key=${api_key}`,
      )
      .then(res => {
        book = res.data.items[0].volumeInfo;
      });

    return book;
  }
}

export default GoogleBooks;