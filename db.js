/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */



var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socketIM');


module.exports = mongoose;