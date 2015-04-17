(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'exports'], function($, exports) {
            root.AppConf = factory(root, exports, $);
        });

    } else {
        root.AppConf = factory(root, {}, root.jQuery);
    }

}(this, function(root, AppConf, $) {

    AppConf.env = 'dev';
    AppConf.url = 'http://localhost:8081/';

    return AppConf;

}));
