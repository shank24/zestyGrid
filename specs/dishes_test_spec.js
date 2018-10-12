
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL DISHES API queries', function () {

    var calculatePrice,createDish,cuisines,deleteDish,dish,dishesByChef,dishesList,featuredDishes,findDishes,getAvailableDishes,updateDish,userLikeDish ;

    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            createDish = "mutation { createDish( dish: { chefId : \"" + global.userID + "\", , name : \"Chicken Tikka\", description : \"Laborum ad occaecat\",  cuisines :[\"Chinese\",\"Italian\"],   approxIngredientsCost : 71.9982, approxPrepTime : 24, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 100, minPrice : 90.9526, media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";
            calculatePrice = "mutation { calculatePrice(dishId: \""+ newDishID + "\", dinerCount: 1000000) }";


            cuisines = "query { cuisines(country: \"US\") }";
            dishesList = "query {dishesList(country: \"US\")}";
            getAvailableDishes = "query { getAvailableDishes(country: \"USA\") }";



            dish = "query { dish(id: \""+ newDishID + "\", live: false) { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

            dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";


            featuredDishes = "query { featuredDishes(dishCount: 10) {id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} }";
            //findDishes = "query {findDishes(filters: {cuisines: [\"Chinese\",\"Italian\"], priceMin: 90, priceMax: 95, Longitude:77.3910 , latitude:28.5355 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore }}";

            findDishes = "query {findDishes(filters: { Longitude:77.3910 , latitude:28.5355 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore }}";


            updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";

            userLikeDish ="mutation { userLikeDish(userId: \"" + global.userID + "\", dishId: \""+ newDishID + "\") }";

            deleteDish = "mutation { deleteDish(id: \""+ newDishID + "\") }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_DISHES-001 : Create Dish api', function (done) {

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

    it('ZESTY_DISHES-002 : Calculate Price api', function (done) {


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

    it('ZESTY_DISHES-003 : Cuisine api', function (done) {

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

    it('ZESTY_DISHES-004 : Dishes List api', function (done) {

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

    it('ZESTY_DISHES-005 : Get Available Dishes api', function (done) {

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

    it('ZESTY_DISHES-006 : Dish api', function (done) {

        helperUtil.addStep("New Dish ID is :: "+newDishID);


        dish = "query { dish(id: \""+ newDishID + "\", live: false) { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

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

    it('ZESTY_DISHES-007 : Dishes By Chef api', function (done) {

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

    it('ZESTY_DISHES-008 : Featured Dishes api', function (done) {

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

    it('ZESTY_DISHES-009 : Find Dishes api', function (done) {

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

    it('ZESTY_DISHES-010 : Update Dish api', function (done) {

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

    it('ZESTY_DISHES-011 : User Liked Dish api', function (done) {

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

     it('ZESTY_DISHES-012 : Re-Test After Updation Dish api', function (done) {

            helperUtil.addStep("New Dish ID is :: "+newDishID);


            dish = "query { dish(id: \""+ newDishID + "\", live: false) { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

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

    xit('ZESTY_DISHES-013 : Delete Dish api', function (done) {

            helperUtil.addStep("New Dish ID is :: "+newDishID);


            deleteDish = "mutation { deleteDish(id: \""+ newDishID + "\") }";


            helperUtil.addStep("Request Payload :: "+deleteDish);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: deleteDish}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });


});