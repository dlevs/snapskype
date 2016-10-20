const blessed  = require('blessed');

module.exports = context => {
	return blessed.screen({
		// Example of optional settings:
		smartCSR:    true,
		useBCE:      true,
		log:         `${__dirname}/application.log`,
		debug:       true,
		dockBorders: true
	});
};
