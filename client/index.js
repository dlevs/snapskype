const blessed = require('blessed');
const program = blessed.program();
const shortid = require('shortid');
const io      = require('socket.io-client');
const socket  = io.connect('http://10.168.10.86:3000/');
const notifier = require('node-notifier');
const _ = require('lodash');

const INPUT_HEIGHT = 1;
const USER_ID      = shortid.generate();
let list           = [];

// Create a screen object.
var screen   = blessed.screen({
	// Example of optional settings:
	smartCSR:    true,
	useBCE:      true,
	// cursor:      {
	// 	artificial: true,
	// 	blink:      true,
	// 	shape:      'underline'
	// },
	log:         `${__dirname}/application.log`,
	debug:       true,
	dockBorders: true
});
screen.title = 'SnapSkype';

var msgBox = blessed.box({
	tags:       true,
	scrollable: true,
	scrollbar:  true,
	height:     program.rows - INPUT_HEIGHT
});

// Creating a textarea on the bottom of the screen.
var input = blessed.textarea({
	mouse:        true,
	keys:         true,
	vi:           true,
	bottom:       0,
	height:       INPUT_HEIGHT,
	inputOnFocus: true
});


function sendMessage(message) {
	message = {user: USER_ID, message: message};
	list.push(message);
	render(list);
	socket.emit('post', message);
}

function render(posts) {
	msgBox.setContent(posts.map(post => {
		let color  = post.user === USER_ID ? '{#ffff00-fg}' : '{#ff00ff-fg}';
		let prompt = post.remote ? '> ' : '? ';
		return prompt + color + post.message + '{/}';
	}).join('\n'));
	msgBox.setScrollPerc(100);
	screen.render();
}

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
	return process.exit(0);
});
input.on('click', input.focus);
input.key('enter', function (ch, key) {
	var message = this.getValue().slice(0, -1); // remove the '\n'
	if (message.trim() !== '') sendMessage(message);
	this.clearValue();
});


screen.append(msgBox);
screen.append(input);
input.focus();

screen.render();

socket.on('post', posts => {
	var lastPost = _.last(list);

	list = posts;
	render(list);
	if (lastPost && lastPost.user !== USER_ID) {
		notifier.notify({
		  'title': 'Win32',
		  'message': 'System error'//_.last(list).message.substr(0, 50)
		});
	}
});

sendMessage('-p'); // poll
