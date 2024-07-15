// server/routes/index.js

const router = require('express').Router();
const userController = require('../controllers/user');
const { body } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const User = require('../models/user');

// Rota de registro (remover tokenHandler.verifyToken)
router.post(
  '/signup',
  body('username').isLength({ min: 8 }).withMessage('username must be at least 8 characters'),
  body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
  body('confirmPassword').isLength({ min: 8 }).withMessage('confirmPassword must be at least 8 characters'),
  body('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject('username already used');
      }
    });
  }),
  validation.validate,
  userController.register
);

// Rota de login (remover tokenHandler.verifyToken)
router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage('username must be at least 8 characters'),
  body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
  validation.validate,
  userController.login
);

module.exports = router;
