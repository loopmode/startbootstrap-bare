define([
	'jquery', 
	'app/core/router',
	'app/core/events',
	'app/views/app',
	'app/utils/log'
], 
function($, Router, EventBus, AppView) {
 
	function App(options) {
		this.options = $.extend(true, {}, this.defaults, options);
		this.initialize();
	}

	App.prototype = {
 
		initialize: function() {
			this.router = new Router(this.options.router); 
			this.view = new AppView(this.options.view);
		},
		
		start: function() { 
			this.router.on('route', this.handleRouteChanged, this);
			EventBus.on('click:link', this.handleApplicationLink, this);
			Backbone.history.start({pushState: true});
		},

		handleApplicationLink: function(route) {
			this.router.navigate(route, {trigger: true});
		},

		handleRouteChanged: function(route) {
			this.currentRoute = route;
			EventBus.trigger('route', route);
			this.view.render(route);
		},


	};
	

	return App;

});