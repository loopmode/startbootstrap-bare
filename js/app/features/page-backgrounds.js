define(['jquery', 'backstretch', 'app/core/events'], function($, backstretch, EventBus) {
	return {

		defaults : {
			speed: 1000
		},

		initialize: function(options) {
			this.options = $.extend(true, {}, this.defaults, options);
			EventBus.on('route', this.handleRoute, this);
			this.handleRoute(options.route);
		},
 
		handleRoute: function(route) {
			var image = $('.page#'+route).attr('data-page-background');

			if (image) {
				$('body').backstretch(image, this.options); 
				$('.backstretch').stop().animate({opacity: 1}, 'fast');
			} else {
				$('.backstretch').stop().animate({opacity: 0}, this.options.speed, function() {
					$('body').backstretch("destroy"); 
				});				
			}
		}
		
	};

});