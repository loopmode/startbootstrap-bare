(function() {
 
	requirejs.config({
		baseUrl: 'js',
		paths : {
			'backbone' : 'lib/backbone-min',
			'backbone-super' : 'lib/backbone-super-min',
			'underscore' : 'lib/underscore-min',
			'jquery' : 'lib/jquery-1.11.0',
			'bootstrap': 'lib/bootstrap.min',
			'normalize': 'lib/normalize'
		},
		shim : {
			'backbone' : {
				deps : [ 'underscore', 'jquery' ],
				exports : 'Backbone'
			},
			'backbone-super': {
				deps : [ 'backbone' ]
			},
			'underscore' : {
				exports : '_'
			},
			'jquery': {
	            exports: '$'
	        },
        	'bootstrap' : {
        		deps :['jquery']
        	},
        	'normalize' : {
        		deps :['jquery']
        	}
		}
	});
	
	require(['app/utils/normalize', 'backbone-super', 'bootstrap'], function() {
		require(['app/main']);
	});

}());