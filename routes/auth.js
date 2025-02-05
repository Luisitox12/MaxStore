var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

// Ruta para acceder a la vista de autenticación
router.get('/', function(req, res) {
    res.render('auth', { title: 'Autenticación' });
});

// Ruta para registrar un nuevo usuario
router.post('/register', AuthController.registerUser);

// Ruta para iniciar sesión
router.post('/login', AuthController.loginUser);

// Ruta para cerrar sesión
router.post('/logout', AuthController.logoutUser);

module.exports = router;
