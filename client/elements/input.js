const blessed  = require('blessed');
const settings = require('../../settings');

module.exports = context => {
	return blessed.textarea({
		mouse: true,
		keys: true,
		vi: true,
		bottom: 0,
		height: settings.inputHeight,
		inputOnFocus: true
	})
};
