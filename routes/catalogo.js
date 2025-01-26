var express = require('express');
var router = express.Router();
var CatalogoController = require('../controllers/CatalogoController');

// Ruta para listar productos
router.get('/', CatalogoController.listarCatalogo);

module.exports = router;