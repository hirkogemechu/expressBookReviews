// final_project/general.js

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

// Return all books as an array
async function getAllBooks() {
    return books;
}

// Find a book by ISBN
async function getBookByISBN(isbn) {
    return books.find(book => book.isbn === isbn) || null;
}

// Find books by author
async function getBooksByAuthor(author) {
    return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
}

// Find books by title
async function getBooksByTitle(title) {
    return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}

// Get reviews for a book
async function getBookReview(isbn) {
    const book = await getBookByISBN(isbn);
    return book ? book.reviews : null;
}

// Add or modify a review
async function addOrModifyReview(isbn, username, review) {
    const book = await getBookByISBN(isbn);
    if (book) {
        if (!book.reviews) book.reviews = {};
        book.reviews[username] = review;
        return { message: "Review successfully added/updated.", reviews: book.reviews };
    }
    return { message: "Book not found" };
}

// Delete a review
async function deleteReview(isbn, username) {
    const book = await getBookByISBN(isbn);
    if (book && book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return { message: "Review successfully deleted." };
    }
    return { message: "Review not found" };
}

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyReview,
    deleteReview
};
