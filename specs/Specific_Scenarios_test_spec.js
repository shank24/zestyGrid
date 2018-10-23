var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test Q Series Specific Scenarios API', function () {


    var updateDish,dishesByChef;

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,addUserToStripe;
    var newCardId = 'card_1CaC5IJt7gce93gZgTTYcP2Y';
    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";
    var newPostID = "ef03145a-de48-484c-8f1c-db3409aecef4";
    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";

    var addChefPayout,chefPayoutMethod,chefsByDish,updateChef,updateChefPayoutMethod,findChefs;





    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();



            chefsByDish = "query { chefsByDish( dishName: \"Aloo Puri\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName } endCursor hasMore next hasNext previous hasPrevious} }";

            chefsByDish_1 = "query { chefsByDish( dishName: \"Chicken Tikka\", cursor: null, pageSize: 10,next:null, previous:null) { chefs {id emailId firstName lastName } endCursor hasMore next hasNext previous hasPrevious} }";


            findChefs_1 = "query{findChefs(filters: { cuisines: [\"\",\"\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_2 = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_3 = "query{findChefs(filters: { cuisines: [\"Chinese\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_4 = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_5 = "query{findChefs(filters: {  dishes:[\"Palak Paneer\"] }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_6 = "query{findChefs(filters: {  priceMin:25 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_7 = "query{findChefs(filters: {  priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_8 = "query{findChefs(filters: {  priceMin:25, priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_9 = "query{findChefs(filters: {  }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_10 = "query{findChefs(filters: { search: \"90004\", searchType: ZIPCODE }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_11 = "query{findChefs(filters: { search: \"91342\", searchType: ZIPCODE}, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_12 = "query{findChefs(filters: { search: \"93101\", searchType: ZIPCODE}, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_13 = "query{findChefs(filters: {  priceMin:110 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_14 = "query{findChefs(filters: {  priceMax:190 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";



            dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_1 = "query {dishesByChef( chefId: \"" + global.userID +123+ "\", pageSize: 10, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_2 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:false, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_3 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:true, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";


            findDishes_1 = "query {findDishes(filters: { longitude:-119.417931 , latitude:36.778259}, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_2 = "query {findDishes(filters: { }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_3 = "query {findDishes(filters: { cuisines: [\"Chinese\",\"Italian\"] }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_4 = "query {findDishes(filters: { dishes:[\"Palak Paneer\"] }, cursor: null, pageSize:10, includeChefs:true,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_5 = "query {findDishes(filters: { cuisines: [\"Chinese\"] }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_6 = "query {findDishes(filters: { priceMin:80 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_7 = "query {findDishes(filters: { priceMin:150 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";


             posts = "query {posts(filters: { title: \"Fun\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_1 = "query {posts(filters: { title: \"Furnace\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_2 = "query {posts(filters: { title: \"Fungee\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_3 = "query {posts(filters: { tags: [ \"Algae\"] }) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_4 = "query {posts(filters: { tags: [ \"Algae\"], title: \"Fungee\" ,chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6,next:null, previous:null) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";



             user_1 = "query { user(id: \"" + global.userID +123+ "\") { id, emailId, firstName, lastName,cellPhone,isChef,campaign,accessToken,profilePic,dateOfBirth,altPhone,address{street1} } }";

             user = "query { user(id: \"" + global.userID + "\") { id emailId firstName lastName cellPhone isChef campaign accessToken profilePic dateOfBirth altPhone address{street1} paymentInfo{ type card{ cardId type last4 } } } }";


             savedChefs_1 = "query { savedChefs(userId: \"" + global.userID + 123 + "\", cursor: null, pageSize: 6) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore } }";

             savedChefs_2 = "query { savedChefs(userId: \"" + global.userID + "\", cursor: null, pageSize: 6,next:null, previous:null) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore next hasNext previous hasPrevious } }";


             savedDishes_1 = "query { savedDishes(userId: \"" + global.userID + 123 + "\", cursor: null, pageSize: 6) { dishes{ id name description   minPrice minDinerSize equipmentNeeded numOfLikes media { type url } } endCursor hasMore } }";

             savedDishes_2 = "query { savedDishes(userId: \"" + global.userID + "\", cursor: null, pageSize: 6,next:null, previous:null) { dishes{ id name description   minPrice minDinerSize equipmentNeeded numOfLikes media { type url } }endCursor hasMore next hasNext previous hasPrevious } }";


             savedPosts_1 = "query { savedPosts(userId: \"" + global.userID + 123 +  "\", cursor: null, pageSize: 6) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore} }";

             savedPosts_2 = "query { savedPosts(userId: \"" + global.userID +  "\", cursor: null, pageSize: 6,next:null, previous:null) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore next hasNext previous hasPrevious} }";


             reviewTagsForChef = "query { reviewTagsForChef(userId: \"" + global.userID + "\") } ";


             getAvailableDishes = "query { getAvailableDishes(country: \"USA\") }";

             getAvailableDishes_1 = "query { getAvailableDishes(country: \"UK\") }";


             getChef =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

             getChef_1 =  "query { chef(id: \"" + global.userID + 123 + "\", dishCount: 3, postCount: 3) { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

             getChef_2 =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2}  payoutMethod { id accountId last4 routingNumber } } }";

             getChef_3 =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName emailId maxDiners minEngagementPrice canFly active address{ street1 street2 } dishesList{ dishes{id name cuisines} hasMore next } } } ";


             reviews = "query { reviews(filters: {reviewee: \"" + global.userID + "\", reviewType: DISH}, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";

             reviews_1 = "query { reviews(filters: {reviewee: \"" + global.userID + "\", reviewType: CHEF, bookingId:\"" + global.bookingIDFinal + "\" }, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";



             dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";


             getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";


             cuisines = "query { cuisines(country: \"US\") }";


             userBookings_1 = "query { userBookings(userId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore } }";

             userBookings_2 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,next:null, previous:null) {bookings{ id chefId  date   chefReviewId } endCursor hasMore next hasNext previous hasPrevious} }";

             userBookings_3 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED_BY_CHEF, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore} }";

             userBookings_4 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,next:null, previous:null) {bookings{ id chefId  date   chefReviewId } endCursor hasMore next hasNext previous hasPrevious} }";


             chefBookings_1 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

             chefBookings_2 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15,next:null, previous:null) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore next hasNext previous hasPrevious} }";

             chefBookings_3 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

             chefBookings_4 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";





             done();


        } else {
            done();
        }
    });



//Chef Module

 it('01-With Dish Non-Existent :Q7_ChefByDish', function (done) {

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


 it('02-With Dish Pagination TCs :Q7_ChefByDish', function (done) {

         helperUtil.addStep("Request Payload :: "+chefsByDish_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefsByDish_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



it('03-With Empty List : Q8__find_Chefs', function (done) {
          helperUtil.addStep("Request Payload :: "+findChefs_1);


        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: findChefs_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

   it('04-With Pagination TCs: Q8__find_Chefs', function (done) {
            helperUtil.addStep("Request Payload :: "+findChefs_2);


          fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
              body: JSON.stringify({query: findChefs_2}),
          }).then(function (res) {

              return res.json();

          }).then(function (response) {
              helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
              done();
          });
      });


    it('05-With One Cuisine : Q8__find_Chefs', function (done) {
                  helperUtil.addStep("Request Payload :: "+findChefs_3);


                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: findChefs_3}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });


     it('06-With Two Cuisine : Q8__find_Chefs', function (done) {

                      helperUtil.addStep("Request Payload :: "+findChefs_4);


                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: findChefs_4}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
      });

      it('07-With One Dish : Q8__find_Chefs', function (done) {
                          helperUtil.addStep("Request Payload :: "+findChefs_5);


                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: findChefs_5}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                            done();
                        });
          });



     it('08-With price Min: Q8__find_Chefs', function (done) {
                              helperUtil.addStep("Request Payload :: "+findChefs_6);


                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                body: JSON.stringify({query: findChefs_6}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                done();
                            });
      });



       it('09-With price Max: Q8__find_Chefs', function (done) {
                                helperUtil.addStep("Request Payload :: "+findChefs_7);


                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                  body: JSON.stringify({query: findChefs_7}),
                              }).then(function (res) {

                                  return res.json();

                              }).then(function (response) {
                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                  done();
                              });
       });



       it('10-With both price_Min & price Max: Q8__find_Chefs', function (done) {
                                helperUtil.addStep("Request Payload :: "+findChefs_8);


                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                  body: JSON.stringify({query: findChefs_8}),
                              }).then(function (res) {

                                  return res.json();

                              }).then(function (response) {
                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                  done();
                              });
       });


       it('11-No Filters: Q8__find_Chefs', function (done) {
                                       helperUtil.addStep("Request Payload :: "+findChefs_9);


                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                         method: 'POST',
                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                         body: JSON.stringify({query: findChefs_9}),
                                     }).then(function (res) {

                                         return res.json();

                                     }).then(function (response) {
                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                         done();
                                     });
       });


        it('11_1-Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                               helperUtil.addStep("Request Payload :: "+findChefs_10);


                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                 method: 'POST',
                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                 body: JSON.stringify({query: findChefs_10}),
                                             }).then(function (res) {

                                                 return res.json();

                                             }).then(function (response) {
                                                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                 done();
                                             });
         });

        it('11_2-Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                                       helperUtil.addStep("Request Payload :: "+findChefs_11);


                                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                         method: 'POST',
                                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                         body: JSON.stringify({query: findChefs_11}),
                                                     }).then(function (res) {

                                                         return res.json();

                                                     }).then(function (response) {
                                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                         done();
                                                     });
        });


        it('11_3-Invalid Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                                       helperUtil.addStep("Request Payload :: "+findChefs_12);


                                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                         method: 'POST',
                                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                         body: JSON.stringify({query: findChefs_12}),
                                                     }).then(function (res) {

                                                         return res.json();

                                                     }).then(function (response) {
                                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                         done();
                                                     });
        });

        it('11_4-Price Min Scenario Search api  : Q8__find_Chefs', function (done) {
                                                               helperUtil.addStep("Request Payload :: "+findChefs_13);


                                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                                 method: 'POST',
                                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                                 body: JSON.stringify({query: findChefs_13}),
                                                             }).then(function (res) {

                                                                 return res.json();

                                                             }).then(function (response) {
                                                                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                                 done();
                                                             });
         });


         it('11_5-Price Max Scenario Based Search api  : Q8__find_Chefs', function (done) {
                                                                helperUtil.addStep("Request Payload :: "+findChefs_14)


                                                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                                  method: 'POST',
                                                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                                  body: JSON.stringify({query: findChefs_14}),
                                                              }).then(function (res) {

                                                                  return res.json();

                                                              }).then(function (response) {
                                                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                                  done();
                                                              });
          });




//Dishes


     it('12-With Non Existent Chef: Q11_Dishes_By_Chef', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });

     it('13-With Live Set to False: Q11_Dishes_By_Chef', function (done) {

                helperUtil.addStep("Request Payload :: "+dishesByChef_2);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dishesByChef_2}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });


     it('14-With Live Set to True: Q11_Dishes_By_Chef', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef_3);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef_3}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });


    it('15-With Valid Chef: Q11_Dishes_By_Chef', function (done) {

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


//Posts

it('16-With Invalid Data In Title :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

it('17-With Valid Data & Pagination Case :Q15_Posts', function (done) {

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

it('18-With Specifc Title  :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_2);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_2}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



it('19-With Specifc Tags  :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_3);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_3}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



it('20-With Specifc Title  & Tags :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_4);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_4}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



//User Module



it('21-With Non Existent User :Q1_User', function (done) {

        helperUtil.addStep("Request Payload :: "+user_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: user_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
            done();
        });
    });



it('22-With Existent User Specifc Fields :Q1_User', function (done) {

        helperUtil.addStep("Request Payload :: "+user);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: user}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


it('23-With Invalid Chef :Saved Chefs api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedChefs_1);


                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: savedChefs_1}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {


                                    helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.errors));

                                    done();
                                });
                            });


 it('24-With Pagination Scenario :Saved Chefs api', function (done) {

                                      helperUtil.addStep("Request Payload :: "+savedChefs_2);


                                                          fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                              method: 'POST',
                                                              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                              body: JSON.stringify({query: savedChefs_2}),
                                                          }).then(function (res) {

                                                              return res.json();

                                                          }).then(function (response) {
                                                              helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.data.savedChefs.chefs[0]));


                                                              done();
                                                          });
              });



            it('25-With Invalid Chef :Saved Dishes api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedDishes_1);


                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: savedDishes_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Saved Dishes api response is :: " + JSON.stringify(response.errors));
                        done();
                    });
                });



                  it('26-With Pagination Scenario :Saved Dishes api', function (done) {

                                         helperUtil.addStep("Request Payload :: "+savedDishes_2);


                                                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                     method: 'POST',
                                                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                     body: JSON.stringify({query: savedDishes_2}),
                                                 }).then(function (res) {

                                                     return res.json();

                                                 }).then(function (response) {
                                                     helperUtil.addStep("Saved Dishes api response is :: " + JSON.stringify(response.data.savedDishes.dishes));
                                                     done();
                                                 });
                  });




            it('27-With Invalid Chef ::Saved Post api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedPosts_1);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: savedPosts_1}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Saved Post response is :: " + JSON.stringify(response.errors));
                                    done();
                                });
             });


             it('28-With Pagination Scenario :Saved Post api', function (done) {

                        helperUtil.addStep("Request Payload :: "+savedPosts_2);

                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                 method: 'POST',
                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                 body: JSON.stringify({query: savedPosts_2}),
                                             }).then(function (res) {

                                                 return res.json();

                                             }).then(function (response) {
                                                 helperUtil.addStep("Saved Post response is :: " + JSON.stringify(response.data.savedPosts.posts));
                                                 done();
                                             });
                        });





             it('29-With Valid Values : Find Dishes api', function (done) {

                    helperUtil.addStep("Request Payload :: "+findDishes_1);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: findDishes_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
                });


                 it('30-With Blank Filters: Find Dishes api', function (done) {

                        helperUtil.addStep("Request Payload :: "+findDishes_2);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: findDishes_2}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                            done();
                        });
                    });


                     it('31-Two-Cuisines: Find Dishes api', function (done) {

                            helperUtil.addStep("Request Payload :: "+findDishes_3);

                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                body: JSON.stringify({query: findDishes_3}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                done();
                            });
                        });


                         it('32-With -Dishes: Find Dishes api', function (done) {

                                helperUtil.addStep("Request Payload :: "+findDishes_4);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: findDishes_4}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                    done();
                                });
                            });


                             it('33-One-Cusines: Find Dishes api', function (done) {

                                    helperUtil.addStep("Request Payload :: "+findDishes_5);

                                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                        body: JSON.stringify({query: findDishes_5}),
                                    }).then(function (res) {

                                        return res.json();

                                    }).then(function (response) {
                                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                        done();
                                    });
                                });

            it('34-Price-Min_80: Find Dishes api', function (done) {

                                        helperUtil.addStep("Request Payload :: "+findDishes_6);

                                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                            body: JSON.stringify({query: findDishes_6}),
                                        }).then(function (res) {

                                            return res.json();

                                        }).then(function (response) {
                                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                            done();
                                        });
                                    });



                it('35-Price-Min_100: Find Dishes api', function (done) {

                                        helperUtil.addStep("Request Payload :: "+findDishes_7);

                                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                            body: JSON.stringify({query: findDishes_7}),
                                        }).then(function (res) {

                                            return res.json();

                                        }).then(function (response) {
                                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                            done();
                                        });
                                    });




              it('37-Valid-Post_by-ID :Get Post By ID api', function (done) {

                        console.log("Booking ID :: "+postID);

                        newPostID = global.postID;;


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

             it('38-Common_TCs_01: Get Post By ID api', function (done) {

                                    console.log("Booking ID :: "+postID);

                                    newPostID = global.postID;;


                                    getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

                                    helperUtil.addStep("Request Payload :: "+getPostById);

                                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                        body: JSON.stringify({query: getPostById}),
                                    }).then(function (res) {

                                        return res.json();

                                    }).then(function (response) {
                                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                        done();
                                    });
                                });



             it('39-Common_TCs_02: Get Post By ID api', function (done) {


                        console.log("Booking ID :: "+postID);

                        newPostID = global.postID;;


                        getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

                        helperUtil.addStep("Request Payload :: "+getPostById);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                            body: JSON.stringify({query: getPostById}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                            done();
                        });
                    });



            it('40-Review_Tags_For_Chef:Review Tag for Chef api', function (done) {

                   helperUtil.addStep("Request Payload :: "+reviewTagsForChef);

                   fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                       method: 'POST',
                       headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                       body: JSON.stringify({query: reviewTagsForChef}),
                   }).then(function (res) {

                       return res.json();

                   }).then(function (response) {
                       helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                       done();
                   });
               });


             it('41-Review_Tags_For_Chef:Review Tag for Chef api', function (done) {

                                helperUtil.addStep("Request Payload :: "+reviewTagsForChef);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                                    body: JSON.stringify({query: reviewTagsForChef}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                    done();
                                });
                            });



           it('42-With Valid Case : Get Available Dishes api', function (done) {

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




            it('43-With Invalid Country Code Case : Get Available Dishes api', function (done) {

                                      helperUtil.addStep("Request Payload :: "+getAvailableDishes_1);

                                      fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                          method: 'POST',
                                          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                          body: JSON.stringify({query: getAvailableDishes_1}),
                                      }).then(function (res) {

                                          return res.json();

                                      }).then(function (response) {
                                          helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                          done();
                                      });
           });



            it('44-With-Common_TCs_01 : Get Available Dishes api', function (done) {

                                                 helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                                                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                     method: 'POST',
                                                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                                     body: JSON.stringify({query: getAvailableDishes}),
                                                 }).then(function (res) {

                                                     return res.json();

                                                 }).then(function (response) {
                                                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                                     done();
                                                 });
            });


             it('45-With_Common_TCs_02 : Get Available Dishes api', function (done) {

                                                  helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                                                  fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                      method: 'POST',
                                                      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                      body: JSON.stringify({query: getAvailableDishes}),
                                                  }).then(function (res) {

                                                      return res.json();

                                                  }).then(function (response) {
                                                      helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                                      done();
                                                  });
               });



            it('46-With_Invalid_Chef_ID :Get Chef api', function (done) {

                      helperUtil.addStep("Request Payload :: "+getChef_1);

                      fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                          method: 'POST',
                          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                          body: JSON.stringify({query: getChef_1}),
                      }).then(function (res) {

                          return res.json();

                      }).then(function (response) {
                          helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                          done();
                      });
                  });


            it('47-With Payment Method :Get Chef api', function (done) {

                                  helperUtil.addStep("Request Payload :: "+getChef_2);

                                  fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                      method: 'POST',
                                      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                      body: JSON.stringify({query: getChef_2}),
                                  }).then(function (res) {

                                      return res.json();

                                  }).then(function (response) {
                                      helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                      done();
                                  });
             });


             it('48-With Dishes List :Get Chef api', function (done) {

                                               helperUtil.addStep("Request Payload :: "+getChef_3);

                                               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                   method: 'POST',
                                                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                   body: JSON.stringify({query: getChef_3}),
                                               }).then(function (res) {

                                                   return res.json();

                                               }).then(function (response) {
                                                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                   done();
                                               });
             });




               it('49-With_Valid_Values :Get Chef api', function (done) {

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


                      it('50-With_Valid_Data :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                               done();
                           });
                       });


                          it('51-With_Booking_ID :Reviews Filtered api', function (done) {

                               helperUtil.addStep("Request Payload :: "+reviews_1);

                                helperUtil.addStep("Final ID ::" + global.bookingIDFinal);

                               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                   body: JSON.stringify({query: reviews_1}),
                               }).then(function (res) {

                                   return res.json();

                               }).then(function (response) {
                                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                   done();
                               });
                           });


        it('52-With-Common_TCs_01 :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                               done();
                           });
                       });

        it('53-With-Common_TCs_02 :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                               done();
                           });
                       });


        it('54-Valid Dish Exists :  Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;
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

        it('55-Invalid Dish Non Exists : Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "123"+ "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

        it('56-With-Common_TCs_01 : Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);


                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' +"123"},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

        it('57-With-Common_TCs_02: Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });


        it('58-With Valid Country Code : Cuisine api', function (done) {

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


         it('59-Incomplete-Booking : User Booking api', function (done) {

                    helperUtil.addStep("Request Payload :: "+userBookings_1);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: userBookings_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));

                        done();
                    });
                });

         it('60-With Pagination Based : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_2);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_2}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

         it('61-With Specific Booking_STATE : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_3);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_3}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

         it('62-With Authenticated User : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_4);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_4}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });



         it('63-With Incomplete-Booking : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_1);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_1}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));

                         done();
                     });
                 });

         it('64-With Pagination Based : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_2);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_2}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

         it('65-Without Start Date & Num-Weeks : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_3);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_3}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

         it('66-With Authenticated User : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_4);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_4}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });


});