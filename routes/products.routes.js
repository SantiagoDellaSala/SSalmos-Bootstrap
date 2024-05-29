// routes/productRoutes.js
const express = require('express');
const { detail, editProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // Importa la configuración de multer

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

module.exports = router;