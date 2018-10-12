var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL CTC API queries', function () {

    var updateDish,dishesByChef;

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,addUserToStripe;
    var newCardId = 'card_1CaC5IJt7gce93gZgTTYcP2Y';
    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";

    var addChefPayout,chefPayoutMethod,chefsByDish,updateChef,updateChefPayoutMethod;



    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();


            updateUserQuery = "mutation { updateUser(user:{id: \"" + global.userID + "\", firstName: \"Keshav\", lastName: \"Seera\", pwd: \"P@ssw0rd\",emailId:\"charan@zestygrid.com\"}) }";
            userPaymentMethods = "query{ userPaymentMethods(userId: \"" + global.userID + "\") { type card{ cardId type last4 expMonth expYear } }}";
            updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";
            addUserToStripe = "mutation {addUserToStripe(userId: \"" + global.userID + "\")}";
            addUserPayment = "mutation {addUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 2, expYear: 2023, cvc: 321 } } )}";

            updateChef = "mutation { updateChef( chef: {userId: \"" + global.userID + "\", taxId: \"testing123456\",  active: true, maxDiners: 20, canFly: true, completedSetupStep:2, dateOfBirth: \"1991-01-06\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"16006\", country: \"India\"} })}";
            chefsByDish = "query { chefsByDish( dishName: \"Chicken Tikka\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName } endCursor hasMore } }";
            addChefPayout = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            updateChefPayoutMethod = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            chefPayoutMethod = "query{chefPayoutMethods(chefId: \"" + global.userID + "\") { id accountId last4 routingNumber }}";



            dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10 ) { dishes{id chefId name description media {url type} cuisine dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore }}";
            updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";


            done();

        } else {
            done();
        }
    });


// User Module
    it('ZESTY_USER-001 :Update User Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+updateUserQuery);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: updateUserQuery}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + response.errors[0]);
                done();
            });
        });
    it('ZESTY_USER-002 :Update User With Invalid Token ', function (done) {

                helperUtil.addStep("Request Payload :: "+updateUserQuery);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: updateUserQuery}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + response.errors[0]);
                    done();
                });
            });


    it('ZESTY_USER-003 :Add User to Stripe Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+addUserToStripe);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query:addUserToStripe }),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Add User to Stripe response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_USER-004 :Add User to Stripe With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+addUserToStripe);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query:addUserToStripe }),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add User to Stripe response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });


    it('ZESTY_USER-005 :Add User Payment Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+addUserPayment);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: addUserPayment}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Add User Payment response is :: " + response.errors[0]);
                done();
            });
        });
    it('ZESTY_USER-006 :Add User Payment With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+addUserPayment);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: addUserPayment}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add User Payment response is :: " + response.errors[0]);
                    done();
                });
            });


    it('ZESTY_USER-007 :User Payment method Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+userPaymentMethods);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: userPaymentMethods}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                global.cardID = response.data.userPaymentMethods[0].card.cardId;
                helperUtil.addStep("User Payment api response is :: " + JSON.stringify(response.errors[0]));
                done();
            }).catch(err => done(err));
        });
    it('ZESTY_USER-008 :User Payment method With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+userPaymentMethods);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: userPaymentMethods}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    //global.cardID = response.data.userPaymentMethods[0].card.cardId;
                    helperUtil.addStep("User Payment api response is :: " + JSON.stringify(response.errors[0]));
                    done();
                }).catch(err => done(err));
            });

    it('ZESTY_USER-009 :Update User Payment Without token', function (done) {



                console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
                newCardId = global.cardID;
                helperUtil.addStep("New Card ID is :: "+newCardId);
                updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

                console.log("New Request :: "+updateUserPayment);

                helperUtil.addStep("Request Payload :: "+updateUserPayment);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                    body: JSON.stringify({query: updateUserPayment}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.errors));

                    done();
                }).catch(err => {

                    done(err);
                });
            });
    it('ZESTY_USER-010 :Update User Payment With Invalid Token', function (done) {



                    console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
                    newCardId = global.cardID;
                    helperUtil.addStep("New Card ID is :: "+newCardId);
                    updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

                    console.log("New Request :: "+updateUserPayment);

                    helperUtil.addStep("Request Payload :: "+updateUserPayment);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                        body: JSON.stringify({query: updateUserPayment}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.errors));

                        done();
                    }).catch(err => {

                        done(err);
                    });
                });


//Chef Module

    it('ZESTY_CHEF-011 :Chef By Dish Without Auth Token', function (done) {

             helperUtil.addStep("Request Payload :: "+chefsByDish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: chefsByDish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_CHEF-012 :Chef By Dish With Invalid Auth Token', function (done) {

                 helperUtil.addStep("Request Payload :: "+chefsByDish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: chefsByDish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });


    it('ZESTY_CHEF-013 :Add Chef Payout Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+addChefPayout);
            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: addChefPayout}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_CHEF-014 :Add Chef Payout With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+addChefPayout);
                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: addChefPayout}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });


    it('ZESTY_CHEF-015 :Update Chef Payout Without Token', function (done) {

             helperUtil.addStep("Request Payload :: "+updateChefPayoutMethod);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: updateChefPayoutMethod}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_CHEF-016 :Update Chef Payout With Invalid Token', function (done) {

                 helperUtil.addStep("Request Payload :: "+updateChefPayoutMethod);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: updateChefPayoutMethod}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

    it('ZESTY_CHEF-017 :Chef Payout Method Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+chefPayoutMethod);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                body: JSON.stringify({query: chefPayoutMethod}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_CHEF-018 :Chef Payout Method With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+chefPayoutMethod);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: chefPayoutMethod}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

    it('ZESTY_CHEF-019 :Update Chef Without Token', function (done) {

            helperUtil.addStep("Request Payload :: "+updateChef);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: updateChef}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });
    it('ZESTY_CHEF-020 :Update Chef With Invalid Token', function (done) {

                helperUtil.addStep("Request Payload :: "+updateChef);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: updateChef}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

//Dishes

    it('ZESTY_DISHES-021 : Dishes By Chef Without Auth Token', function (done) {

                helperUtil.addStep("Request Payload :: "+dishesByChef);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                    body: JSON.stringify({query: dishesByChef}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

    it('ZESTY_DISHES-022 : Dishes By Chef Without Auth Token', function (done) {

                 helperUtil.addStep("Request Payload :: "+dishesByChef);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken + "123"},
                     body: JSON.stringify({query: dishesByChef}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                     done();
                 });
             });



    it('ZESTY_DISHES-023 : Update Dish api', function (done) {

            helperUtil.addStep("New Dish ID is :: "+newDishID);

            updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 174.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";


            helperUtil.addStep("Request Payload :: "+updateDish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                body: JSON.stringify({query: updateDish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });






     it('ZESTY_DISHES-024 : Update Dish api', function (done) {

             helperUtil.addStep("New Dish ID is :: "+newDishID);

             updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 174.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";


             helperUtil.addStep("Request Payload :: "+updateDish);

             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                 body: JSON.stringify({query: updateDish}),
             }).then(function (res) {

                 return res.json();

             }).then(function (response) {
                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                 done();
             });
         });

});