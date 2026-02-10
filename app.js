var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Solo necesitamos una ruta principal para este prototipo
var indexRouter = require('./routes/index');
var rutasRouter = require('./routes/rutas');      // NUEVO
var serviciosRouter = require('./routes/servicios'); // NUEVO
var reporteRouter = require('./routes/reporte');   // NUEVO
var destinosRouter = require('./routes/destinos');

var app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/rutas', rutasRouter);      // Conecta /rutas -> routes/rutas.js
app.use('/servicios', serviciosRouter); // Conecta /servicios -> routes/servicios.js
app.use('/reporte', reporteRouter);    // Conecta /reporte -> routes/reporte.js
app.use('/destinos', destinosRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Servimos estáticos desde 'public' y también 'views' (por tus css actuales)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); 

// RUTA PRINCIPAL (GTT)
app.use('/', indexRouter);

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores servidor
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;