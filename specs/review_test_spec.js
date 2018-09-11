
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL REVIEW API queries', function () {

    var review,isReviewable,reviewTagsForChef,reviewTagsForUser,reviews,submitReview,updateReview;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            review = "query {review(id: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\") {id reviewer reviewerName reviewee rating tags body reviewType } }";
            isReviewable = "query { isReviewable(reviewerId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", revieweeId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", reviewType: CHEF) }";
            reviewTagsForChef = "query { reviewTagsForChef(userId: \"" + global.userID + "\") } ";
            reviewTagsForUser = "query { reviewTagsForUser(userId: \"" + global.userID + "\") } ";
            reviews = "query { reviews(filters: {reviewee: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", reviewType: CHEF}, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";
            submitReview = "mutation { submitReview(reviewer: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", reviewee: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", reviewerName: \"Charneet Keet\", reviewType: CHEF, rating: 4.5) }";
            updateReview = "mutation {updateReview(reviewId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", ratings: 3)}";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_REVIEW-001 :Review api', function (done) {

        helperUtil.addStep("Request Payload :: "+review);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: review}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_REVIEW-002 :Is Reviewable api', function (done) {

        helperUtil.addStep("Request Payload :: "+isReviewable);
        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: isReviewable}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_REVIEW-003 :Review Tag for Chef api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: reviewTagsForChef}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_REVIEW-004 :Review Tag for User api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: reviewTagsForUser}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_REVIEW-005 :Reviews api', function (done) {

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

    it('ZESTY_REVIEW-006 :Submit Review api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: submitReview}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_REVIEW-007 :Update Review api', function (done) {

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateReview}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


});