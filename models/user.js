/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */


var mongoose = require("mongoose");	//	顶会议用户组件
var User = mongoose.model('_User');

function user_model(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.objectId = user.id;
}

user_model.prototype.login = function (callback) {
    User({
        username: this.username,
        password: this.password,
    }).find(function (error, users, count) {
        console.log(error);
        console.log(users);
        console.log(count);
        if (error) {
            callback(error);
        } else {
            callback(null, users);
        }
    });
}


/**
 * 创建一个新的用户对象
 * @param callback
 */
user_model.prototype.save = function (callback) {
    new User({
        username: this.username,
        password: this.password,
        email: this.email,
    }).save(function (err, user, count) {
        if (err) {
            callback(err);
        } else {
            callback(null, user);
        }
    });
}


/**
 * 通过用户ID获取用户详情
 * @param option
 * @param callback
 */
user_model.findById = function (option, callback) {
    User.findById(option.id, function (err, user) {
        if (err) {
            callback(err);
        } else {
            callback(null, user);
        }
    });
}

/**
 * 通过用户ID删除用户
 * @param option
 * @param callback
 */
user_model.deleteById = function (option, callback) {
    this.findById(option, function (err, user) {
        if (err) {
            callback(err);
        } else {
            user.remove(callback);
        }
    });
}

/**
 * 根据用户ID更新用户资料
 * @param id
 * @param option
 * @param callback
 */
user_model.updateById = function (id, option, callback) {
    this.findById({id: id}, function (err, user) {
        if (err) {
            callback(err);
        } else {
            console.log(option);
            user.username = option.username;
            user.password = option.password;
            user.email = option.email;
            user.user_type = option.user_type;
            user.save(callback);
        }
    });
}

/**
 *  获取所有的用户列表
 * @param option
 * @param callback
 */
user_model.queryUser = function (option, callback) {
    User.find()
        .sort('-updated_at')
        .exec(callback);
}

/**
 * 删除指定id的用户
 * @param option option.id
 * @param callback
 */
user_model.destroy = function (option, callback) {
    this.findById(option, function (error, user) {
        if (error) {
            callback(error);
        } else {
            user.remove(callback);
        }
    });
}


module.exports = user_model;