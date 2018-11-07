var request = require('graphql-request');
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


    helperUtil = require('./../utilities/helperUtil'),
    JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');

describe('Third User - Test GraphQL USER API queries', function () {

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,savedPosts,savedDishes,savedChefs,refundUser,forgotPassword,deleteUserPayment,deleteUser,deleteSavedItems,addUserToStripe,addSavedItems;

    var newCardId = 'card_1CaC5IJt7gce93gZgTTYcP2Y';
    


    var addChefPayout,chefPayoutMethod,chefsByDish,createChef,deleteChef,deleteChefPayoutMethod,featuredChefs,findChefs,getChef, listChefTransactions,updateChef,updateChefPayoutMethod,createCandidate;

    var calculatePrice,createDish,cuisines,deleteDish,dish,dishesByChef,dishesList,featuredDishes,findDishes,getAvailableDishes,updateDish,userLikeDish ;

    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";

    var chefBookings,createBooking,createInProgressBooking,markBookingAsCompleted,reserveChefSlot,updateBooking,updateInProgressBooking,userBookings ;

    var bookingID,newBookingID,updatedNewBookingID;

    var createPost,deletePost,featuredPosts,getPostById,posts,updatePost,userLikePost;

    var newPostID = "ef03145a-de48-484c-8f1c-db3409aecef4";


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


                user = "query { user(id: \"" + global.userID + "\") { id emailId firstName lastName cellPhone isChef campaign accessToken profilePic dateOfBirth altPhone address{street1} paymentInfo{ type card{ cardId type last4 } } } }";

                createSupportProfile = "mutation { createSupportProfile(userId: \"" + global.userID + "\") }";


//Chef Module

                addChefPayout = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
                updateChefPayoutMethod = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
                chefPayoutMethod = "query{chefPayoutMethods(chefId: \"" + global.userID + "\") { id accountId last4 routingNumber }}";

                chefsByDish = "query { chefsByDish( dishName: \"Palak Paneer\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName maxTravelDistance} endCursor hasMore } }";

                createChef = "mutation { createChef( chef: {userId: \"" + global.userID + "\",  cuisines: [\"Chinese\",\"Italian\"], taxId: \"testing123456\", maxDiners:200, minEngagementPrice:125.23, active: true, canFly: false, geoLocation: { type: \"Point\", coordinates:[-119.417931,36.778259] },  chefType: HOME_COOK, address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Los Angeles\", state: \"California\", zip: \"90004\", country: \"USA\"} ,dateOfBirth: \"1991-01-06\" }) }";

                deleteChef = "mutation { deleteChef(id: \"" + global.userID + "\") }";
                deleteChefPayoutMethod = "mutation { deleteChefPayoutMethod(chefId: \"" + global.userID + "\", accountId: \"acct_1CoSlsHOKx7hBtn4\") }";
                featuredChefs = "query{ featuredChefs(chefCount:  10) {id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active }}";
                findChefs = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

                getChef =  "query { chef(id: \"" + global.userID + "\", dishCount: 3, postCount: 3) { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

                listChefTransactions = "query {listChefTransactions(filters: {startDate: \"2018-07-15\", endDate: \"2018-08-05\", sortOnField: \"date\", sortDescending: true}, cursor: null, pageSize: 10) { transactions{id date bookingDate bookingId dinerName type amount serviceCharge} endCursor  }}";
                updateChef = "mutation { updateChef( chef: {userId: \"" + global.userID + "\", taxId: \"testing123456\",  active: true, maxDiners: 20, canFly: true, completedSetupStep:2, dateOfBirth: \"1991-01-06\",geoLocation: { type: \"Point\", coordinates:[-119.417931,36.778259] }, address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Los Angeles\", state: \"California\", zip: \"90004\", country: \"USA\"} })}";

                createCandidate = "mutation { createCandidate(chef: {firstName: \"Alex\", lastName: \"Price\", email: \"" + global.emailID+ "\", phone: \"9814644011\", dob: \"1991-01-06\", ssn: \"111-11-2001\", zipcode: \"90004\"}) }";

//Dish Module

                createDish = "mutation { createDish( dish: { chefId : \"" + global.userID + "\",  name : \"Palak Paneer\", description : \"Laborum ad occaecat\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 71.9982, approxPrepTime : 24, dishTypes : [ ORGANIC,PALEO, GLUTEN_FREE, SOY_FREE, NUT_FREE, DAIRY_FREE, KETO,VEGAN,MEAT,NOMEAT,KOSHER,HALAL ], isDraft: false, ingredients : [ \"Red Chillies\", \"Pork\", ], liked:true, equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ],  minDinerSize : 200, minPrice : 90.9526, media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";
                calculatePrice = "mutation { calculatePrice(dishId: \""+ newDishID + "\", dinerCount: 1000000) }";

                cuisines = "query { cuisines(country: \"US\") }";
                dishesList = "query {dishesList(country: \"US\")}";
                getAvailableDishes = "query { getAvailableDishes(country: \"USA\") }";

                userLikeDish ="mutation { userLikeDish(userId: \"" + global.userID + "\", dishId: \""+ newDishID + "\") }";

                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes liked ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes saved } }";

                dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\" ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

                featuredDishes = "query { featuredDishes(dishCount: 10) {id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} }";

                findDishes = "query {findDishes(filters: { longitude:-119.417931 , latitude:36.778259}, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

                updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], isDraft: false, equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";

                deleteDish = "mutation { deleteDish(id: \""+ newDishID + "\") }";

