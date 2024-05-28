const express = require('express');
const { login, edit, profile, cart, renderRegister, register, logout, loginn } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

/* /users */
router
  .get('/register', renderRegister)
  .post('/register', registerValidator, validationMiddleware, register)
  .get('/login', loginn)
  .post('/login', loginValidator, validationMiddleware, login)
  .get('/logout', logout)
  .get('/edit', edit)
  .get('/profile', profile)
  .get('/shopping-cart', cart);

module.exports = router;