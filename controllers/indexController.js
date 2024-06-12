const db = require("../database/models/index");
const path = require('path');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-6703328791960912-060210-6ed1bdd03159f9bc33a30396f5f20779-218506793",
});

module.exports = {
  indexView : (req, res) => {
    db.Product.findAll()
      .then((products) => {
        return res.render("index", {
          products,
        });
      })
      .catch((error) => console.log(error));
  },
  mercadoPagoConfig: async (req, res) => {
    try {
      const body = {
        items: [
          {
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://www.youtube.com/watch?v=vEXwN9-tKcs',
          failure: 'https://www.youtube.com/watch?v=vEXwN9-tKcs',
          pending: 'https://www.youtube.com/watch?v=vEXwN9-tKcs',
        },
        auto_return: 'approved',
      };
      const preference = new Preference(client);
      const result = await preference.create({ body });
      res.json({
        id: result.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Error al crear preferencia',
      });
    }
  }
};
