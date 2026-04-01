// final_project/general.js
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

async function getAllBooks() {
    return books;
}

async function getBookByISBN(isbn) {
    return books.find(book => book.isbn === isbn) || null;
}

async function getBooksByAuthor(author) {
    return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
}

async function getBooksByTitle(title) {
    return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}

async function getBookReview(isbn) {
    const book = await getBookByISBN(isbn);
    return book ? book.reviews : null;
}

async function addOrModifyReview(isbn, username, review) {
    const book = await getBookByISBN(isbn);
    if (book) {
        if (!book.reviews) book.reviews = {};
        book.reviews[username] = review;
        return { message: "Review added/modified successfully", reviews: book.reviews };
    }
    return { message: "Book not found" };
}

async function deleteReview(isbn, username) {
    const book = await getBookByISBN(isbn);
    if (book && book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return { message: "Review deleted successfully" };
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
