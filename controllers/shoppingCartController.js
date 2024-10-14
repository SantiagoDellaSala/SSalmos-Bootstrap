const db = require("../database/models/index");
const { Op } = require("sequelize");
const { User, Shoppingcart, Item, Product } = require("../database/models");

module.exports = {
    cart: async (req, res) => {
        try {
          const userId = req.session.user.id; // Obtener el ID del usuario de la sesión
          const user = await User.findByPk(userId, {
            include: {
              model: Shoppingcart,
              as: "shoppingcarts",
              include: {
                model: Item,
                as: "items",
                include: {
                  model: Product,
                  as: "product",
                },
              },
            },
          });
    
          if (
            !user ||
            !user.shoppingcarts ||
            !user.shoppingcarts[0] ||
            !user.shoppingcarts[0].items
          ) {
            return res
              .status(404)
              .render("error", {
                message: "Usuario no encontrado o carrito vacío",
              });
          }
    
          // Aquí deberías tener acceso a los productos a través de user.shoppingcarts[0].items
          const items = user.shoppingcarts[0].items;
          const total = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
    
          // Renderizar la vista del carrito con los datos del usuario y sus productos
          res.render("shoppingCart", { items, total });
        } catch (error) {
          console.error(error);
          res.status(500).send("Error al mostrar carrito de compras");
        }
      },
    
      addToCart: async (req, res) => {
        try {
          const { productId, quantity } = req.body;
          const userId = req.params.userId; // Obtén el ID del usuario de los parámetros de la ruta
    
          // Busca el producto en la base de datos para obtener su precio
          const product = await Product.findByPk(productId);
    
          if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
          }
    
          // Busca el carrito activo del usuario
          const shoppingcart = await Shoppingcart.findOne({
            where: {
              userId,
              stateId: 1, // Ajusta el estado según tu lógica de negocio
            },
          });
    
          if (!shoppingcart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
          }
    
          // Verifica si el producto ya existe en el carrito
          let item = await Item.findOne({
            where: {
              shoppingcartId: shoppingcart.id,
              productId,
            },
          });
    
          if (item) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            item.quantity += parseInt(quantity);
          } else {
            // Si el producto no está en el carrito, crea un nuevo ítem
            item = await Item.create({
              shoppingcartId: shoppingcart.id,
              productId,
              price: product.price, // Aquí estableces el precio del producto
              quantity: parseInt(quantity),
            });
          }
    
          // Actualiza el total del carrito basado en los ítems actuales
          shoppingcart.total += parseInt(quantity) * product.price; // Ajusta el precio según tu modelo
    
          // Guarda los cambios en la base de datos
          await shoppingcart.save();
    
          // Devuelve una respuesta exitosa
          res.json({ message: "Producto agregado al carrito correctamente" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al agregar producto al carrito" });
        }
      },
      removeFromCart: async (req, res) => {
        try {
          const { eliminar } = req.body;
          const userId = req.session.user.id;
    
          // Encuentra el carrito del usuario
          const shoppingcart = await Shoppingcart.findOne({
            where: {
              userId,
              stateId: 1,
            },
            include: [{
              model: Item,
              as: 'items'
            }]
          });
    
          if (!shoppingcart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
          }
    
          // Elimina los productos seleccionados
          await Item.destroy({
            where: {
              shoppingcartId: shoppingcart.id,
              productId: {
                [Op.in]: eliminar,
              },
            },
          });
    
          // Recalcula el total del carrito
          const items = await Item.findAll({
            where: {
              shoppingcartId: shoppingcart.id,
            },
          });
    
          shoppingcart.total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
          await shoppingcart.save();
    
          res.redirect("/users/shopping-cart");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error al eliminar producto del carrito");
        }
      },
    
      updateCart: async (req, res) => {
        try {
          const { cantidad, productId } = req.body;
          const userId = req.session.user.id;
    
          // Encuentra el carrito del usuario
          const shoppingcart = await Shoppingcart.findOne({
            where: {
              userId,
              stateId: 1,
            },
          });
    
          if (!shoppingcart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
          }
    
          // Actualiza las cantidades de los productos
          for (let i = 0; i < productId.length; i++) {
            const item = await Item.findOne({
              where: {
                shoppingcartId: shoppingcart.id,
                productId: productId[i],
              },
            });
    
            if (item) {
              item.quantity = parseInt(cantidad[i]);
              await item.save();
            }
          }
    
          // Recalcula el total del carrito
          const items = await Item.findAll({
            where: {
              shoppingcartId: shoppingcart.id,
            },
          });
    
          shoppingcart.total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
          await shoppingcart.save();
    
          res.redirect("/users/shopping-cart");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error al actualizar carrito de compras");
        }
      },
}