// general.js - Using async/await with Axios

const axios = require('axios');

// Sample book data (replace with your actual data source)
let books = [
    {
        "isbn": "9781593275846",
        "title": "Eloquent JavaScript",
        "author": "Marijn Haverbeke",
        "reviews": {}
    },
    {
        "isbn": "9781449331818",
        "title": "JavaScript: The Good Parts",
        "author": "Douglas Crockford",
        "reviews": {}
    },
    {
        "isbn": "9781491952023",
        "title": "Programming JavaScript Applications",
        "author": "Eric Elliott",
        "reviews": {}
    }
];

// Task 1: Get all books
async function getAllBooks() {
    try {
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

// Task 2: Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        return books.find(book => book.isbn === isbn) || null;
    } catch (error) {
        console.error("Error fetching book by ISBN:", error);
        return null;
    }
}

// Task 3: Get books by author
async function getBooksByAuthor(author) {
    try {
        return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
    } catch (error) {
        console.error("Error fetching books by author:", error);
        return [];
    }
}

// Task 4: Get books by title
async function getBooksByTitle(title) {
    try {
        return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    } catch (error) {
        console.error("Error fetching books by title:", error);
        return [];
    }
}

// Task 5: Get book review
async function getBookReview(isbn) {
    try {
        const book = await getBookByISBN(isbn);
        return book ? book.reviews : null;
    } catch (error) {
        console.error("Error fetching book review:", error);
        return null;
    }
}

// Task 6: Add/Modify book review
async function addOrModifyReview(isbn, username, review) {
    try {
        const book = await getBookByISBN(isbn);
        if (book) {
            if (!book.reviews) {
                book.reviews = {};
            }
            book.reviews[username] = review;
            return { message: "Review added/modified successfully", reviews: book.reviews };
        }
        return { message: "Book not found" };
    } catch (error) {
        console.error("Error adding review:", error);
        return { message: "Error adding review" };
    }
}

// Task 7: Delete review
async function deleteReview(isbn, username) {
    try {
        const book = await getBookByISBN(isbn);
        if (book && book.reviews && book.reviews[username]) {
            delete book.reviews[username];
            return { message: "Review deleted successfully" };
        }
        return { message: "Review not found" };
    } catch (error) {
        console.error("Error deleting review:", error);
        return { message: "Error deleting review" };
    }
}

// Export all functions
module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyReview,
    deleteReview
};
