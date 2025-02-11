var express = require('express');
var router = express.Router();
var caballeroController = require('../controllers/caballeroController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', caballeroController.listarCaballero);

module.exports = router;