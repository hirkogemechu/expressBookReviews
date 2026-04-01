const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if username is available (not already registered)
const isValid = (username) => {
    return !users.some(user => user.username === username);
}

// Check if username and password match a registered user
const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
}

// Only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (authenticatedUser(username, password)) {
        // Create a JWT token (expires in 1 hour)
        const accessToken = jwt.sign(
            { username },
            'secret_key', // change this to a secure key in production
            { expiresIn: '1h' }
        );
        return res.status(200).json({ message: "Login successful", token: accessToken });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { username } = req.body; // you could also extract from JWT in real scenario
    const { review } = req.body;
    const isbn = req.params.isbn;

    if (!username || !review) {
        return res.status(400).json({ message: "Username and review are required" });
    }

    const book = books[isbn];
    if (book) {
        book.reviews = book.reviews || {};
        book.reviews[username] = review;
        return res.status(200).json({ message: "Review added/updated", reviews: book.reviews });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
