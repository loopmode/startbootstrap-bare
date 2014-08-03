define(['jquery', 'app/core/app', 'app/views/intro'], function($, App, Intro) {	

	var app, options;

 	options = {
 		view: {
 			transitionDuration: 250
 		}
 	};

	$(document).ready(function() { 
		app = new App(options);
		app.start();
	});
});