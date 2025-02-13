var express = require('express');
var router = express.Router();
var CarritoController = require('../controllers/CarritoController');


router.post('/agregar', CarritoController.agregarProducto);


router.post('/eliminar', CarritoController.eliminarProducto);


router.get('/', CarritoController.verCarrito)

module.exports = router;
