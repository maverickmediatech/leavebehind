module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            javascripts: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['copy:main']
            }
        },
        concat : {
            dist:
                {
                src: [
                    "node_modules/url-search-params-polyfill",
                    "src/leavebehind.js"
                    ],
                    dest: 'dist/leavebehind.min.js',
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
    grunt.registerTask('default', ['clean', 'concat','uglify']);
/*
    grunt.registerTask('build', ['copy:main','copy:nodemodules','sass','clean','concat','replace']);
    grunt.registerTask('dev', ['copy:main','sass','clean','concat','replace']);
    grunt.registerTask('default', ['dev', 'watch']);
    grunt.registerTask('minify', ['build','uglify','cssmin','htmlmin']);
    */
}
