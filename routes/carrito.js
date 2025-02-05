var express = require('express');
var router = express.Router();
var CarritoController = require('../controllers/CarritoController');

// Ruta para agregar un producto al carrito
router.post('/agregar', CarritoController.agregarProducto);

// Ruta para eliminar un producto del carrito
router.post('/eliminar', CarritoController.eliminarProducto);

// ruta para ver el carrito
router.get('/', CarritoController.verCarrito)

module.exports = router;
