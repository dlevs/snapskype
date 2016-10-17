const _            = require('lodash');
const app          = require('express')();
const http         = require('http').Server(app);
const io           = require('socket.io')(http);
const socketEvents = require('./socket-events');

// app.get('/', function (req, res) {
// 	res.sendFile('index.html');
// });

http.listen(3000, function () {
	console.log('listening on *:3000');
});

io.on('connection', function (socket) {
	_.each(socketEvents, event => {
		socket.on('post', event.bind(null, io));
	});
});
