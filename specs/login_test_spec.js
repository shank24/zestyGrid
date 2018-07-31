
var request = require('graphql-request');

var util = require('util'),


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');

  //JSONData = require('./../testData/testData_' + process.env.NODE_ENV + '_' + process.env.NODE_USERTYPE + '.json');


describe('Test GraphQL API queries', function () {

    beforeEach(function () {
        helperUtil.envInfo();
    });

    afterEach(function () {

    });


    it('SPISA-002 : Create User API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.createUser).then(function(data1 ){

            console.log(">>>>>>. Total Count :: "+data1.createUser);

            helperUtil.addStep("Total number of product lists are :: "+data1.createUser);

            var userID = data1.createUser;

            /*request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getUserID).then(function(data2 ){

                console.log(">>>>>>. Total Count :: "+data2.login);

            });*/



            done();
        });
    });

    it('SPISA-003 : Create User API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getUserID).then(function(data2){

                console.log(">>>>>>. Total Count :: "+data2);

            });

            done();
    });




});