var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', login);
router.get('/register', register);


function login(req, res, next) {
    res.render('login');
};


function register(req, res, next) {
    res.render('register');
};


module.exports = router;
