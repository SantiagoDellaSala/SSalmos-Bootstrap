const checkAdminRole = (req, res, next) => {
  if (req.session.user && req.session.user.roleId === 1) {
    next();
  } else {
    res.status(403).send("Acceso denegado");
  }
};

module.exports = checkAdminRole;