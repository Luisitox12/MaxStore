var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET Formulario */
router.get('/', function(req, res, next) {
  res.render('reporte', { title: 'Reporte Ciudadano', mensaje: null });
});

/* POST Procesar Reporte */
router.post('/enviar', function(req, res, next) {
  const { descripcion } = req.body;
  db.run("INSERT INTO reportes (mensaje) VALUES (?)", [descripcion], function(err) {
    if (err) return next(err);
    // Renderizamos la misma vista pero con mensaje de éxito
    res.render('reporte', { title: 'Reporte Ciudadano', mensaje: '¡Gracias! Tu reporte ha sido recibido.' });
  });
});

module.exports = router;