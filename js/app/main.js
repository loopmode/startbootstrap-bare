define(['jquery', 'app/core/app', 'app/views/intro'], function($, App, Intro, PageBackgrounds) {	

 	var appOptions = {
 		view: {
 			transitionDuration: 250
 		}
 	};

	$(document).ready(function() { 

		app = new App(appOptions);

	 

		// BACKGROUND IMAGES
		//-------------------------
	 	require(['app/features/page-backgrounds'], function(backgrounds) {
			backgrounds.initialize({
				speed: 2000,
				route: app.currentRoute
			});
		});

		app.start();

	});
});