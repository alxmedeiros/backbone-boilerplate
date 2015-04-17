/*global module:false*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        "build/*"
                    ]
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            jst: {
                files: [
                    'app/templates/**/*.ejs'
                ],
                tasks: ['jst']
            },
            js : {
                files: [
                    'app/assets/js/{,*/}*.js',
                    // 'app/assets/js/{,*/}{,*/}*.js'
                ]
            },
            gruntfile: {
                files: ["Gruntfile.js"]
            },
            styles: {
                files: [
                    "less/*.less",
                ],
                tasks: ["less", "cssmin", "jst"]
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    "app/{,*/}*.html"
                ]
            }
        },

        connect: {
            options: {
                port: 8081,
                hostname: "*",
                livereload: 35729,
                open: true
            },
            livereload: {
                options: {
                    base: 'app/',
                    middleware: function (connect, options) {
                        var middlewares = [];

                        // RewriteRules support
                        // middlewares.push(rewriteRulesSnippet);

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function (base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));
                        // middlewares.push(proxySnippet);

                        return middlewares;
                    }
                }
            }
        },

        copy: {
            fonts: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist/fonts',
                    dest: 'app/assets/fonts',
                    src: [
                        '*.{eot,svg,ttf,woff}'
                    ]
                }]
            }
        },

        bowercopy: {
            options: {
                runBower: true
            },
            libs: {
                options: {
                    destPrefix: 'app/assets/js/libs'
                },
                files: {
                    'jquery.js': 'jquery/dist/jquery.min.js',
                    'jquery.min.map': 'jquery/dist/jquery.min.map',
                    'require.js': 'requirejs/require.js',
                    'backbone.js': 'backbone-amd/backbone-min.js',
                    'backbone-min.map': 'backbone-amd/backbone-min.map',
                    'underscore.js': 'underscore-amd/underscore-min.js',
                    'underscore-min.map': 'underscore-amd/underscore-min.map',
                    'modernizr.js': 'modernizr/modernizr.js',
                    'moment.js': 'momentjs/moment.js',
                    'async.js': 'requirejs-plugins/src/async.js',
                    'font.js': 'requirejs-plugins/src/font.js',
                    'propertyParser.js': 'requirejs-plugins/src/propertyParser.js',
                    'bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js',
                }
            },
            css: {
                options: {
                    destPrefix: '.tmp/css'
                },
                files: {
                    'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css',
                }
            }
        },

        less: {
            development: {
                options: {
                    yuicompress: true,
                    relativeUrls: true
                },
                files: {
                    ".tmp/css/main.css": "less/app.less"
                }
            }
        },

        cssmin: {
            dev: {
                files: {
                    'app/assets/css/main.css': [
                        '.tmp/css/*.css'
                    ]
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    mainConfigFile : "app/assets/js/main.js",
                    baseUrl : "app/assets/js",
                    dir: "build/app/assets/js",
                    removeCombined: true,
                    findNestedDependencies: true,
                    wrap: true,
                    wrapShim: true,
                    optimizeCss: "none",
                    fileExclusionRegExp: /^\./,
                    optimize: "uglify2",
                    generateSourceMaps: false,
                    preserveLicenseComments: false,
                    useStrict: true,
                    modules : [
                        {
                            name: 'main',
                            exclude: [
                                "infrastructure",
                                "plugins"
                            ]
                        },
                        {
                            name: "plugins"
                        },
                        {
                            name: "infrastructure",
                        },
                        {
                            name: "app"
                        },
                    ]
                }
            }
        },

        jst: {
            compile: {
                files: {
                    'app/assets/js/templates.js': ['app/assets/js/templates/{,*/}*.ejs']
                }
            }
        },

    });

    grunt.registerTask("server", function (target) {
        if (target === "build") {
            return grunt.task.run(["configureRewriteRules", "configureProxies", "connect:build:keepalive"]);
        }

        grunt.task.run([
            'bowercopy',
            'less',
            'cssmin',
            'jst',
            "connect:livereload",
            "watch"
        ]);
    });

    grunt.registerTask("build", [
        "clean",
        'bowercopy',
        "less",
        'requirejs',
        // "concat",
        // "copy",
        // "replace",
        // "usemin",
        // "newer:tinypng",
        // "regex-replace",
        // "uglify",
        "cssmin",
        'jst',
    ]);

};
