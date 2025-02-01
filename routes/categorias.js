var express = require('express');
var router = express.Router();
var CategoriesController = require('../controllers/CategoriesController');

// Ruta para crear categoría
router.post('/crear', CategoriesController.crearCategoria);

module.exports = router;