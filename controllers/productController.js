const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require("../database/models/index");

module.exports = {
  
  detail: (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).render("error", { message: "Product not found" });
        }
        return res.render("productDetail", { product });
      })
      .catch((error) => console.log(error));
  },
  shipmentForm: (req, res) => {
    res.render('shipmentForm');
  },
  search: async (req, res) => {
    try {
      const { query, category, minPrice, maxPrice } = req.query;
      const products = await db.Product.findAll({
        where: {
          name: { [Op.like]: `%${query}%` },
          price: { [Op.between]: [minPrice || 0, maxPrice || Number.MAX_VALUE] },
        }
      });
      res.render('productList', { products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al buscar productos');
    }
  },
  editProduct: (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId)
      .then((product) => {
        if (!product) {
          return res
            .status(404)
            .render("error", { message: "Product not found" });
        }
        return res.render("productEdit", {
          product,
        });
      })
      .catch((error) => console.log(error));
  },
  updateProduct: (req, res) => {
    const productId = req.params.id;
    const { nombreProducto, precioProducto, stockProducto } = req.body;
    const mainImage = req.files?.imagenProducto1?.[0]?.filename || req.body.currentMainImage;
    const secondImage = req.files?.imagenProducto2?.[0]?.filename || req.body.currentSecondImage;
    const thirdImage = req.files?.imagenProducto3?.[0]?.filename || req.body.currentThirdImage;

    db.Product.update(
        {
            name: nombreProducto,
            price: precioProducto,
            stock: stockProducto,
            mainImage,
            secondImage,
            thirdImage
        },
        {
            where: {
                id: productId
            }
        }
    )
    .then(() => {
        return res.redirect(`/products/detail/${productId}`);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
},
deleteProduct: (req, res) => {
  const productId = req.params.id;
  console.log(`Eliminando producto con ID: ${productId}`);
  
  db.Product.destroy({
    where: {
      id: productId
    }
  })
  .then((result) => {
    if (result === 1) {
      console.log(`Producto con ID: ${productId} eliminado correctamente`);
      res.redirect('/users/admin'); // Redirige a la vista de dashboard
    } else {
      console.log(`No se encontró ningún producto con ID: ${productId}`);
      res.status(404).json({ message: 'No se encontró ningún producto con el ID proporcionado' });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Hubo un problema al eliminar el producto' });
  });
},

createProductForm: (req, res) => {
res.render('productCreate', { errors: [], oldData: {} });
;
},

// Método para procesar la creación de producto
createProduct: (req, res) => {
  const { name, price, stock } = req.body;
  const mainImage = req.files['mainImage'][0].filename;
  const secondImage = req.files['secondImage'][0].filename;
  const thirdImage = req.files['thirdImage'][0].filename;

  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, renderizar el formulario de creación de productos nuevamente con los errores y los datos enviados previamente
    return res.render('productCreate', {
      errors: errors.array(),
      oldData: req.body
    });
  }

  // Si no hay errores de validación, continuar con la creación del producto
  db.Product.create({
    name,
    price,
    stock,
    mainImage,
    secondImage,
    thirdImage
  })
  .then(() => {
    res.redirect('/users/admin'); // Redirige a la lista de productos
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error al crear el producto');
  });
}

};