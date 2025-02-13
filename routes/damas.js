var express = require('express');
var router = express.Router();
var damaController = require('../controllers/damasController');


router.get('/', damaController.listarDamas);

module.exports = router;