define([
	'jquery', 
	'app/core/router',
	'app/views/app-view',
	'app/utils/log'
], 
function($, Router, AppView) {
 
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
			this.view.on('internal:link', this.handleLink, this);
			this.router.on('route', this.handleRoute, this);
			Backbone.history.start({pushState: true});
		},

		handleLink: function(element) {
			// remove leading slash or hashbang from the url
			var href = element.attr('href')
			,	fragment = href.replace(/^\//, '').replace('\#\!\/', '');
			this.router.navigate(fragment, {trigger: true});
		},

		handleRoute: function(route) {
			this.view.showPage(route);
		}
	};
	

	return App;

});