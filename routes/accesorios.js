var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('accesorios', { title: 'The CombiShop' });
});


module.exports = router;