const ApiError = require('../utils/ApiError');
const { errorResponse } = require('../utils/ApiResponse');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return errorResponse(res, err.statusCode, err.message, err.errors);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, 400, 'Validation failed', errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return errorResponse(res, 409, `Duplicate value for ${field}`);
  }

  if (err.name === 'CastError') {
    return errorResponse(res, 400, 'Invalid ID format');
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return errorResponse(res, 400, 'File size exceeds the allowed limit (5MB)');
  }

  if (err.code && err.code.startsWith('LIMIT_')) {
    return errorResponse(res, 400, err.message || 'File upload limit exceeded');
  }

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;
