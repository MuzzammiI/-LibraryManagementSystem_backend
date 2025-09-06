// Global error handler middleware
// Catches all errors, sends JSON response
// In production, log errors to a service like Sentry
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Log for debugging
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,  // Hide stack in prod
  });
};