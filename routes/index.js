var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MaxStore', error: req.flash('error'), session: req.session }); // Incluir mensaje flash y sesión
});


module.exports = router;
