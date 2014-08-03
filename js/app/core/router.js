define(['backbone'], function(Backbone) {
  
	var Router = Backbone.Router.extend({
		 
		routes: {
			"": "intro",
			"home": "home",
			"about": "about",
			"services": "services",
			"contact": "contact",
		}, 
		intro: function() {
			console.log('INTRO')
		}
	});
	
	return Router;
});