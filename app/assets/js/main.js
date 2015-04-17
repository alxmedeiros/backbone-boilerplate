/*global require*/
'use strict';
require.config({
    urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds: 0,
    paths: {
        jquery: 'libs/jquery',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        bootstrap: 'libs/bootstrap',
        moment: 'libs/moment'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
    }
});

require(['jquery'], function () {
    require([
        'infrastructure',
        'plugins'
    ], function() {
        "use strict";

        require([
            'app'
        ], function(App) {
            App.initialize();
        });

    });
});
