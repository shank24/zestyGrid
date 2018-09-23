var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL LOGIN API queries', function () {

    var login,addChefPayout;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            login = "mutation { login(id: \"shanky.kalra@wikfur.com\", pwd: \"RT123@11\" ) }";
            addChefPayout = "mutation { addChefPayoutMethod(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_LOGIN-001 :Add Chef Payout api', function (done) {

        helperUtil.addStep("Request Payload :: "+addChefPayout);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzY4NjM2MC1mNmVmLTRkYmMtOWU5Yy03YjcwYTBmODJlYmUiLCJpc0Nvb2siOmZhbHNlLCJpYXQiOjE1MzQ1Nzk4NjF9.bfCrVVxdBV5kK608fzVk9GLwie9bRcCfzy-C-mOkrBA'},
            body: JSON.stringify({query: addChefPayout}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    xit('ZESTY_LOGIN-001 :Login api', function (done) {

        helperUtil.addStep("Request Payload :: "+login);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: login}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


});
