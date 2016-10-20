const blessed  = require('blessed');
const program  = blessed.program();


const io       = require('socket.io-client');
const socket   = io.connect('http://127.0.0.1:3000/');
const notifier = require('node-notifier');

const USER_ID      = require('shortid').generate();
const elements     = require('./elements/index');
const socketEvents = require('./socket-events');
const util         = require('../lib/util');

let list = [];

program.title = 'SnapSkype';


function sendMessage(message) {
	message = {user: USER_ID, message: message};
	list.push(message);
	render(list);
	socket.emit('post', message);
}

function render(posts) {
	elements.messages.setContent(posts.map(post => {
		let color  = post.user === USER_ID ? '{#ffff00-fg}' : '{#ff00ff-fg}';
		let prompt = post.remote ? '> ' : '? ';
		return prompt + color + post.message + '{/}';
	}).join('\n'));
	elements.messages.setScrollPerc(100);
	elements.screen.render();
}

util.applyEvents(socket, socketEvents);

sendMessage('-p'); // poll


function quit() {
	elements.screen.destroy();
	return process.exit(0);
}

program.key('escape', quit);
elements.screen.render();
