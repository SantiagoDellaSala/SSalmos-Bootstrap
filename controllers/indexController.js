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
  searchUser: async (req, res) => {
    try {
      const { query } = req.query;
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { id: { [Op.like]: `%${query}%` } },
            { name: { [Op.like]: `%${query}%` } },
            { email: { [Op.like]: `%${query}%` } },
          ],
        },
      });
      res.render("usersList", { users });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al buscar usuarios");
    }
  },
  terminosCondiciones: (req, res) => {
    res.render("terminosCondiciones");
  },
  nosotros: (req, res) => {
    res.render("nosotros");
  },
};