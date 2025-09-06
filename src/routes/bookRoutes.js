import express from 'express';
import { addBook, getBooks, borrowBook, returnBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { protect, adminOnly, memberOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, adminOnly, addBook);
router.get('/', protect, getBooks); // Handles search via query params
router.put('/:id/borrow', protect, memberOnly, borrowBook);
router.put('/:id/return', protect, memberOnly, returnBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

export default router;