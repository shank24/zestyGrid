
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL API queries', function () {

    var updateUserQuery;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();
            helperUtil.generateAuthToken(function (err, payload) {
                if (err) {

                }
                userInfo = payload;
                updateUserQuery = "mutation { updateUser(user:{id: \"" + global.userID + "\", firstName: \"Keshav\", lastName: \"Seera\", pwd: \"P@ssw0rd\",emailId:\"charan@zestygrid.com\"}) }";

                done(err);
            });
        } else {
            done();
        }
    });

    it('SPISA-001 :Update User API Sample', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateUserQuery}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + response.data.updateUser);
            done();
        });

    });


});





