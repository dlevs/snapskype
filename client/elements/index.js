const _             = require('lodash');
const blessed       = require('blessed');
const elemFunctions = require('require-dir')('./');


const context = {
	program: blessed.program()
};

const elems = {
	screen: elemFunctions.screen(context),
	input: elemFunctions.input(context),
	messages: elemFunctions.messages(context)
};


elems.input.on('click', elems.input.focus);
elems.input.on('submit', function () {
	var message = this.getValue().slice(0, -1); // remove the '\n'
	if (message.trim() !== '') sendMessage(message);
	this.clearValue();
});

elems.screen.title = 'SnapSkype';
elems.screen.append(elems.messages);
elems.screen.append(elems.input);

elems.input.focus();
elems.screen.render();

module.exports = elems;
