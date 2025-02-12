var express = require('express');
var router = express.Router();
var productosController = require('../controllers/ProductsController');

// Middleware para verificar si el usuario es administrador
function checkAdmin(req, res, next) {
    // Aquí se debe verificar si el usuario está autenticado y es el administrador
    const userEmail = req.session.userEmail; // Suponiendo que el email del usuario se almacena en la sesión
    if (userEmail === 'admin@example.com') {
        return next(); // El usuario es administrador, continuar
    }
    req.flash('error', 'Acceso denegado, para acceder a productos inicie sesion como administrador'); // Establecer mensaje flash
    return res.redirect('/'); // Redirigir a la página de inicio


}

// Ruta para listar productos
router.get('/', checkAdmin, productosController.listarProductos);

// Ruta para crear producto
router.post('/crear', checkAdmin, productosController.crearProducto);

// Ruta para actualizar producto
router.post('/actualizar', checkAdmin, productosController.actualizarProducto);

// Ruta para eliminar producto
router.get('/eliminar/:id', checkAdmin, productosController.eliminarProducto);

module.exports = router;
