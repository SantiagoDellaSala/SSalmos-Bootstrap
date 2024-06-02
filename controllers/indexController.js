const db = require("../database/models/index");

module.exports = {
  mp: (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId)
      .then((product) => {
        return res.render("mp-index", { product });
      })
      .catch((error) => console.log(error));
  },
};