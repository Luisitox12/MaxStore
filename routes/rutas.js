var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET Listado de Atractivos */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM atractivos", [], (err, rows) => {
    if (err) return next(err);
    res.render('rutas', { title: 'Rutas y Monumentos', atractivos: rows });
  });
});

module.exports = router;