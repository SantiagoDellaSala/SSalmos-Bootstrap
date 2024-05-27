const { check, body } = require('express-validator');
const { User } = require('../database/models'); 

const registerValidator = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 45 }).withMessage('El nombre no puede tener más de 45 caracteres'),
  check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ max: 45 }).withMessage('El apellido no puede tener más de 45 caracteres'),
  check('usuarioRegistro')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ max: 45 }).withMessage('El nombre de usuario no puede tener más de 45 caracteres')
    .custom(async (value) => {
      const user = await User.findOne({ where: { userName: value } });
      if (user) {
        throw new Error('El nombre de usuario ya está en uso');
      }
      return true;
    }),
  check('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('El correo electrónico no es válido')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error('El correo electrónico ya está en uso');
      }
      return true;
    }),
  check('contraseñaRegistro')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('repetirContraseña')
    .notEmpty().withMessage('Debes confirmar la contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.contraseñaRegistro) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];

module.exports = registerValidator;