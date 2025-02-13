var express = require('express');
var router = express.Router();
var CatalogoController = require('../controllers/CatalogoController');


router.get('/', CatalogoController.listarCatalogo);

module.exports = router;