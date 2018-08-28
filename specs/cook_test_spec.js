
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL Cook API queries', function () {

    beforeEach(function (done) {
        if (!global.authToken) {
            helperUtil.envInfo();
            done();
        } else {
            done();
        }
    });

    it('SPISA-001 : Cook Create User API Sample', function (done) {

        console.log("Hola cook:: ",global.authToken);
        console.log("Hola :: ",global.userID);
        var updateUserQuery = "mutation { updateUser(user:{id: \"" + global.userID+ "\", firstName: \"Charan\", lastName: \"Keet\", pwd: \"P@ssw0rd\",emailId:\"charan@zestygrid.com\"}) }";



        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, updateUserQuery).then(function(data ){

            helperUtil.addStep("Total Sections is :: "+data.updateUser);

        });

        done();
    });

    it('SPISA-002 : Cook Create User API', function (done) {
        console.log(global.userID);
        console.log(global.authToken);

        done();
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


    xit('SPISA-123',function (done) {

        const client = new GraphQLClient(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmM1YmYzMi1lMDRkLTQyN2UtYmMxYy00ODFhYTQyZjQ0YjQiLCJpc0Nvb2siOmZhbHNlLCJpYXQiOjE1MzMyMDYxNDZ9.mIJzLlyC4W8uz-AhniWMYQ3fUIvnOBOuNzXQ1ouH7X0',
            },
        });

        client.request(JSONData.Query.getUser).then(function(data){
            console.log(data);
            done();
        });


    });


});