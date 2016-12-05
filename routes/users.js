var express = require('express');
var router = express.Router();
var moment = require('moment');
var use_model = require('../models/user');

/* GET users listing. */
router.get('/', login);
router.get('/register', register);
router.post('/register', do_register);
router.get('/list', list);


function login(req, res, next) {
    res.render('login');
};


function register(req, res, next) {
    res.render('register');
};


function do_register(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    console.log('username:' + username);
    var user = new use_model({
        username: username,
        password: password,
        email: email,
    }).save(function (err, user) {
        if (err) {
            res.error(err);
        } else {
            res.redirect('/user/list');
        }
    });

}


function list(req, res, next) {
    use_model.queryUser(null, function (err, users) {
        if (err) {
            res.error(err);
        } else {
            console.log('users:' + users);
            console.dir(users);
            res.render('user_list',
                {
                    title: 'Express Todo Example',
                    users: users,
                    timenow: moment().format('YYYY-M-D H:mm'),
                });
        }
    });

}


module.exports = router;
