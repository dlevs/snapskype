const _            = require('lodash');
const app          = require('express')();
const http         = require('http').Server(app);
const io           = require('socket.io')(http);
const socketEvents = require('./socket-events');
const util         = require('../lib/util');

http.listen(3000, function () {
	console.log('listening on *:3000');
});

io.on('connection', function (socket) {
	util.applyEvents(socket, socketEvents, [null, io]);
});
