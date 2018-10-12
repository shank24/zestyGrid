var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL CHEF API queries', function () {

    var addChefPayout,chefPayoutMethod,chefsByDish,createChef,deleteChef,deleteChefPayoutMethod,featuredChefs,findChefs,getChef, listChefTransactions,updateChef,updateChefPayoutMethod,createCandidate;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            addChefPayout = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            updateChefPayoutMethod = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            chefPayoutMethod = "query{chefPayoutMethods(chefId: \"" + global.userID + "\") { id accountId last4 routingNumber }}";

            chefsByDish = "query { chefsByDish( dishName: \"Chicken Tikka\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName } endCursor hasMore } }";

            createChef = "mutation { createChef( chef: {userId: \"" + global.userID + "\",  cuisines: [\"Chinese\",\"Italian\"],taxId: \"testing123456\", maxDiners:100, minEngagementPrice:25.23, active: true, canFly: false, geoLocation: { type: \"Point\", coordinates:[77.3910,28.5355] },  chefType: HOME_COOK, address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"10013\", country: \"India\"},dateOfBirth: \"1991-01-06\" }) }";

            deleteChef = "mutation { deleteChef(id: \"" + global.userID + "\") }";
            deleteChefPayoutMethod = "mutation { deleteChefPayoutMethod(chefId: \"" + global.userID + "\", accountId: \"acct_1CoSlsHOKx7hBtn4\") }";
            featuredChefs = "query{ featuredChefs(chefCount:  10) {id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active }}";
            findChefs = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            getChef =  "query { chef(id: \"" + global.userID + "\", dishCount: 3, postCount: 3) { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

            listChefTransactions = "query {listChefTransactions(filters: {startDate: \"2018-07-15\", endDate: \"2018-08-05\", sortOnField: \"date\", sortDescending: true}, cursor: null, pageSize: 10) { transactions{id date bookingDate bookingId dinerName type amount serviceCharge} endCursor  }}";
            updateChef = "mutation { updateChef( chef: {userId: \"" + global.userID + "\", taxId: \"testing123456\",  active: true, maxDiners: 20, canFly: true, completedSetupStep:2, dateOfBirth: \"1991-01-06\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"16006\", country: \"India\"} })}";

            createCandidate = "mutation { createCandidate(chef: {firstName: \"Alex\", lastName: \"Price\", email: \"" + global.emailID+ "\", phone: \"9814644011\", dob: \"1991-01-06\", ssn: \"111-11-2001\", zipcode: \"10013\"}) }";



            done();

        } else {
            done();
        }
    });

    it('ZESTY_CHEF-001 :Create Candidate api', function (done) {

            helperUtil.addStep("Request Payload :: "+createCandidate);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: createCandidate}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('ZESTY_CHEF-002 :Create Chef api', function (done) {

        helperUtil.addStep("Request Payload :: "+createChef);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createChef}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-003 :Get Chef api', function (done) {

            helperUtil.addStep("Request Payload :: "+getChef);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: getChef}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('ZESTY_CHEF-004 :Add Chef Payout api', function (done) {

        helperUtil.addStep("Request Payload :: "+addChefPayout);
        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: addChefPayout}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-005 :Update Chef Payout api', function (done) {

         helperUtil.addStep("Request Payload :: "+updateChefPayoutMethod);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateChefPayoutMethod}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-006 :Chef Payout Method api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefPayoutMethod);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefPayoutMethod}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-007 :Delete Chef Payout api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deleteChefPayoutMethod}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-008 :Update Chef api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateChef);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateChef}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-009 :Get Chef api', function (done) {

         helperUtil.addStep("Request Payload :: "+getChef);


        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: getChef}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-010 :Featured Chef api', function (done) {

         helperUtil.addStep("Request Payload :: "+featuredChefs);


        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: featuredChefs}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-011 :Find Chef api', function (done) {

          helperUtil.addStep("Request Payload :: "+findChefs);


        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: findChefs}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-012 :List Chef Transactions api', function (done) {

         helperUtil.addStep("Request Payload :: "+listChefTransactions);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: listChefTransactions}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_CHEF-013 :Chef By Dish api', function (done) {

         helperUtil.addStep("Request Payload :: "+chefsByDish);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefsByDish}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    xit('ZESTY_CHEF-014 :Delete Chef api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deleteChef}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });




});