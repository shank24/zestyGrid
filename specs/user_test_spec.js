var request = require('graphql-request');
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


    helperUtil = require('./../utilities/helperUtil'),
    JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL USER API queries', function () {

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,savedPosts,savedDishes,savedChefs,refundUser,forgotPassword,deleteUserPayment,deleteUser,deleteSavedItems,addUserToStripe,addSavedItems;
    var newCardId = 'card_1CaC5IJt7gce93gZgTTYcP2Y';

    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();
            helperUtil.generateAuthToken(function (err, payload) {
                if (err) {

                }
                userInfo = payload;

                console.log(">>>>>>>>>>>>>>>>>>>> HOLA  A A  A A A A  >>>>>>>>>>>>>> "+global.userID);



                updateUserQuery = "mutation { updateUser(user:{id: \"" + global.userID + "\", firstName: \"Keshav\", lastName: \"Seera\", pwd: \"P@ssw0rd\",emailId:\"charan@zestygrid.com\",profilePic:\"https://homepages.cae.wisc.edu/~ece533/images/airplane.png\",cellPhone: \"9814644011\",dateOfBirth: \"1991-01-06\"}) }";
                userPaymentMethods = "query{ userPaymentMethods(userId: \"" + global.userID + "\") { type card{ cardId type last4 expMonth expYear } }}";
                updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

                refundUser = "mutation {refundUser(chargeId: \"" + global.userID + "\", amount: 285, applicationFee: 29)}";

                forgotPassword = "mutation { forgotPassword(emailId: \"" + global.emailID + "\") }";
                deleteUserPayment = "mutation { deleteUserPayment(userId: \"" + global.userID + "\", cardId: \"card_1CaC5IJt7gce93gZgTTYcP2Y\") }";
                deleteSavedItems = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { chefs:[\"d5f165e5-e60c-4025-ac04-f2ff9d89e96e\", \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\"] })}";
                addUserToStripe = "mutation {addUserToStripe(userId: \"" + global.userID + "\")}";
                addUserPayment = "mutation {addUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 2, expYear: 2023, cvc: 321 } } )}";




                done(err);
            });
        } else {
            done();
        }
    });

    it('ZESTY_USER-001 :Update User api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateUserQuery);

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

    it('ZESTY_USER-002 :Add User to Stripe api', function (done) {

        helperUtil.addStep("Request Payload :: "+addUserToStripe);

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

    it('ZESTY_USER-003 :Add User Payment api', function (done) {

        helperUtil.addStep("Request Payload :: "+addUserPayment);

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

    it('ZESTY_USER-004 :User Payment method api', function (done) {

        helperUtil.addStep("Request Payload :: "+userPaymentMethods);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: userPaymentMethods}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            global.cardID = response.data.userPaymentMethods[0].card.cardId;
            helperUtil.addStep("User Payment api response is :: " + JSON.stringify(response.data.userPaymentMethods[0]));
            done();
        }).catch(err => done(err));
    });

    it('ZESTY_USER-005 :Update User Payment api', function (done) {



        console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
        newCardId = global.cardID;
        helperUtil.addStep("New Card ID is :: "+newCardId);
        updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

        console.log("New Request :: "+updateUserPayment);

        helperUtil.addStep("Request Payload :: "+updateUserPayment);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateUserPayment}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.data.updateUserPayment));

            done();
        }).catch(err => {

            done(err);
        });
    });

    it('ZESTY_USER-006 :Refund User Payment api', function (done) {

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

    it('ZESTY_USER-007 :Forgot Password User api', function (done) {

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

    xit('ZESTY_USER-008 :Delete User Payment api', function (done) {

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

    xit('ZESTY_USER-009 :Delete Saved Items api', function (done) {

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