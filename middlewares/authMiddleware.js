module.exports = (req, res, next) => {
  // Verificar si el usuario está autenticado
  if (req.session.user) {
    // Si el usuario está autenticado, configurar res.locals.user
    res.locals.user = req.session.user;
  } else {
    // Si el usuario no está autenticado, configurar res.locals.user como null
    res.locals.user = null;
  }

  // Continuar con la solicitud
  next();
};