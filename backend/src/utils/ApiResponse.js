const successResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const paginatedResponse = (res, statusCode, data, pagination, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};

const errorResponse = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  successResponse,
  paginatedResponse,
  errorResponse,
};
