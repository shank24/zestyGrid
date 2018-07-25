// An example configuration file
var q = require('./node_modules/q');


exports.config = {


  allScriptsTimeout: 160000,
  getPageTimeout: 190000,

  specs: [


    /*'specs/cooking_test_spec.js',*/
    'specs/sample_test_spec.js',

  ],

  framework: 'jasmine2',
  /*ignoreUncaughtExceptions: true,*/

  onPrepare: function () {
    var emptyDirPromise = q.defer();
    var fs = require('fs-extra');
    var path = require('path');
    var resultsDir = 'allure-results';

    var basePath = '.';
    var outDir = path.resolve(basePath,resultsDir);
    fs.emptyDir(outDir, function (err) {
      if (err) {
        emptyDirPromise.reject('XML Report Direct not clear');
      }
      else{
        emptyDirPromise.resolve('XML Report Direct clear successfully');
      }
      console.log('XML report directory cleared!')
    });


    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'none',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
      displaySuccessesSummary: false, // display summary of all successes after execution
      displayFailuresSummary: true,   // display summary of all failures after execution
      displayPendingSummary: true,    // display summary of all pending specs after execution
      displaySuccessfulSpec: true,    // display each successful spec
      displayFailedSpec: true,        // display each failed spec
      displayPendingSpec: false,      // display each pending spec
      displaySpecDuration: false,     // display each spec duration
      displaySuiteNumber: false,      // display each suite number (hierarchical)
      colors: {
        /*success: ' 🍻  ',*/ // Cheers Icon for Mac Only
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
      customProcessors: []
    }));

    generatereport();

    function generatereport() {
      var AllureReporter = require('jasmine-allure-reporter');
      jasmine.getEnv().addReporter(new AllureReporter({
        resultsDir: 'allure-results',
        basePath: basePath
      }));
    };

    global.isAngularSite = function (flag) {
      browser.ignoreSynchronization = !flag;
    };
    browser.driver.manage().window().maximize();

    return emptyDirPromise.promise;
  },

  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,

    // Default time to wait in ms before a test fails.
    //defaultTimeoutInterval: 900000,
    defaultTimeoutInterval: 2500000,

    /*grep: '#integartion'*/
  }

};