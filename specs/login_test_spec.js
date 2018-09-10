
var request = require('graphql-request');
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


    helperUtil = require('./../utilities/helperUtil'),
    JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL API queries', function () {

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,savedPosts,savedDishes,savedChefs,refundUser,forgotPassword,deleteUserPayment,deleteUser,deleteSavedItems,addUserToStripe,addSavedItems;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();
            helperUtil.generateAuthToken(function (err, payload) {
                if (err) {

                }
                userInfo = payload;

                updateUserQuery = "mutation { updateUser(user:{id: \"" + global.userID + "\", firstName: \"Keshav\", lastName: \"Seera\", pwd: \"P@ssw0rd\",emailId:\"charan@zestygrid.com\"}) }";
                userPaymentMethods = "query{ userPaymentMethods(userId: \"" + global.userID + "\") { type card{ cardId type last4 expMonth expYear } }}";
                updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \"card_1CaC5IJt7gce93gZgTTYcP2Y\" )}";
                savedPosts = "query { savedPosts(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore} }";
                savedDishes = "query { savedDishes(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { dishes{ id name description cuisine isDraft minPrice minDinerSize equipmentNeeded numOfLikes media { type url } } endCursor hasMore } }";
                savedChefs = "query { savedChefs(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore } }";
                refundUser = "mutation {refundUser(chargeId: \"" + global.userID + "\", amount: 285, applicationFee: 29)}";

                forgotPassword = "mutation { forgotPassword(emailId: \"" + global.emailID + "\") }";
                deleteUserPayment = "mutation { deleteUserPayment(userId: \"" + global.userID + "\", cardId: \"card_1CaC5IJt7gce93gZgTTYcP2Y\") }";
                deleteSavedItems = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { chefs:[\"d359a2c9-a71b-43e1-90f2-8d6969cb753f\", \"acec02d4-8539-498f-866b-cf82546c3e20\"] })}";
                addUserToStripe = "mutation {addUserToStripe(userId: \"" + global.userID + "\")}";
                addUserPayment = "mutation {addUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 2, expYear: 2023, cvc: 321 } } )}";
                addSavedItems = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { chefs:[\"d359a2c9-a71b-43e1-90f2-8d6969cb753f\", \"acec02d4-8539-498f-866b-cf82546c3e20\"] })}";


                done(err);
            });
        } else {
            done();
        }
    });

    it('SPISA-001 :Update User api', function (done) {

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

    it('SPISA-002 :Add User to Stripe api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query:addUserToStripe }),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Add User to Stripe response is :: " + JSON.stringify(response.data.addUserToStripe));
            done();
        });
    });

    it('SPISA-003 :Add User Payment api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: addUserPayment}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Add User Payment response is :: " + response.data.addUserPayment);
            done();
        });
    });

    it('SPISA-004 :Update User Payment api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateUserPayment}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.data.updateUserPayment));
            done();
        });
    });

    it('SPISA-005 :User Payment method api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: userPaymentMethods}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("User Payment api response is :: " + JSON.stringify(response.data.userPaymentMethods[0]));
            done();
        });
    });

    it('SPISA-006 :Add Saved Items api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: addSavedItems}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
            done();
        });
    });

    it('SPISA-007 :Saved Post api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: savedPosts}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Saved Post response is :: " + JSON.stringify(response.data.savedPosts.posts));
            done();
        });
    });

    it('SPISA-008 :Saved Dishes api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: savedDishes}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Saved Dishes api response is :: " + JSON.stringify(response.data.savedDishes.dishes));
            done();
        });
    });

    it('SPISA-009 :Saved Chefs api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: savedChefs}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.data.savedChefs.chefs));
            done();
        });
    });

    it('SPISA-010 :Refund User Payment api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: refundUser}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Refund User Payment response is :: " + JSON.stringify(response.data.refundUser));
            done();
        });
    });

    it('SPISA-011 :Forgot Password User api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: forgotPassword}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Forgot Password api response is :: " + JSON.stringify(response.data.forgotPassword));
            done();
        });
    });

    it('SPISA-012 :Delete User Payment api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deleteUserPayment}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.data.deleteUserPayment));
            done();
        });
    });

    it('SPISA-013 :Delete Saved Items api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deleteSavedItems}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
            done();
        });
    });





});





