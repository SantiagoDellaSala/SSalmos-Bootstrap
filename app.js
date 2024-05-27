require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/authRoutes.routes');
const productsRouter = require('./routes/products.routes');
//const authRoutes = require('./routes/authRoutes.routes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(session({
  secret: 'santiago', // Cambia esto por una cadena segura en producción
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Asegúrate de que 'secure' esté configurado adecuadamente en producción
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticación
app.use(authMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;