var express = require('express');
var router = express.Router();
var moment = require('moment');
var use_model = require('../models/user');

//用户登录
router.get('/', login);
//执行用户登录操作
router.post('/do_login', do_login);
//用户注册
router.get('/register', register);
//执行注册动作
router.post('/register', do_register);
//用户列表
router.get('/list', list);
//指定用户Id删除用户
router.get('/destroy', destroy_user);

//编辑用户资料
router.get('/edit/:id', edit);

//编辑用户资料
router.post('/edit', do_edit);


function login(req, res, next) {
    res.render('login');
};

function do_login(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);


    //var query_doc = {userid: req.body.userid, password: req.body.password};
    //(function () {
    //    user.count(query_doc, function (err, doc) {
    //        if (doc == 1) {
    //            console.log(query_doc.userid + ": login success in " + new Date());
    //            res.render('homepage', {title: 'homepage'});
    //        } else {
    //            console.log(query_doc.userid + ": login failed in " + new Date());
    //            res.redirect('/');
    //        }
    //    });
    //})(query_doc);


    new use_model({
        username: username,
        password: password
    }).login(function (error, user) {


        res.render('login');

    });

    res.redirect('/user/list');
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
            next(err);
        } else {
            res.redirect('/user/list');
        }
    });

}


function list(req, res, next) {
    use_model.queryUser(null, function (err, users) {
        if (err) {
            next(err);
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

/**
 * 根据用户ID删除用户
 * @param req
 * @param res
 * @param next
 */
function destroy_user(req, res, next) {
    var user_id = req.query.id;
    console.log('user_id:' + user_id);
    use_model.destroy({id: user_id}, function (error, user) {
        if (error) {
            next(error);
        } else {
            console.log(user);
            res.redirect('/user/list');
        }
    })
}

/**
 * 编辑用户资料页面
 * @param req
 * @param res
 * @param next
 */
function edit(req, res, next) {
    var user_id = req.params.id;
    console.log('user_id:' + user_id);
    use_model.findById({id: user_id}, function (error, user) {
        if (error) {
            next(error);
        } else {
            res.render('edit_user', {
                title: '修改资料',
                users: [],
                user: user
            });
        }
    });

}

/**
 * 执行用户内容修改
 * @param req
 * @param res
 * @param next
 */
function do_edit(req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    var email = req.body.email;
    var user_type = req.body.user_type;
    var id = req.body.id;
    use_model.updateById(id, {
        username: username,
        password: pwd,
        email: email,
        user_type: user_type
    }, function (error, user) {
        if (error) {
            next(error);
        } else {
            res.redirect('/user/list');
        }
    });
}


module.exports = router;
