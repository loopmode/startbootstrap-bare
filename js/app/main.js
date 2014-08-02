define(['jquery', 'app/core/app'], function($, App) {	

	var app, options;

 	options = {
 		view: {
 			transitionDuration: 0
 		}
 	};

	$(document).ready(function() { 
		app = new App(options);
		app.start();
	});
});