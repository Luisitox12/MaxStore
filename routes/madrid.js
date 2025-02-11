var express = require('express');
var router = express.Router();
var madridController = require('../controllers/madridController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', madridController.listarMadrid);

module.exports = router;