var express = require('express');
var router = express.Router();
var damaController = require('../controllers/damasController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', damaController.listarDamas);

module.exports = router;