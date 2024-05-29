const { body } = require('express-validator');

const productValidator = [
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre del producto debe tener al menos 3 caracteres'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isNumeric().withMessage('El precio debe ser un número')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
  body('stock')
    .notEmpty().withMessage('El stock es obligatorio')
    .isNumeric().withMessage('El stock debe ser un número')
    .isInt({ gt: 0 }).withMessage('El stock debe ser mayor que 0'),
  body('mainImage')
    .custom((value, { req }) => {
      if (!req.files['mainImage']) {
        throw new Error('La imagen principal es obligatoria');
      }
      return true;
    })
];

module.exports = productValidator;