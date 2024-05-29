const express = require('express');
const { login, editUser, updateUser, profile, deleteUser, cart, renderRegister, register, logout, loginn, admin } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAdminRole = require('../middlewares/checkAdminRole');
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
  .get('/:id/edit', authMiddleware, editUser)
  .post('/:id/edit', authMiddleware, updateUser)
  .get('/:id/profile', authMiddleware, profile)
  .get('/:id/delete', authMiddleware, deleteUser)
  .get('/shopping-cart', authMiddleware, cart)

module.exports = router;