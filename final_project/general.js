const axios = require('axios');

const getAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/books');
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};

const getBooksByISBN = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};

const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/author/${encodeURIComponent(author)}`);
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};

const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/title/${encodeURIComponent(title)}`);
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};

// Example usage
getAllBooks();
getBooksByISBN(1);
getBooksByAuthor('Chinua Achebe');
getBooksByTitle('Things Fall Apart');
