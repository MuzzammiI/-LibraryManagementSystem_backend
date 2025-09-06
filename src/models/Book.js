// import mongoose from 'mongoose';
// import User from './User.js';

// // Book schema with validation
// // Availability status defaults to true (available)
// // Added createdBy to track the username of the creator
// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   isbn: { type: String, required: true, unique: true },
//   available: { type: Boolean, default: true },
//   borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
//   createdBy: { type: String, ref: 'User.username', required: true }, // Stores the username of the creator
// }, { timestamps: true });

// const Book = mongoose.model('Book', bookSchema);
// export default Book;






import mongoose from 'mongoose';
import User from './User.js';

// Book schema with validation
// Availability status defaults to true (available)
// createdBy is required only on creation, not updates
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true, message: 'ISBN must be unique' },
  available: { type: Boolean, default: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdBy: {
    type: String,
    ref: 'User.username',
    required: [true, 'Creator username is required'], // Required on creation
    // Custom validate function to skip validation on updates
    validate: {
      validator: function(v) {
        // Only validate if this is a new document (not an update)
        return this.isNew || v; // Allow updates without requiring createdBy
      },
      message: props => `${props.path} is required for new books`
    }
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;