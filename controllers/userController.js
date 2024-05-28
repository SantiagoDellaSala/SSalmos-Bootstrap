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
    res.render('login.ejs')
  },

  login: async (req, res) => {
    try {
      const { usuario, contraseña } = req.body;

      console.log(`Datos recibidos - Usuario: ${usuario}, Contraseña: ${contraseña}`);

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usuario }, { email: usuario }]
        }
      });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log(`Usuario encontrado: ${user.username}`);

      console.log(`Contraseña en base de datos: ${user.password}`);
      const isPasswordValid = await bcrypt.compare(contraseña, user.password);
      console.log(`Comparación de contraseñas: ${isPasswordValid}`);
      if (!isPasswordValid) {
        console.log('Contraseña inválida');
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log('Inicio de sesión exitoso');

      req.session.user = user;
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
      }
      res.redirect('/');
    });
  },
  edit : (req, res) => {
    res.render('editProfile')
  },
  profile : (req, res) => {
    res.render('profile')
  },
  cart : (req, res) => {
    res.render('shoppingCart')
  }
};