const { check } = require('express-validator');

const loginValidator = [
  check('usuario')
    .notEmpty().withMessage('El usuario es obligatorio'),

  check('contraseña')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = loginValidator;