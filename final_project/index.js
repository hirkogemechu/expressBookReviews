const express = require("express");
const app = express();
const port = 5000;
const general = require("general.js");

app.use(express.json());

// In-memory users
let users = {};

// --- Endpoints ---

// Get all books
app.get("/", async (req, res) => {
    const allBooks = await general.getAllBooks();
    res.json(allBooks); // array of objects
});

// Get book by ISBN
app.get("/isbn/:isbn", async (req, res) => {
    const book = await general.getBookByISBN(req.params.isbn);
    if (book) res.json(book);
    else res.status(404).json({ message: "Book not found" });
});

// Get books by author
app.get("/author/:author", async (req, res) => {
    const booksByAuthor = await general.getBooksByAuthor(req.params.author);
    res.json(booksByAuthor);
});

// Get books by title
app.get("/title/:title", async (req, res) => {
    const booksByTitle = await general.getBooksByTitle(req.params.title);
    res.json(booksByTitle);
});

// Get book review
app.get("/review/:isbn", async (req, res) => {
    const reviews = await general.getBookReview(req.params.isbn);
    if (reviews !== null) res.json({ reviews });
    else res.status(404).json({ message: "Book not found" });
});

// Register
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });
    if (users[username]) return res.status(409).json({ message: "User already exists" });
    users[username] = { password };
    res.json({ message: "User successfully registered." });
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });
    if (!users[username] || users[username].password !== password) return res.status(401).json({ message: "Invalid username or password" });
    res.json({ message: "Login successful!" });
});

// Add or modify a review
app.put("/review/:isbn", async (req, res) => {
    const { username, review } = req.body;
    if (!username || !review) return res.status(400).json({ message: "Username and review required" });
    const result = await general.addOrModifyReview(req.params.isbn, username, review);
    res.json(result);
});

// Delete a review
app.delete("/review/:isbn", async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Username required" });
    const result = await general.deleteReview(req.params.isbn, username);
    res.json(result);
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
