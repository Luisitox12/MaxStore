var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MaxStore', error: req.flash('error') }); // Incluir mensaje flash
});


module.exports = router;
