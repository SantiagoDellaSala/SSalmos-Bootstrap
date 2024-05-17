const express = require('express');
const { detail, editProduct } = require('../controllers/productController');
const router = express.Router();

/* /users */
router
  .get('/detail', detail)
  .get('/edit', editProduct)

module.exports = router;