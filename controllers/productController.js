const db = require("../database/models/index");

module.exports = {
  list: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        return res.render("index", {
          products,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId)
      .then((product) => {
        if (!product) {
          return res
            .status(404)
            .render("error", { message: "Product not found" });
        }
        return res.render("productDetail", {
          product,
        });
      })
      .catch((error) => console.log(error));
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
      res.redirect('/admin'); // Redirige a la vista de dashboard
    } else {
      console.log(`No se encontró ningún producto con ID: ${productId}`);
      res.status(404).json({ message: 'No se encontró ningún producto con el ID proporcionado' });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Hubo un problema al eliminar el producto' });
  });
}
};
