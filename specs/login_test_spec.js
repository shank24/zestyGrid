
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var fetch = require('isomorphic-fetch');

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

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.createUser).then(function(data){

            console.log(">>>>>>. Total Count :: "+data.createUser);

            helperUtil.addStep("Total number of product lists are :: "+data.createUser);

            var userID = data.createUser;
            var authToken;

            fetch('http://zestypdevpalb-1416730740.us-east-1.elb.amazonaws.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: 'mutation { login(id: \"RT31@zestygrid.com\", pwd: \"RT3123@11\" ) }' }),
            }).then(function(res) {
                //console.log(res);
                //console.log(res.headers.get('authorization'));

                 authToken = res.headers.get('authorization');

                console.log("Authtoken is :: "+authToken);
                return res.json();
            })
                .then(function(res){
                    console.log("Only Output JSON :: "+res);

                    done();
                });




        })
        .catch(function(err) {
            console.log(err);
            console.log("holssss");
            console.log(typeof err);
            console.log(">>>>>>>>>>>>>>>>>>>>>>"+err.message);
            done();
        });

    });

    xit('SPISA-003 : Create User API', function (done) {


        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getUserID)
            .then(function(data, res, body){

            console.log(">>>>>>. Total Count :: "+JSON.stringify(data));

            //console.log(res.Headers);
                console.log('............................');
            //console.log((res.Headers || {}).authorization);
                done();
            })
            .catch(function (err) {
                console.log('error is ', err);
                done();
            });
    });


    xit('SPISA-003-test : Create User API', function (done) {

        fetch('http://zestypdevpalb-1416730740.us-east-1.elb.amazonaws.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: 'mutation { login(id: \"RT31@zestygrid.com\", pwd: \"RT3123@11\" ) }' }),
        }).then(function(res) {
            //console.log(res);
            console.log(res.headers.get('authorization'));
                return res.json();
            })
            .then(function(res){
                //console.log(res);

                done();
            });


    });

});