
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL Booking API queries', function () {


    var updateUserQuery = "mutation { updateUser(user:{id: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", firstName: \"Charan\", lastName: \"Seera\", pwd: \"P@ssw0rd\"}) }";


    beforeEach(function (done) {
        if (!global.authToken) {
            helperUtil.envInfo();
            done();
        } else {
            done();
        }
    });

    it('SPISA-001 : booking Create User API Sample', function (done) {
        console.log(global.userID);
        console.log(global.authToken);

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, generateUserQuery('createNewUser')).then(function(data){


        });


        done();
    });

    it('SPISA-002 : Booking Create User API', function (done) {
        helperUtil.addStep("User ID :: "+global.userID);
        helperUtil.addStep("User Auth Token :: "+global.authToken);

        done();
    });



});