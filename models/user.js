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
            user.username = option.username;
            user.password = option.password;
            user.save(callback);
        }
    });
}


user_model.queryUser = function (option, callback) {
    //User.find({user_id: option.user_id})
    User.find()
        .sort('-updated_at')
        .exec(callback);
}


module.exports = user_model;