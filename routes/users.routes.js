// routes/users.js
const express = require('express');
const { login, editUser, updateUser, profile, deleteUser, cart, renderRegister, register, logout, loginn, admin } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAdminRole = require('../middlewares/checkAdminRole');
const { showDashboard } = require('../controllers/indexController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

/* /users */
router
  .get('/register', renderRegister)
  .post('/register', registerValidator, validationMiddleware, register)
  .get('/login', loginn)
  .post('/login', loginValidator, validationMiddleware, login)
  .get('/logout', logout)
  .get('/admin', authMiddleware, checkAdminRole, admin)
  .get('/:id/edit', editUser)
  .post('/:id/edit', updateUser)
  .get('/:id/profile', profile)
  .get('/:id/delete', deleteUser)
  .get('/shopping-cart', cart)

module.exports = router;