define([
	'app/base/view'
], 
function(BaseView) {

	var Intro = BaseView.extend({
		initialize: function(options) {
			this._super(options);
			console.log('init')
		}
	});
 
	return Intro;

});