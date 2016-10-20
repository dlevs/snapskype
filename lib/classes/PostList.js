const _ = require('lodash');
const Post = require('./Post');
const shortid = require('shortid');

module.exports = class PostList {

	constructor() {
		this.posts = [];
		this.registerUpdate();
	}

	clear() {
		this.posts = [];
		this.registerUpdate();
	}

	add(post) {
		if (!(post instanceof Post)) {
			post = new Post(post);
		}
		this.posts.push(post);
		this.registerUpdate();
	}

	getLastPostByUser(userId) {

	}

	getPostById() {

	}

	registerUpdate() {
		this.lastUpdated = Date.now();
	}

	get data() {
		return {
			timestamp: Date.now(),
			posts: this.posts,
			id: shortid.generate(),

		};
	}

};
