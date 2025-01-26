var express = require('express');
var router = express.Router();
var productosController = require('../controllers/ProductsController');

// Ruta para listar productos
router.get('/', productosController.listarProductos);

// Ruta para crear producto
router.post('/crear', productosController.crearProducto);

// Ruta para actualizar producto
router.post('/actualizar', productosController.actualizarProducto);

// Ruta para eliminar producto
router.get('/eliminar/:id', productosController.eliminarProducto);

module.exports = router;