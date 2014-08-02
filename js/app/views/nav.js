define(['jquery', 'app/base/view'], function($, BaseView) {

	var Nav = BaseView.extend({
		events: {
			'click .navbar-header a': 'handleClick',
			'click .navbar-collapse a': 'handleClick'
		},

		handleClick: function(e) {
			// automatically close the mobile menu when clicking a link
			var a = $(e.currentTarget); 
			if (this.$('.navbar-toggle').is(':visible') && (a.is('.navbar-brand') || !a.siblings().length)) {
		        this.$('.navbar-collapse').collapse('toggle');
		    }
		}
	});

	return Nav;

});
 