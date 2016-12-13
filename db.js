/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    username: String,
    password: String,
    age: Number,
    email: String,
    user_type: String,
});	//	定义了一个新的模型，但是此模式还未和users集合有关联

mongoose.model('_User', user);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log('数据库连接成功....');
});

mongoose.connect('mongodb://localhost/socketIM');