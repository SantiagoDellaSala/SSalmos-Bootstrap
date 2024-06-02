const express = require('express');
const router = express.Router();
const { detail, editProduct, updateProduct, deleteProduct, createProductForm, createProduct, search } = require('../controllers/productController');
const upload = require('../middlewares/multerConfig'); // Importa la configuración de multer
const productValidator = require('../validations/productValidator'); // Importa el archivo de validación
const validationMiddleware = require('../middlewares/validationMiddleware'); // Importa el middleware de validación

/* /products */
router
  .get('/detail/:id', detail)
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