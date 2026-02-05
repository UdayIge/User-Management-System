const { body, param, query, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));
  throw new ApiError(400, 'Validation failed', extractedErrors);
};

const createUserRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('mobile')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Mobile number cannot exceed 20 characters'),
  body('gender')
    .optional()
    .isIn(['Male', 'Female', ''])
    .withMessage('Gender must be Male, Female, or empty'),
  body('status')
    .optional()
    .isIn(['Active', 'InActive'])
    .withMessage('Status must be Active or InActive'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
];

const updateUserRules = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('mobile')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Mobile number cannot exceed 20 characters'),
  body('gender')
    .optional()
    .isIn(['Male', 'Female', ''])
    .withMessage('Gender must be Male, Female, or empty'),
  body('status')
    .optional()
    .isIn(['Active', 'InActive'])
    .withMessage('Status must be Active or InActive'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
];

const userIdParamRules = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

const paginationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim().isLength({ max: 100 }).withMessage('Search term too long'),
];

module.exports = {
  validate,
  createUserRules,
  updateUserRules,
  userIdParamRules,
  paginationRules,
};
