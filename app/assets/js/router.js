/* global define */
define([
    'config'
], function (Config) {

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
