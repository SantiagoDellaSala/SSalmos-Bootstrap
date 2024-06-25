const express = require('express');
const router = express.Router();
const { detail, editProduct, updateProduct, deleteProduct, createProductForm, createProduct, search } = require('../controllers/productController');
const upload = require('../middlewares/multerConfig');
const productValidator = require('../validations/productValidator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");

/* /products */
router
  .get('/detail/:id', authMiddleware, detail)
  .get('/edit/:id', editProduct)
  .post('/update/:id', upload.fields([
    { name: 'imagenProducto1' },
    { name: 'imagenProducto2' },
    { name: 'imagenProducto3' }
  ]), updateProduct)
  .get('/deleteP/:id', deleteProduct)
  .get('/create', createProductForm)
  .post('/create', upload.fields([
    { name: 'mainImage' },
    { name: 'secondImage' },
    { name: 'thirdImage' }
  ]), productValidator, validationMiddleware, createProduct)
  .get('/search', search)

module.exports = router;