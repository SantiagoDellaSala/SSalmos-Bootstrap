const express = require('express');
const { detail, editProduct } = require('../controllers/productController');
const router = express.Router();

/* /products */
router
  .get('/detail/:id', detail)
  .get('/edit', editProduct)

module.exports = router;