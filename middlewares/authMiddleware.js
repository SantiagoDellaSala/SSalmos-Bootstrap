module.exports = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.locals.currentUser = req.session.user;
  } else {
    res.locals.user = null;
    res.locals.currentUser = null;
  }
  next();
};