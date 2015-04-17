/* global define */
define([
    'config',
    'views/InitView'
], function (Config, InitView) {

	"use strict";

	var AppRouter = Backbone.Router.extend({
		routes: {

			"": "initAction",
            "*actions": "defaultAction"
		}
	});

	var initialize = function () {

		console.log('Router: initialize');

		var app_router = new AppRouter();

		app_router.on('route:initAction', function(actions){
			console.log('Init Route');
			var view = new InitView();
			view.render();
        });

        app_router.on('route:defaultAction', function(actions){
            console.log('No route:', actions);
        });

        Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});
