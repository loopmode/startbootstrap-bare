define(function() {
	
	function log(fn, args) {
		if (window.console) {
			window.console[fn].apply(window.console, args);
		}
	}

	return {
		log: function() { log('log', arguments); },
		info: function() { log('info', arguments); },
		warn: function() { log('warn', arguments); },
		error: function() { log('error', arguments); }
	}
});