
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL API queries', function () {

    beforeEach(function () {
        helperUtil.envInfo();
    });

    afterEach(function () {

    });


    it('SPISA-001 : Create User API', function (done) {

        var email = helperUtil.dummyEmailAddress();

        function generateUserQuery ( type, userId) {
            if( type === 'query') {

                return "query { user(id: \"" + userId+ "\") { id, emailId, firstName, lastName } }"
            } else if( type === 'createNewUser') {

                console.log(">>>>>>>> Mutation ::",email.toString());

                return "mutation { createUser(user: { emailId: \""+ email.toString() +"\", pwd: \"RT123@11\", firstName: \"Rohit2\", lastName: \"Tiwari2\", cellPhone: \"9876543219\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Noida\", state: \"UP\", zip: \"160066\", country: \"India\"}, dateOfBirth: \"0000-00-00\" }) }"

            } else if(type ==='getUserID'){

                return "mutation { login(id: \""+ email.toString() +"\", pwd: \"RT123@11\" ) }"
            }

        }


        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, generateUserQuery('createNewUser')).then(function(data){

            helperUtil.addStep("User ID :: "+data.createUser);

            var userID = data.createUser;
            var authToken;

            var newUserIDQuery = generateUserQuery('query',userID);



            // Get Auth Token using Login API

            fetch(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: generateUserQuery('getUserID')}),
            }).then(function(res) {

                authToken = res.headers.get('authorization');

                helperUtil.addStep("Auth Token is :: "+authToken);

                return res.json();
            })
                .then(function(res){

                    // Get User API
                    const client = new GraphQLClient(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, {
                        headers: {
                            Authorization: 'Bearer ' + authToken,
                        },
                    });

                    helperUtil.addStep("Auto Generated Query is :: "+newUserIDQuery);

                    client.request(newUserIDQuery).then(function(data){

                        console.log(data);
                        helperUtil.addStep("ID :: "+data.user.id);
                        helperUtil.addStep("Email ID :: "+data.user.emailId);
                        helperUtil.addStep("First Name :: "+data.user.firstName);
                        helperUtil.addStep("Last Name :: "+data.user.lastName);


                        done();
                    });
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