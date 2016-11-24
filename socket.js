/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */

var socketIO = require('socket.io');
var User = require('./models/user').User;
var Food = require('./models/user').Food;

function socket(server) {
    console.log('socket:');

    var io = socketIO(server);

    io.on('connection', function (socket) {

        console.log('socket:connection');

        socket.emit('news', {hello: 'world'});

        socket.on('news', function (data) {
            console.log(data);
            new Food({
                username: 145456,
                password: 'ttest1',
                age:45
            }).save().then(function (result) {
                console.log(result);
            }, function (error) {
                console.log(error);
            });

        });
    });


}


module.exports = socket;