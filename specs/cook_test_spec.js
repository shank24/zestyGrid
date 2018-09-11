
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL CHEF API queries', function () {

    var addChefPayout,chefPayoutMethod,chefsByDish,createChef,deleteChef,deleteChefPayoutMethod,featuredChefs,findChefs,getChef, listChefTransactions,updateChef,updateChefPayoutMethod;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            addChefPayout = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            updateChefPayoutMethod = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            chefPayoutMethod = "query{chefPayoutMethods(chefId: \"" + global.userID + "\") { id accountId last4 routingNumber }}";
            chefsByDish = "query { chefsByDish( dishName: \"Chicken Tikka\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName } endCursor hasMore } }";
            createChef = "mutation { createChef( chef: {userId: \"" + global.userID + "\",  cuisines: [\"Chinese\",\"Italian\"], active: true, maxDiners: 10, canFly: false,  chefType: HOME_COOK, address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"16006\", country: \"India\"} }) }";
            deleteChef = "mutation { deleteChef(id: \"" + global.userID + "\") }";
            deleteChefPayoutMethod = "mutation { deleteChefPayoutMethod(chefId: \"" + global.userID + "\", accountId: \"acct_1CoSlsHOKx7hBtn4\") }";
            featuredChefs = "query{ featuredChefs(chefCount:  10) {id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active }}";
            findChefs = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"], priceMax: 300, engagementSize: 6 }, cursor: null, pageSize: 10) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";
            getChef =  "query { chef(id: \"" + global.userID + "\", dishCount: 3, postCount: 3) { id firstName lastName emailId maxDiners minEngagementPrice canFly } }";
            listChefTransactions = "query {listChefTransactions(filters: {startDate: \"2018-07-15\", endDate: \"2018-08-05\", sortOnField: \"date\", sortDescending: true}, cursor: null, pageSize: 10) { transactions{id date bookingDate bookingId dinerName type amount serviceCharge} endCursor  }}";
            updateChef = "mutation { updateChef( chef: {userId: \"" + global.userID + "\", taxId: \"testing123456\",  active: true, maxDiners: 20, canFly: true, dateOfBirth: \"1991-01-06\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"16006\", country: \"India\"} })}";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_CHEF-001 :Create Chef api', function (done) {

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

    it('ZESTY_CHEF-002 :Add Chef Payout api', function (done) {

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

    it('ZESTY_CHEF-003 :Update Chef Payout api', function (done) {

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

    it('ZESTY_CHEF-004 :Chef Payout Method api', function (done) {

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

    it('ZESTY_CHEF-005 :Delete Chef Payout api', function (done) {

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

    it('ZESTY_CHEF-006 :Update Chef api', function (done) {

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

    it('ZESTY_CHEF-007 :Get Chef api', function (done) {

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

    it('ZESTY_CHEF-008 :Featured Chef api', function (done) {

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

    it('ZESTY_CHEF-009 :Find Chef api', function (done) {

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

    it('ZESTY_CHEF-010 :List Chef Transactions api', function (done) {

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

    it('ZESTY_CHEF-011 :Chef By Dish api', function (done) {

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

    xit('ZESTY_CHEF-012 :Delete Chef api', function (done) {

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