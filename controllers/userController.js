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
      if (!user) {
        return res.status(404).render("error", { message: "User not found" });
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
        return res.status(404).render("error", { message: "User not found" });
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
      res.status(500).send('Internal Server Error');
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