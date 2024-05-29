const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({ msg: err.msg, param: err.param }));
    return res.render('productCreate', {
      errors: extractedErrors,
      oldData: req.body
    });
  }
  next();
};

module.exports = validationMiddleware;