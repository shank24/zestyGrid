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

            findChefs_5 = "query{findChefs(filters: {  dishes:[\"Chicken Tikka\"] }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_6 = "query{findChefs(filters: {  priceMin:25 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_7 = "query{findChefs(filters: {  priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_8 = "query{findChefs(filters: {  priceMin:25, priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";


          //dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_1 = "query {dishesByChef( chefId: \"" + global.userID +123+ "\", pageSize: 10, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_2 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:false, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_3 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:true, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";


             posts = "query {posts(filters: { title: \"Fun\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_1 = "query {posts(filters: { title: \"Furnace\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_2 = "query {posts(filters: { title: \"Fungee\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_3 = "query {posts(filters: { tags: [ \"Algae\"] , chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6,next:null, previous:null) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_4 = "query {posts(filters: { tags: [ \"Algae\"], title: \"Fungee\" ,chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6,next:null, previous:null) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             user = "query { user(id: \"" + global.userID + "\") { id, emailId, firstName, lastName, cellPhone } }";

             user_1 = "query { user(id: \"" + global.userID + "\") { id, emailId, firstName, lastName, cellPhone } }";


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

//Dishes


     it('11-With Non Existent Chef: Q11_Dishes_By_Chef', function (done) {

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

     it('12-With Live Set to False: Q11_Dishes_By_Chef', function (done) {

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


     it('13-With Live Set to True: Q11_Dishes_By_Chef', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef_3);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef_3}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });


    it('14-With Valid Chef: Q11_Dishes_By_Chef', function (done) {

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

it('15-With Invalid Data In Title :Q15_Posts', function (done) {

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

it('16-With Valid Data & Pagination Case :Q15_Posts', function (done) {

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

it('17-With Specifc Title  :Q15_Posts', function (done) {

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



it('18-With Specifc Tags  :Q15_Posts', function (done) {

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



it('19-With Specifc Title  & Tags :Q15_Posts', function (done) {

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



it('20-With Non Existent User :Q1_User', function (done) {

        helperUtil.addStep("Request Payload :: "+user_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: user_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });



it('21-With Existent User Specifc Fields :Q1_User', function (done) {

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
});