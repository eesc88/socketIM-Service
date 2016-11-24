/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */

console.log("loading user file");
var mongoose = require("mongoose");	//	顶会议用户组件

var Schema = mongoose.Schema;	//	创建模型
var userScheMa = new Schema({
    username: String,
    password: String,
    age: Number,
});	//	定义了一个新的模型，但是此模式还未和users集合有关联

var Food = new Schema({
    username: String,
    password: String,
    age: Number,
});	//	定义了一个新的模型，但是此模式还未和users集合有关联


exports.User = mongoose.model('User', userScheMa); //	与users集合关联
exports.Food = mongoose.model('Food', Food); //	与users集合关联
console.log("loading user file");