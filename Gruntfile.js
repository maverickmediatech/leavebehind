module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            javascripts: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['clean','concat']
            }
        },
        concat : {
            dist:
                {
                src: [
                    "node_modules/url-search-params-polyfill/index.js",
                    "src/leavebehind.js"
                    ],
                    dest: 'dist/leavebehind.js',
                  }
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.js'],
                    dest: 'dist'
                }]
            }

        },

        clean: {
              build: ['dist/leavebehind.js']
        },

    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('watch',['default', 'watch']);
    grunt.registerTask('default', ['clean', 'concat']);
    grunt.registerTask('min', ['clean', 'concat','uglify']);

}
