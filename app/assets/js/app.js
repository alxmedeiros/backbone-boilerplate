define([
	'config',
	'router',
], function (Config, Router) {

	var initialize = function () {

		console.log('App: initialize');

		// if ($.browser.msie) {
		// 	$.ajaxSetup({cache: false});
		// 	$.support.cors = true;
		// }

		window.App = {};

		Router.initialize(true);
	};

	return {
		initialize: initialize
	};

});
