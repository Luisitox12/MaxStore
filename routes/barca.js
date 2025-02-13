var express = require('express');
var router = express.Router();
var barcaController = require('../controllers/barcaController');


router.get('/', barcaController.listarBarca);

module.exports = router;