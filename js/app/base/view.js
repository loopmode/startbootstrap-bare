define([
	'underscore',
	'backbone'
],
function(_, Backbone) {
	
	var BaseView = Backbone.View.extend({
		
		defaults: {},
		options: null,

		views: {},

		initialize: function(options) {
			this.options = $.extend(true, {}, this.getDefaults(), this.options, options);
			this.el = this.options.el || this.el;
			this._super(this.options);
		},
		getDefaults: function() {
			return this.defaults;
		},
		render: function(options) {
			this._super(options);
			this.assignAll();
			return this;
		},
		assign: function(view, selector) { 
			view.setElement(this.$(selector)).render();
		},
		assignAll: function() {
			_.each(this.views, function(view, selector) {
				this.assign(selector, selector);
			}, this);
		}

	});

	return BaseView;

});