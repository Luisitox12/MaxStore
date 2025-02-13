var express = require('express');
var router = express.Router();
var CategoriesController = require('../controllers/CategoriesController');


router.post('/crear', CategoriesController.crearCategoria);


router.get('/eliminar/:id', CategoriesController.eliminarCategoria);


router.get('/', CategoriesController.listarCategorias);

module.exports = router;