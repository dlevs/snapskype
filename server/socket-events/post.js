const PostList = require('../../lib/classes/PostList');
const list     = new PostList();

module.exports = function (io, post) {
	switch (post.message) {

		case '-p':
		case '-poll':
			break;

		case '-r':
		case '-read':
			list.clear();
			break;

		default:
			list.add(post);
			break;

	}
	io.sockets.emit('post', list.posts);
};
