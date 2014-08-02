define(['backbone'], function(Backbone) {
  
	var Router = Backbone.Router.extend({
		 
		routes: {
			"": "home",
			"about": "about",
			"services": "services",
			"contact": "contact",
		}
	});
	
	return Router;
});