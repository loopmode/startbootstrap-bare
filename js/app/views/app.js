define([
	'underscore', 
	'jquery', 
	'backbone',
	'app/core/events',
	'app/base/view',
	'app/utils/layout-watcher',
	'app/views/nav'
], 
function(_, $, Backbone, EventBus, BaseView, LayoutWatcher, Nav) {

	var AppView = BaseView.extend({

		el: 'body',

		defaults: {
			title: document.title,
			transitionDuration: 0
		},

		events: {
			// handle links that start with a slash 
			'click a[href^="/"]': 'handleApplicationLink'
		},

		initialize: function(options) {
			this._super(options);
			this.views.nav = new Nav({el: this.$('> nav')}); 
			this.pages = this.$('.page'); 
			LayoutWatcher.watch(this.el); 
			this.$el.addClass('ready');
		},

		render: function(pageId) { 
			var self = this
			,	page = this.pages.filter(pageId ? '#' + pageId : '.default-page')
			;
			this.transitionOut()
			.then(function() {
				$(self.activePage).removeClass('active');
				self.activePage = page.addClass('active');
				document.title =  self.getTitle(page);
				self.transitionIn();
			});
		},

		transitionOut: function() {
			var page = $(this.activePage);
			EventBus.trigger('transition:out.started', page);

			var promise = this.animate(page, {opacity: 0});
			promise.then(function() {
				EventBus.trigger('transition:out.finished', page);
			});
			
			return promise;
		},

		transitionIn: function() {
			var page = $(this.activePage);
			EventBus.trigger('transition:in.started', this.activePage);
			
			if (!page.data('opacityFix')) {
				page.css('opacity', 0).data('opacityFix', true);
			}

			var promise = this.animate(this.activePage, {opacity: 1});
			promise.then(function() {
				EventBus.trigger('transition:in.finished', page);
			});
			return promise;
		},


		animate: function(element, properties) {
			var dfd = $.Deferred();
			if ($(element).length === 0) {
				dfd.resolve();
			}
			else {
				$(element)
					.stop()
					.animate(properties, this.options.transitionDuration, dfd.resolve.bind(dfd));
			}
			return dfd.promise();
		},


		handleApplicationLink: function(e) { 
			if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
				e.preventDefault(); 
				var a = $(e.currentTarget)
				,	route = a.attr('href')
					.replace(/^\//, '')
					.replace('\#\!\/', '')
				;
				EventBus.trigger('click:link', route);
				return false;
			}
		},

		getTitle: function(el) {
			var d = this.options.title // default title
			,	t = $(el).attr('data-page-title')
			;
			return t ? t + (d ? ' - ' + d : '') : d;
		},


	});

	return AppView;

});