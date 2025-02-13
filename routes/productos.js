var express = require('express');
var router = express.Router();
var productosController = require('../controllers/ProductsController');


function checkAdmin(req, res, next) {
    
    const userEmail = req.session.userEmail; 
    if (userEmail === 'admin@example.com') {
        return next(); 
    }
    req.flash('error', 'Acceso denegado, para acceder a productos inicie sesion como administrador'); // Establecer mensaje flash
    return res.redirect('/'); 


}


router.get('/', checkAdmin, productosController.listarProductos);


router.post('/crear', checkAdmin, productosController.crearProducto);


router.post('/actualizar', checkAdmin, productosController.actualizarProducto);


router.get('/eliminar/:id', checkAdmin, productosController.eliminarProducto);

module.exports = router;
