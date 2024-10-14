const db = require("../database/models/index");
const { Op } = require("sequelize");
const { User, Shoppingcart } = require("../database/models");
const bcrypt = require("bcryptjs");

const showAlertAndRedirect = (res, message) => {
  res.status(400).json({ error: message });
};

module.exports = {
  renderRegister: (req, res) => {
    res.render("register", { errors: [] });
  },

  register: async (req, res) => {
    try {
      const { nombre, apellido, usuarioRegistro, email, contraseñaRegistro } =
        req.body;

      // Verificar que todos los datos necesarios están presentes en req.body
      if (
        !nombre ||
        !apellido ||
        !usuarioRegistro ||
        !email ||
        !contraseñaRegistro
      ) {
        return res
          .status(400)
          .render("register", {
            errors: [{ msg: "Todos los campos son requeridos" }],
          });
      }

      const hashedPassword = await bcrypt.hash(contraseñaRegistro, 10);

      // Crear un nuevo usuario en la base de datos
      const newUser = await User.create({
        name: nombre,
        lastname: apellido,
        username: usuarioRegistro,
        email: email,
        password: hashedPassword,
        roleId: 2,
      });

      // Crear un carrito para el usuario
      await Shoppingcart.create({
        total: 0, // Puedes inicializar el total en 0 u otro valor predeterminado
        stateId: 1, // ID del estado del carrito, puede ser por ejemplo 'en proceso'
        userId: newUser.id, // Asignar el ID del usuario recién creado al carrito
      });

      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .render("register", {
          errors: [{ msg: "Error al registrar usuario" }],
        });
    }
  },

  loginn: (req, res) => {
    res.render("login.ejs");
  },

  login: async (req, res) => {
    try {
      const { usuario, contraseña } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usuario }, { email: usuario }],
        },
      });

      if (!user || !(await bcrypt.compare(contraseña, user.password))) {
        return showAlertAndRedirect(res, "Credenciales inválidas");
      }

      req.session.user = user;
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "No se pudo cerrar la sesión" });
      }
      res.redirect("/");
    });
  },

  editUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res
          .status(404)
          .render("error", { message: "Usuario no encontrado" });
      }

      if (req.session.user && req.session.user.roleId === 1) {
        return res.render("editProfileAdmin", {
          user,
          currentUser: req.session.user,
        });
      } else {
        return res.render("editProfileUser", {
          user,
          currentUser: req.session.user,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener el usuario");
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { name, lastname, username, password, role } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res
          .status(404)
          .render("error", { message: "Usuario no encontrado" });
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
      res.status(500).send("Error interno del servidor");
    }
  },

  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: Shoppingcart,
          as: "shoppingcarts",
        },
      });
      res.render("profile", { user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener el perfil del usuario");
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.destroy({
        where: { id: req.params.id },
      });
      res.redirect("/users/admin");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar el usuario");
    }
  },
};