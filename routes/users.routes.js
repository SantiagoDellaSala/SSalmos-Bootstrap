const express = require('express');
const { login, register, edit, profile, cart } = require('../controllers/userController');
const router = express.Router();

/* /users */
router
  .get('/login', login)
  .get('/register', register)
  .get('/edit', edit)
  .get('/profile', profile)
  .get('/shopping-cart', cart)

module.exports = router;