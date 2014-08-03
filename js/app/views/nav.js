define(['jquery', 'app/base/view', 'app/core/events'], function($, BaseView, EventBus) {

	var Nav = BaseView.extend({
		events: {
			'click .navbar-header a': 'closeMobileMenu',
			'click .navbar-collapse a': 'closeMobileMenu'
		},

		initialize: function(options) {
			this._super(options);
			EventBus.on('router:route', this.updateHilighting, this);
		},

		closeMobileMenu: function(e) {
			// automatically close the mobile menu when clicking a link
			var a = $(e.currentTarget); 
			if (this.$('.navbar-toggle').is(':visible') && (a.is('.navbar-brand') || !a.siblings().length)) {
		        this.$('.navbar-collapse').collapse('toggle');
		    }
		},

		updateHilighting: function(route) {
			this.$('a.active').removeClass('active');
			if (!route) {
				return;
			}
			$('[href$="' + route + '"').addClass('active');
		}
	});

	return Nav;

});
 