/**
 * Created by Jonathan on 9/17/16.
 */

"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            client: {
                options: {
                    transform: [
                        "reactify"
                    ]
                },
                src: "client/src/app.js",
                dest: "build/public/js/app.js"
            }
        },

        clean: [
            "build/public/css/client.css",
            "build/public/js/app.js"
        ],

        concat_css: {
            options: {},
            all: {
                src: ["client/css/*.css"],
                dest: "build/public/css/client.css"
            }
        },

        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: "build/public/css",
                    src: ["*.css", "!*.min.css"],
                    dest: "build/public/css",
                    ext: ".css"
                }]
            }
        },

        uglify: {
            release: {
                files: {
                    "build/public/js/app.js" : ["build/public/js/app.js"]
                }
            }
        },

        run: {
            app: {
                cmd: "node",
                args: [
                    "serve.js"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-react");
    grunt.loadNpmTasks("grunt-concat-css");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-run");

    grunt.registerTask("common", ["clean", "concat_css", "browserify:client"]);
    grunt.registerTask("build", ["common", "cssmin", "uglify"]);
    grunt.registerTask("default", ["common", "run:app"]);
};