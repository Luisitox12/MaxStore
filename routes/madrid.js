var express = require('express');
var router = express.Router();
var madridController = require('../controllers/madridController');


router.get('/', madridController.listarMadrid);

module.exports = router;