const blessed  = require('blessed');
const settings = require('../../settings');

module.exports = context => {
	blessed.box({
		tags:       true,
		scrollable: true,
		scrollbar:  true,
		height:     context.program.rows - settings.inputHeight
	});
};
