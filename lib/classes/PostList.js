const _    = require('lodash');
const Post = require('./Post');

module.exports = class PostList {

	constructor() {
		this.posts = [];
	}

	clear() {
		this.posts = [];
	}

	add(post) {
		if (!(post instanceof Post)) {
			post = new Post(post);
		}
		this.posts.push(post)
	}

	getLastPostByUser(userId) {

	}

	getPostById() {

	}

};
