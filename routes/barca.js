var express = require('express');
var router = express.Router();
var barcaController = require('../controllers/barcaController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', barcaController.listarBarca);

module.exports = router;