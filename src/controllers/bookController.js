import Book from '../models/Book.js';

// Add new book (Admin only)
// Sets createdBy to the authenticated user's username
export const addBook = async (req, res, next) => {
  const { title, author, isbn } = req.body;
  try {
      const isbnExists = await Book.findOne({ isbn });
      if (isbnExists) {
        return res.status(400).json({ message: 'ISBN must be unique' });
      }

    if (!req.user || !req.user.username) {
      return res.status(401).json({ message: 'Authentication required or invalid user data' });
    }
    const book = await Book.create({ title, author, isbn, createdBy: req.user.username });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Fetch all books (instead of only available)
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Borrow a book (Member only)
// Updates only availability and borrowedBy
export const borrowBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Book not available' });
    }
    // Use findByIdAndUpdate to avoid full schema validation
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { available: false, borrowedBy: req.user.id },
      { new: true, runValidators: false } // Disable validators for this update
    );
    res.json({ message: 'Book borrowed', book: updatedBook });
  } catch (error) {
    next(error);
  }
};

// Return a book (Member only, if borrowed by them)
export const returnBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book || book.available || book.borrowedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Cannot return this book' });
    }
    // Use findByIdAndUpdate to avoid full schema validation
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { available: true, borrowedBy: null },
      { new: true, runValidators: false } // Disable validators for this update
    );
    res.json({ message: 'Book returned', book: updatedBook });
  } catch (error) {
    next(error);
  }
};

// Update book (Admin only)
export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, isbn } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, isbn }, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Delete book (Admin only)
export const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    next(error);
  }
};