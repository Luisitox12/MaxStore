var express = require('express');
var router = express.Router();
var caballeroController = require('../controllers/caballeroController');


router.get('/', caballeroController.listarCaballero);

module.exports = router;