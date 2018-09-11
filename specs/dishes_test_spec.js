
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


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            calculatePrice = "mutation { calculatePrice(dishId: \"ef03145a-de48-484c-8f1c-db3409aecef4\", dinerCount: 1000000) }";
            createDish = "mutation { createDish( dish: { chefId : \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", name : \"Chicken Tikka\", description : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\", cuisines : [ \"Pakistani\" ],   approxIngredientsCost : 71.9982, approxPrepTime : 24, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19, minPrice : 92.9526, media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" } ] }) }";
            cuisines = "query { cuisines(country: \"US\") }";
            deleteDish = "mutation { deleteDish(id: \"182fbc05-4268-4a81-bdd2-6553d55d8fcc\") }";
            dish = "query { dish(id: \"33f2306e-f599-4017-99a5-8123a542252b\", live: true) { id chefId name description media {url type} cuisine dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";
            dishesByChef = "query {dishesByChef( chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", pageSize: 10 ) { dishes{id chefId name description media {url type} cuisine dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore }}";
            dishesList = "query {dishesList(country: \"US\")}";
            featuredDishes = "query { featuredDishes(dishCount: 10) {id chefId name description media {url type} cuisine dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} }";
            findDishes = "query {findDishes(filters: {cuisines: [\"Chinese\",\"Italian\"], priceMin: 40, priceMax: 300, engagementSize: 6}, cursor: null, pageSize:10, includeChefs:true,chefCount: 3) { dishes{id chefId name description media {url type} cuisine dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore }}";
            getAvailableDishes = "query { getAvailableDishes(country: \"USA\") }";
            updateDish = "mutation { updateDish( dish: { id: \"33f2306e-f599-4017-99a5-8123a542252b\", chefId : \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", name : \"Fungee\", description : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\", cuisines : [ \"Pakistani\" ],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ ORGANIC ], ingredients : [ \"Red Chillies\", \"Pork\", ], equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" } ] }) }";
            userLikeDish ="mutation { userLikeDish(userId: \"" + global.userID + "\", dishId: \"c8389683-5832-47fd-8cc5-c3b4f58a212d\") }";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_DISHES-001 : Calculate Price api', function (done) {

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

    it('ZESTY_DISHES-002 : Create Dish api', function (done) {

        helperUtil.addStep("Request Payload :: "+createDish);
        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createDish}),
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

    it('ZESTY_DISHES-004 : Delete Dish api', function (done) {

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

    it('ZESTY_DISHES-005 : Dish api', function (done) {

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

    it('ZESTY_DISHES-006 : Dishes By Chef api', function (done) {

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

    it('ZESTY_DISHES-007 : Dishes List api', function (done) {

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

    it('ZESTY_DISHES-010 : Get Available Dishes api', function (done) {

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

    it('ZESTY_DISHES-011 : Update Dish api', function (done) {

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

    it('ZESTY_DISHES-012 : User Liked Dish api', function (done) {

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


});