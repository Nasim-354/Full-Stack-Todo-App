const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { createTaskValidation, updateTaskValidation } = require('../validators/taskValidator');
const validate = require('../middleware/validate');

// All routes are protected (require authentication)

/**
 * @route   GET /api/tasks/stats
 * @desc    Get task statistics
 * @access  Private
 */
router.get('/stats', protect, getTaskStats);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for logged in user
 * @access  Private
 */
router.get('/', protect, getTasks);

/**
 * @route   POST /api/tasks
 * @desc    Create new task
 * @access  Private
 */
router.post('/', protect, createTaskValidation, validate, createTask);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Private
 */
router.get('/:id', protect, getTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task
 * @access  Private
 */
router.put('/:id', protect, updateTaskValidation, validate, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private
 */
router.delete('/:id', protect, deleteTask);

module.exports = router;