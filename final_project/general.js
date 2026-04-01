// final_project/general.js
const axios = require('axios');

const API_URL = 'http://localhost:5000';

// Book data as backup (in case API fails)
let books = [
    { "isbn": "9781593275846", "title": "Eloquent JavaScript", "author": "Marijn Haverbeke", "reviews": {} },
    { "isbn": "9781449331818", "title": "JavaScript: The Good Parts", "author": "Douglas Crockford", "reviews": {} },
    { "isbn": "9781491952023", "title": "Programming JavaScript Applications", "author": "Eric Elliott", "reviews": {} },
    { "isbn": "9780134685991", "title": "Effective Java", "author": "Joshua Bloch", "reviews": {} },
    { "isbn": "9780201616224", "title": "The Pragmatic Programmer", "author": "Andrew Hunt", "reviews": {} },
    { "isbn": "9780132350884", "title": "Clean Code", "author": "Robert C. Martin", "reviews": {} },
    { "isbn": "9780596007126", "title": "Head First Design Patterns", "author": "Eric Freeman", "reviews": {} },
    { "isbn": "9780131103627", "title": "The C Programming Language", "author": "Brian Kernighan", "reviews": {} },
    { "isbn": "9780321356680", "title": "Introduction to Algorithms", "author": "Thomas H. Cormen", "reviews": {} },
    { "isbn": "9780134494166", "title": "Refactoring", "author": "Martin Fowler", "reviews": {} }
];

// Users array for registration/login
let users = [
    {
        "username": "admin",
        "password": "admin123"
    }
];

// Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        return books;
    }
}

// Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${API_URL}/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        return books.find(book => book.isbn === isbn) || null;
    }
}

// Get books by author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${API_URL}/author/${encodeURIComponent(author)}`);
        return response.data;
    } catch (error) {
        return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
    }
}

// Get books by title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${API_URL}/title/${encodeURIComponent(title)}`);
        return response.data;
    } catch (error) {
        return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }
}

// Get book review
async function getBookReview(isbn) {
    try {
        const response = await axios.get(`${API_URL}/review/${isbn}`);
        return response.data;
    } catch (error) {
        const book = books.find(book => book.isbn === isbn);
        return book ? book.reviews : null;
    }
}

// Add or modify review
async function addOrModifyReview(isbn, username, review) {
    try {
        const response = await axios.put(`${API_URL}/review/${isbn}`, { review });
        return response.data;
    } catch (error) {
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            if (!book.reviews) book.reviews = {};
            book.reviews[username] = review;
            return { message: "Review successfully added/updated.", reviews: book.reviews };
        }
        return { message: "Book not found" };
    }
}

// Delete review
async function deleteReview(isbn, username) {
    try {
        const response = await axios.delete(`${API_URL}/review/${isbn}`);
        return response.data;
    } catch (error) {
        const book = books.find(book => book.isbn === isbn);
        if (book && book.reviews && book.reviews[username]) {
            delete book.reviews[username];
            return { message: "Review successfully deleted." };
        }
        return { message: "Review not found" };
    }
}

// Register a new user
async function registerUser(username, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        // Fallback to local user storage if API not available
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return { message: "User already exists!" };
        }
        users.push({ username, password });
        return { message: `User ${username} registered successfully!` };
    }
}

// Login user
async function loginUser(username, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        // Fallback to local user storage if API not available
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            return { message: "Login successful!", username: username };
        }
        return { message: "Invalid username or password!" };
    }
}

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyReview,
    deleteReview,
    registerUser,
    loginUser
};
