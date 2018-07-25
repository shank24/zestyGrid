/**
 * Created by Keshav on 11/2/2016.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'specs/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    exec: {
      makeReport: {
        command: 'allure generate allure-results --clean -o allure-report || true'
      }
    },

    protractor_webdriver: {
      start: {
        options: {
          //path: './node_modules/protractor/bin/',
          command: 'webdriver-manager start',
          keepAlive: true
        }
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: "conf.js",
        args: {
        }
      },
      singlerun: {},
      auto: {

      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('test', [
    'default',
    'protractor:singlerun',
    'exec:makeReport'

  ]);
  grunt.registerTask('default', ['jshint']);

};