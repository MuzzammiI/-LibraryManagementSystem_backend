import jwt from 'jsonwebtoken';

// Verify JWT and attach user to req
// Scalable: Can add more checks later
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Contains id, role, and username
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based authorization
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Admin access only' });
  next();
};

export const memberOnly = (req, res, next) => {
  if (req.user.role !== 'Member') return res.status(403).json({ message: 'Member access only' });
  next();
};