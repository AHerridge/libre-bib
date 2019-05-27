import axios from 'axios';
import Book from '../Books/Book';

const api_key = 'AIzaSyDJTAUgkEgJ6ht7pTLk1osRm4cFPgqn9hw';

class GoogleBooks {
  async findAll(q) {
    let books = [];

    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?&q=${q}&key=${api_key}`,
      )
      .then(res => {
        let book = res.data.items.forEach(item => {
          book = { id: item.id, ...item.volumeInfo };
          books.push(book);
        });
      });

    return books.map(toBook);
  }

  async findOne(q) {
    let book = null;

    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?&q=${q}&maxResults=1&key=${api_key}`,
      )
      .then(res => {
        if (res.data.items) {
          let item = res.data.items[0];
          let gbook = { id: item.id, ...item.volumeInfo };
          book = toBook(gbook);
        }
      });

    return book;
  }
}

const toBook = gbook => {
  const { id, title, authors, description } = gbook;
  const image = gbook.imageLinks.thumbnail;
  return Book(id, title, authors, description, image);
};

export default GoogleBooks;
