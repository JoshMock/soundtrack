module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            browserify: {
                command: 'npm install'
            }
        },

        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['shell:browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
};
