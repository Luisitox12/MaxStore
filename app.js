var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Importar express-session

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var CatalogoRouter = require('./routes/catalogo');
var categoriaRouter = require('./routes/categoria');
var categoriasRouter = require('./routes/categorias');
var accesoriosRouter = require('./routes/accesorios');
var authRouter = require('./routes/auth');
var carritoRouter = require('./routes/carrito');
var caballeroRouter = require('./routes/caballero');
var db = require('./database');
var app = express();

// Configuración de sesión
app.use(session({
    secret: 'mi_secreto', // Cambiar a un secreto más seguro en producción
    resave: false,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/catalogo', CatalogoRouter);
app.use('/categoria', categoriaRouter);
app.use('/categorias', categoriasRouter);
app.use('/accesorios', accesoriosRouter);
app.use('/auth', authRouter);
app.use('/carrito', carritoRouter);
app.use('/caballero', caballeroRouter);
// O si deseas servir todos los archivos estáticos desde 'views'
app.use(express.static(path.join(__dirname, 'views')));


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
