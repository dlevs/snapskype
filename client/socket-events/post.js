module.exports = function (data) {
	list = data.posts;

	var lastPost = _.last(list);

	render(list);
	if (lastPost && lastPost.user !== USER_ID) {
		notifier.notify({
			'title': 'Win32',
			'message': 'System error'//_.last(list).message.substr(0, 50)
		});
	}
};

