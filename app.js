var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importación de rutas
var indexRouter = require('./routes/index');
var rutasRouter = require('./routes/rutas');
var serviciosRouter = require('./routes/servicios');
var reporteRouter = require('./routes/reporte');
var destinosRouter = require('./routes/destinos');

var app = express();

// 1. CONFIGURACIÓN DE VISTAS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 2. MIDDLEWARE (IMPORTANTE: Esto debe ir SIEMPRE ANTES de las rutas)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Servimos archivos estáticos (imágenes, css, js)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); 

// 3. RUTA ESPECIAL DEL MAPA INTERACTIVO (La agregamos directa aquí)
app.get('/mapa', (req, res) => {
    // Recibe las coordenadas y el nombre desde el botón "Cómo llegar"
    const { lat, lng, nombre } = req.query;
    // Renderiza la vista mapa.ejs
    res.render('mapa', { lat, lng, nombre });
});

// 4. RUTAS DEL SISTEMA
app.use('/', indexRouter);
app.use('/rutas', rutasRouter);
app.use('/servicios', serviciosRouter);
app.use('/reporte', reporteRouter);
app.use('/destinos', destinosRouter);

// 5. MANEJO DE ERRORES (404 y 500)
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;