module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    'build/js/main.min.js': ['js/main.js']
                }
            }
        },

        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
};
