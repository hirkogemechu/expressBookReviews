const express = require('express');
const router = express.Router();
const books = require('./final_project/index.js'); // or './router/index.js'

// Get all books
router.get('/', async (req, res) => {
    const allBooks = await books.getAllBooks();
    res.json(allBooks);
});

// Get books by ISBN
router.get('/isbn/:isbn', async (req, res) => {
    const book = await books.getBookByISBN(req.params.isbn);
    res.json(book || { message: "Book not found" });
});

// Get books by author
router.get('/author/:author', async (req, res) => {
    const booksByAuthor = await books.getBooksByAuthor(req.params.author);
    res.json(booksByAuthor);
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    const booksByTitle = await books.getBooksByTitle(req.params.title);
    res.json(booksByTitle);
});

// Get book review
router.get('/review/:isbn', async (req, res) => {
    const review = await books.getBookReview(req.params.isbn);
    res.json(review || { message: "No reviews found" });
});

// Add/Modify review (requires authentication)
router.put('/review/:isbn', async (req, res) => {
    const username = req.session.username; // Or from JWT token
    const review = req.body.review;
    const result = await books.addOrModifyReview(req.params.isbn, username, review);
    res.json(result);
});

// Delete review (requires authentication)
router.delete('/review/:isbn', async (req, res) => {
    const username = req.session.username; // Or from JWT token
    const result = await books.deleteReview(req.params.isbn, username);
    res.json(result);
});

module.exports = router;