//Booking

                reserveChefSlot = "mutation { reserveChefSlot(chefId: \"" + global.userID + "\", userId: \"" + global.userID + "\", day: \"2018-08-13\", slot: {start: \"11:30\", end: \"14:00\"}) }";

                createInProgressBooking = "mutation { createInProgressBooking(booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", date: \"2018-08-13\", timeSlot: { start: \"11:00\", end: \"13:00\"}, dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }] ,  equipmentsPresent: [\"Microwave Oven\", \"Grill\", \"Gas\"], cardId: \"" + global.cardID + "\",   }) }";
                updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\", dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }]  }) }";

                createBooking = "mutation { createBooking(bookingId: \""+ newBookingID +"\" ) }";
                updateBooking = "mutation { updateBooking(bookingId: \""+ updatedNewBookingID +"\", status: COMPLETED ) }";

                markBookingAsCompleted = "mutation { markBookingAsCompleted(id: \"" + global.userID + "\", bookingId: \""+ updatedNewBookingID +"\") }";

                chefBookings =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15, next:null,previous:null) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

                userBookings = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore} }";

//Posts


                createPost = "mutation { createPost( post: { chefId : \"" + global.userID + "\", title : \"Fungee1\", body : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\",  tags: [ \"Algae\" , \"Weed\" ], liked:true, media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\",size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE } ], isDraft:false }) }";

                getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft saved tags numOfLikes media{ type url } } }";

                featuredPosts = "query {featuredPosts(postCount: 10) {id chefId title blurb body isDraft tags numOfLikes media{ type url }}}";

                userLikePost = "mutation { userLikePost(userId: \"" + global.userID + "\", postId: \""+ newPostID + "\") }";

                posts = "query {posts(filters: { title: \"Fun\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

                updatePost = "mutation { updatePost( post: { chefId:  \"" + global.userID + "\", id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

                deletePost = "mutation { deletePost(id: \""+ newPostID +"\") }";

     done(err);
            });
        } else {
            done();
        }
    });


    it('C_ZESTY_USER-001 :Update User api', function (done) {

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

    it('C_ZESTY_USER-002 :Add User to Stripe api', function (done) {

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

    it('C_ZESTY_USER-003 :Add User Payment api', function (done) {

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

    it('C_ZESTY_USER-004 :User Payment method api', function (done) {

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

    it('C_ZESTY_USER-005 :Update User Payment api', function (done) {



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


//Chef

     it('C_ZESTY_CHEF-006 :Create Candidate api', function (done) {

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

     it('C_ZESTY_CHEF-007 :Create Chef api', function (done) {

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

     it('C_ZESTY_CHEF-008 :Get Chef api', function (done) {

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

     it('C_ZESTY_CHEF-009 :Add Chef Payout api', function (done) {

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

     it('C_ZESTY_CHEF-010 :Update Chef Payout api', function (done) {

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

     it('C_ZESTY_CHEF-011 :Chef Payout Method api', function (done) {

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

     it('C_ZESTY_CHEF-012 :Update Chef api', function (done) {

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

     it('C_ZESTY_CHEF-013 :Get Chef api', function (done) {

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

     it('C_ZESTY_CHEF-014 :Featured Chef api', function (done) {

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

     it('C_ZESTY_CHEF-015 :Find Chef api', function (done) {

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

     it('C_ZESTY_CHEF-016 :List Chef Transactions api', function (done) {

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

     it('C_ZESTY_CHEF-017 :Chef By Dish api', function (done) {

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

//Dish

    it('C_ZESTY_DISHES-018 : Create Dish api', function (done) {

            helperUtil.addStep("Request Payload :: "+createDish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: createDish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {

                global.dishID = response.data.createDish;

                console.log("Dish ID is :: >>>>>>>>>>> New Dish ID >>>>>>>>>>"+dishID);


                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));


                done();
            });
        });

    it('C_ZESTY_DISHES-019 : Calculate Price api', function (done) {


            newDishID= global.dishID;

            helperUtil.addStep("New Dish ID is :: "+newDishID);

            calculatePrice = "mutation { calculatePrice(dishId: \""+ newDishID + "\", dinerCount: 1000000) }";


            helperUtil.addStep("Request Payload :: "+calculatePrice);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: calculatePrice}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-020 : Cuisine api', function (done) {

            helperUtil.addStep("Request Payload :: "+cuisines);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: cuisines}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-021 : Dishes List api', function (done) {

                helperUtil.addStep("Request Payload :: "+dishesList);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dishesList}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

    it('C_ZESTY_DISHES-022 : Get Available Dishes api', function (done) {

                    helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: getAvailableDishes}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
                });

    it('C_ZESTY_DISHES-023 : User Liked Dish api', function (done) {

                        helperUtil.addStep("New Dish ID is :: "+newDishID);

                        userLikeDish ="mutation { userLikeDish(userId: \"" + global.userID + "\", dishId: \""+ newDishID + "\") }";

                        helperUtil.addStep("Request Payload :: "+userLikeDish);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: userLikeDish}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                            done();
                        });
                    });

    it('C_ZESTY_DISHES-024 : Dish api', function (done) {

            helperUtil.addStep("New Dish ID is :: "+newDishID);


            dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes liked isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes saved } }";

            helperUtil.addStep("Request Payload :: "+dish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-025 : Dishes By Chef api', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-026 : Featured Dishes api', function (done) {

            helperUtil.addStep("Request Payload :: "+featuredDishes);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: featuredDishes}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-027 : Find Dishes api', function (done) {

            helperUtil.addStep("Request Payload :: "+findDishes);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: findDishes}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-028 : Update Dish api', function (done) {

            helperUtil.addStep("New Dish ID is :: "+newDishID);

            updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 174.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";


            helperUtil.addStep("Request Payload :: "+updateDish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateDish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('C_ZESTY_DISHES-029 : Re-Test After Updation Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);


                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

    it('C_ZESTY_DISHES-030 : Dishes By Chef api', function (done) {

                    helperUtil.addStep("Request Payload :: "+dishesByChef);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: dishesByChef}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
                });


//Bookings

     it('C_ZESTY_BOOKINGS-031 : Reserve Chef Slot api', function (done) {

            helperUtil.addStep("Request Payload :: "+reserveChefSlot);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: reserveChefSlot}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

     it('C_ZESTY_BOOKINGS-032 : Create In Progress Booking api', function (done) {

            helperUtil.addStep("Request Payload :: "+createInProgressBooking);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: createInProgressBooking}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                bookingID = response.data.createInProgressBooking;
                console.log("New Booking ID :: "+bookingID);
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

     it('C_ZESTY_BOOKINGS-033 : Update In Progress Booking api', function (done) {

            console.log("Booking ID :: "+bookingID);

            newBookingID = bookingID;

            updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\", dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }]  }) }";

            console.log(">>>>>>>>>>"+updateInProgressBooking);
            helperUtil.addStep("Request Payload :: "+updateInProgressBooking);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateInProgressBooking}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
                done();
            }).catch(err => {
                //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
                done(err);
            });
        });

     it('C_ZESTY_BOOKINGS-034 : Create Booking api', function (done) {

            //helperUtil.addStep("Booking ID :: "+bookingID);

            newBookingID = bookingID;

            helperUtil.addStep("New Booking ID :: >>>>>>>>>>>>>>>>>"+newBookingID);

            createBooking = "mutation { createBooking(bookingId: \""+ newBookingID +"\" ) }";


            //helperUtil.addStep("Create booking :: <<<<<<<<<<<<<<<<<<<<<HOLA >>>"+createBooking);

            helperUtil.addStep("Request Payload :: "+createBooking);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: createBooking}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                updatedNewBookingID = response.data.createBooking;
                global.bookingIDFinal=updatedNewBookingID;
                console.log("New Booking ID :: "+updatedNewBookingID);


                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
                done();
            }).catch(err => {
                //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
                done(err);
            });
        });

     it('C_ZESTY_BOOKINGS-035 : Mark Booking As Complete Api ', function (done) {

                 helperUtil.addStep("Create booking Updated :: <<<<<<<<<<<<<<<<<<<<<HOLA >>>"+updatedNewBookingID);


                 markBookingAsCompleted = "mutation { markBookingAsCompleted(id: \"" + global.userID + "\", bookingId: \""+ updatedNewBookingID +"\") }";

                 helperUtil.addStep("Request Payload :: "+markBookingAsCompleted);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: markBookingAsCompleted}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                     done();
                 });
             });

     it('C_ZESTY_BOOKINGS-036 : Chef Booking api', function (done) {

                        helperUtil.addStep("Request Payload :: "+chefBookings);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: chefBookings}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {

                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                            done();
                        });
            });

     it('C_ZESTY_BOOKINGS-037 : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
         });


//Posts

      it('C_ZESTY_POST-038 :Create Post api', function (done) {

             helperUtil.addStep("Request Payload :: "+createPost);

             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                 body: JSON.stringify({query: createPost}),
             }).then(function (res) {

                 return res.json();

             }).then(function (response) {

                 global.postID = response.data.createPost;

                 console.log("New Post ID :: "+postID);

                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                 done();
             });
         });

      it('C_ZESTY_POST-039 :Get Post By ID api', function (done) {

                console.log("Booking ID :: "+postID);

                newPostID = postID;


                getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft saved tags numOfLikes media{ type url } } }";

                helperUtil.addStep("Request Payload :: "+getPostById);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: getPostById}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

      it('C_ZESTY_POST-040 :Featured Post api', function (done) {

             helperUtil.addStep("Request Payload :: "+featuredPosts);

             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                 body: JSON.stringify({query: featuredPosts}),
             }).then(function (res) {

                 return res.json();

             }).then(function (response) {
                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                 done();
             });
         });

      it('C_ZESTY_POST-041 :User Like Post api', function (done) {

                            console.log("Booking ID :: "+postID);

                            newPostID = postID;

                           userLikePost = "mutation { userLikePost(userId: \"" + global.userID + "\", postId: \""+ newPostID + "\") }";


                            helperUtil.addStep("Request Payload :: "+userLikePost);

                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                body: JSON.stringify({query: userLikePost}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                done();
                            });
              });

      it('C_ZESTY_POST-042 :Posts api', function (done) {

             helperUtil.addStep("Request Payload :: "+posts);

             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                 body: JSON.stringify({query: posts}),
             }).then(function (res) {

                 return res.json();

             }).then(function (response) {
                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                 done();
             });
         });

      it('C_ZESTY_POST-043 :Update Post api', function (done) {

             console.log("Booking ID :: "+postID);

             newPostID = postID;


             updatePost = "mutation { updatePost( post: { id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

             helperUtil.addStep("Request Payload :: "+updatePost);

             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                 body: JSON.stringify({query: updatePost}),
             }).then(function (res) {

                 return res.json();

             }).then(function (response) {
                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                 done();
             });
         });

      it('C_ZESTY_POST-044 :Calling Get Post After Update api', function (done) {

                    console.log("Booking ID :: "+postID);

                    newPostID = postID;


                    getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

                    helperUtil.addStep("Request Payload :: "+getPostById);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: getPostById}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
                });

});