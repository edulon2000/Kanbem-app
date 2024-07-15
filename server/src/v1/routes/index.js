// server/routes/index.js

const router = require('express').Router();
const userController = require('../controllers/user');
const { body } = require('express-validator');
const validation = require('../handlers/validation');

// Rota de login
router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage('username must be at least 8 characters'),
  body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
  validation.validate,
  userController.login
);

module.exports = router;
