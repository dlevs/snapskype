module.exports = {

	applyEvents(target, functions, params) {
		functions.forEach((fn, name) => {
			fn = params ? fn.bind(...params) : fn;
			target.on(name, fn);
		});
	}

};
