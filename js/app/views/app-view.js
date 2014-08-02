define([
	'underscore', 
	'jquery', 
	'backbone',
	'app/base/view',
	'app/utils/layout-watcher',
	'app/views/nav'
], 
function(_, $, Backbone, BaseView, LayoutWatcher, Nav) {

	var AppView = BaseView.extend({

		el: 'body',

		defaults: {
			title: document.title,
			transitionDuration: 0
		},

		events: {
			// handle links that start with a slash 
			'click a[href^="/"]': 'handleInternalLink'
		},

		initialize: function(options) {
			this._super(options);
			this.views.nav = new Nav({el: this.$('> nav')}); 
			this.pageElements = this.$('.page'); 
			LayoutWatcher.watch(this.el); 
			this.$el.addClass('ready');
		},

		showPage: function(id) { 
			var oldPage = this.currentPage || $()
			,	newPage = this.pageElements.filter('#' + id)
			,	animate = this.animate.bind(this)
			;
			
			this.setTitle(newPage.data('pageTitle'));

			animate(oldPage, {opacity: 0})
			.then(function() {
				this.currentPage = newPage;
				oldPage.removeClass('current');
				newPage.addClass('current');
				animate(newPage, {opacity: 1});
			}.bind(this));
		},

		setTitle: function(title) {
			var def = this.options.title;
			document.title = title ? title + (def ? ' - ' + def : '') : def;
		},

		/** @private */
		animate: function(element, properties) {
			var dfd = $.Deferred();
			if ($(element).length === 0) {
				dfd.resolve();
			}
			else {
				$(element).stop().animate(properties, this.options.transitionDuration, dfd.resolve.bind(dfd));
			}
			return dfd.promise();
		},

		/** @private */
		handleInternalLink: function(e) {
			if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
				e.preventDefault(); 
				this.trigger('internal:link', $(e.currentTarget));
				return false;
			}
		},



	});

	return AppView;

});