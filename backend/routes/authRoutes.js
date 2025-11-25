const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController.js');
const { protect } = require('../middleware/auth.js');
const { registerValidation, loginValidation } = require('../validators/authValidator.js');
const validate = require('../middleware/validate.js');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidation, validate, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginValidation, validate, login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get('/me', protect, getMe);

module.exports = router;