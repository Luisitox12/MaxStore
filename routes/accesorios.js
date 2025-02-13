var express = require('express');
var router = express.Router();
var accesoriosController = require('../controllers/accesoriosController');


router.get('/', accesoriosController.listarAccesorios);

module.exports = router;
