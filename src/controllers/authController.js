import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register a new user (Admin or Member)
// In production, admin creation could be restricted
export const register = async (req, res, next) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered' , user: { username: user.username, role: user.role }});
  } catch (error) {
    next(error);  // Pass to error middleware
  }
};

// Login and generate JWT
// Token expires in 1h for security
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role , username: user.username , id: user._id });
  } catch (error) {
    next(error);
  }
};