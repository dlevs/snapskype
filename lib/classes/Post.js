const shortid = require('shortid');

module.exports = class Post {
	constructor({user, message}) {
		this.user      = user;
		this.message   = message;
		this.timestamp = Date.now();
		this.id        = shortid.generate();
		this.remote    = true;
	}
};
