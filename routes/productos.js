var express = require('express');
var router = express.Router();
var productosController = require('../controllers/ProductsController');

// Ruta para listar productos
router.get('/', productosController.listarProductos);

module.exports = router;