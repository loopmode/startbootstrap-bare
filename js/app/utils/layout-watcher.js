/*
 * Sets a CSS class to indicate the current
 * Bootstrap3 layout mode (xs/sm/md/lg) and
 * watches for changes of the window dimensions 
 * to update that class 
 * @author Jovica Aleksic
 */
define(['jquery', 'underscore'], function($, _) {
	
	function LayoutWatcher(target) {
		this.target = $(target);
		this.modes = ['xs', 'sm', 'md', 'lg'];
		this.initialize();
	}

	LayoutWatcher.prototype = {
		initialize: function() {
			this.elements = {};
			_.each(this.modes, function(mode) {
				this.elements[mode] = $('<i></i>')
					.data('class', mode)
					.attr('class', 'visible-' + mode)
				;
			}, this);
		},
		start: function() {
			_.each(this.elements, function(el) {
				el.insertAfter('body');
			});
			this.update();
			$(window).on('resize.layout', $.proxy(this.update, this));
		},
		stop: function() {
			_.each(this.elements, function(el) {
				el.remove();
			});
			$(window).off('resize.layout');	
		},
		update: function() {
			var target = this.target.removeClass(this.modes.join(' '));
			_.each(this.elements, function(el) {
				target[el.is(':visible') ? 'addClass' : 'removeClass'](el.data('class'));
			});
			$(this).triggerHandler('update');
		}
	}; 

	LayoutWatcher.watch = function(target) {
		var instance = new LayoutWatcher(target);
		instance.start();
		return instance;
	};

	return LayoutWatcher;
});