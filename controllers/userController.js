const db = require("../database/models/index");
const { Op } = require('sequelize');
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');

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

  login: async (req, res) => {
    try {
      const { usuario, contraseña } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usuario }, { email: usuario }]
        }
      });

      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(contraseña, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
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

  editUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.render('editProfile', { user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el usuario');
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, lastname, username } = req.body;

      await User.update(
        {
          name,
          lastname,
          username
        },
        {
          where: { id: req.params.id }
        }
      );
      res.redirect(`/users/${req.params.id}/profile`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar el usuario');
    }
  },

  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
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
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el usuario');
    }
  },
  
  cart: (req, res) => {
    res.render('shoppingCart');
  }
};