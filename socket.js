/**
 * Created with WebStrom 10.0
 * User：苏国均
 * Version：1.0.0
 * Date：16/11/24
 * Time：
 * Description：
 */

var socketIO = require('socket.io');
var user = require('./models/user').user;

function socket(server) {
    console.log('socket:');

    var io = socketIO(server);

    io.on('connection', function (socket) {

        console.log('socket:connection');

        socket.emit('news', {hello: 'world'});

        socket.on('news', function (data) {
            console.log(data);

            user.users.save({userid: 1, password: 'ttest1'});

        });
    });


}


module.exports = socket;