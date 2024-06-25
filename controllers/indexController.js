const db = require("../database/models/index");

module.exports = {
  indexView: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        return res.render("index", {
          products,
        });
      })
      .catch((error) => console.log(error));
  }
};