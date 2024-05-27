const express = require('express');
const authController = require('../controllers/authController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { login, edit, profile, cart } = require('../controllers/userController');

const router = express.Router();

/* /users */
router
  .get('/register', authController.renderRegister)
  .post('/register', registerValidator, validationMiddleware, authController.register)
  .get('/login', (req, res) => res.render('login'))
  .post('/login', loginValidator, validationMiddleware, authController.login)
  .get('/logout', authController.logout)
  .get('/edit', edit)
  .get('/profile', profile)
  .get('/shopping-cart', cart);

module.exports = router;