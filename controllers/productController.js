const db = require("../database/models");

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
  admin: (req, res) => {
    Promise.all([db.Product.findAll(), db.User.findAll()])
      .then(([products, users]) => {
        return res.render("dashboard", {
          products,
          users,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).render("error", { message: "Product not found" });
        }
        return res.render("productDetail", {
          product,
        });
      })
      .catch((error) => console.log(error));
  },
  editProduct: (req, res) => {
    // Aquí va la lógica para editar el producto
  },
};
