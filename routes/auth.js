var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');


router.get('/', function(req, res) {
    res.render('auth', { title: 'Autenticación' });
});


router.post('/register', AuthController.registerUser);


router.post('/login', AuthController.loginUser);


router.post('/logout', AuthController.logoutUser);

module.exports = router;
