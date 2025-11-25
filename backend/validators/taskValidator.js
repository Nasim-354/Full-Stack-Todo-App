const { body } = require("express-validator");

/**
 * Validation rules for creating a task
 */
const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot be more than 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot be more than 500 characters"),

  body("status")
    .optional()
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage("Status must be one of: To Do, In Progress, Done"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be one of: Low, Medium, High"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date in ISO format"),
];

/**
 * Validation rules for updating a task
 */
const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title cannot be more than 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot be more than 500 characters"),

  body("status")
    .optional()
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage("Status must be one of: To Do, In Progress, Done"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be one of: Low, Medium, High"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date in ISO format"),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
