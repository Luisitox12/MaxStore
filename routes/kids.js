var express = require('express');
var router = express.Router();
var kidsController = require('../controllers/kidsController');


router.get('/', kidsController.listarKids);

module.exports = router;