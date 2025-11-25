const { validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 * Returns error if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({
      success: false,
      message: errorMessages.join(', '),
      errors: errors.array()
    });
  }
  
  next();
};

module.exports = validate;