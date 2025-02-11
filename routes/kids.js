var express = require('express');
var router = express.Router();
var kidsController = require('../controllers/kidsController');

// Ruta para obtener productos de la categoría accesorios
router.get('/', kidsController.listarKids);

module.exports = router;