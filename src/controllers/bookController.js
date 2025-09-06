import Book from '../models/Book.js';

// Add new book (Admin only)
// Sets createdBy to the authenticated user's username
export const addBook = async (req, res, next) => {
  const { title, author, isbn } = req.body;
  try {
    if (!req.user || !req.user.username) {
      return res.status(401).json({ message: 'Authentication required or invalid user data' });
    }
    const book = await Book.create({ title, author, isbn, createdBy: req.user.username });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Fetch all books with search filter by title or author
// Fixed: Use $or for combined title/author search; return empty [] for no matches
export const getBooks = async (req, res, next) => {
  try {
    const { title, author } = req.query;
    let query = {};

    if (title || author) {
      const searchConditions = [];
      if (title) {
        searchConditions.push({ title: { $regex: title, $options: 'i' } });
      }
      if (author) {
        searchConditions.push({ author: { $regex: author, $options: 'i' } });
      }
      query.$or = searchConditions;
      console.log('Search query applied:', query); // Debug log (remove in production)
    } else {
      // No query: return all books
      console.log('No search query; returning all books'); // Debug log
    }

    const books = await Book.find(query);
    console.log(`Found ${books.length} books for query: title="${title}", author="${author}"`); // Debug log
    res.json(books); // Empty array [] if no matches
  } catch (error) {
    console.error('getBooks error:', error); // Debug log
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
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { available: false, borrowedBy: req.user.id },
      { new: true, runValidators: false }
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
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { available: true, borrowedBy: null },
      { new: true, runValidators: false }
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