var express = require('express');
var router = express.Router();
var accesoriosController = require('../controllers/accesoriosController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', accesoriosController.listarAccesorios);

module.exports = router;
