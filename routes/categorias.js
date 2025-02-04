var express = require('express');
var router = express.Router();
var CategoriesController = require('../controllers/CategoriesController');

// Ruta para crear categoría
router.post('/crear', CategoriesController.crearCategoria);

// Ruta para eliminar categoría
router.get('/eliminar/:id', CategoriesController.eliminarCategoria);

// Ruta para listar categorías
router.get('/', CategoriesController.listarCategorias);

module.exports = router;