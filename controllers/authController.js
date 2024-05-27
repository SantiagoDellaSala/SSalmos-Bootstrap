const { Op } = require('sequelize');
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');

const authController = {
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
        roleId: 2 // Ajusta esto según tu lógica de roles
      });

      return res.redirect('/'); // Redirige al inicio después de registrar al usuario
    } catch (error) {
      console.error(error);
      return res.status(500).render('register', { errors: [{ msg: 'Error al registrar usuario' }] });
    }
  },

  login: async (req, res) => {
    try {
      const { usuario, contraseña } = req.body;

      console.log(`Datos recibidos - Usuario: ${usuario}, Contraseña: ${contraseña}`);

      // Buscamos al usuario por su nombre de usuario o correo electrónico
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usuario }, { email: usuario }]
        }
      });

      // Verificamos si el usuario existe
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log(`Usuario encontrado: ${user.username}`);

      // Verificamos la contraseña
      console.log(`Contraseña en base de datos: ${user.password}`);
      const isPasswordValid = await bcrypt.compare(contraseña, user.password);
      console.log(`Comparación de contraseñas: ${isPasswordValid}`);
      if (!isPasswordValid) {
        console.log('Contraseña inválida');
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log('Inicio de sesión exitoso');

      // Iniciar sesión exitosa
      req.session.user = user; // Guardamos al usuario en la sesión
      return res.redirect('/'); // Redirigimos al inicio
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
  }
};

module.exports = authController;