const db = require("../database/models/index");
const { Op } = require('sequelize');
const { User, Shoppingcart, Item, Product } = require('../database/models');
const bcrypt = require('bcryptjs');
const showAlertAndRedirect = (res, message) => {
  res.status(400).json({ error: message });
};

module.exports = {
  renderRegister: (req, res) => {
    res.render('register', { errors: [] });
  },

  register: async (req, res) => {
    try {
      const { nombre, apellido, usuarioRegistro, email, contraseñaRegistro } = req.body;
      const hashedPassword = await bcrypt.hash(contraseñaRegistro, 10);

      const newUser = await User.create({
        name: nombre,
        lastname: apellido,
        username: usuarioRegistro,
        email: email,
        password: hashedPassword,
        roleId: 2
      });

      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).render('register', { errors: [{ msg: 'Error al registrar usuario' }] });
    }
  },

  loginn : (req, res) => {
    res.render('login.ejs');
  },

  login : async (req, res) => {
    try {
      const { usuario, contraseña } = req.body;
  
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usuario }, { email: usuario }]
        }
      });
  
      if (!user || !(await bcrypt.compare(contraseña, user.password))) {
        return showAlertAndRedirect(res, 'Credenciales inválidas');
      }
  
      req.session.user = user;
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
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

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
      }
      res.redirect('/');
    });
  },

  searchUser: async (req, res) => {
    try {
      const { query } = req.query;
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { id: { [Op.like]: `%${query}%` } },
            { name: { [Op.like]: `%${query}%` } },
            { email: { [Op.like]: `%${query}%` } }
          ]
        }
      });
      res.render('usersList', { users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al buscar usuarios');
    }
  },

  editUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).render("error", { message: "Usuario no encontrado" });
      }
  
      if (req.session.user && req.session.user.roleId === 1) {
        return res.render('editProfileAdmin', { user, currentUser: req.session.user });
      } else {
        return res.render('editProfileUser', { user, currentUser: req.session.user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el usuario');
    }
  },  
  
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { name, lastname, username, password, role } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).render("error", { message: "Usuario no encontrado" });
      }
  
      // Actualizar los campos del usuario
      user.name = name;
      user.lastname = lastname;
      user.username = username;
  
      // Actualizar la contraseña solo si se proporciona
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Actualizar el rol solo si el usuario que edita es un administrador
      if (req.session.user && req.session.user.roleId === 1) {
        user.roleId = role;
      }
  
      // Guardar los cambios en la base de datos
      await user.save();
  
      // Redirigir a la página de perfil del usuario
      return res.redirect(`/users/${userId}/profile`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
  
  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: Shoppingcart,
          as: 'shoppingcarts',
          include: {
            model: Item,
            as: 'items',
            include: {
              model: Product,
              as: 'product'
            }
          }
        }
      });
      res.render('profile', { user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el perfil del usuario');
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.destroy({
        where: { id: req.params.id }
      });
      res.redirect('/users/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el usuario');
    }
  },
  
  cart: (req, res) => {
      db.Product.findAll()
        .then((products) => {
          return res.render("shoppingCart", {
            products,
          });
        })
        .catch((error) => console.log(error));
  },

  addToCart: async (req, res) => {
    try {
      // Lógica para agregar un producto al carrito
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar producto al carrito');
    }
  },
  removeFromCart: async (req, res) => {
    try {
      // Lógica para eliminar un producto del carrito
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar producto del carrito');
    }
  },
  updateCart: async (req, res) => {
    try {
      // Lógica para actualizar la cantidad de un producto en el carrito
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar carrito de compras');
    }
  },
  viewCart: async (req, res) => {
    try {
      // Lógica para mostrar el contenido del carrito
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al mostrar carrito de compras');
    }
  },
  checkout: async (req, res) => {
    try {
      // Lógica para procesar el pago y completar la compra
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al procesar el pago');
    }
  }
};