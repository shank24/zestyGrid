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

    var newReviewID ="ef03145a-de48-484c-8f1c-db3409aecef4";


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            submitReview = "mutation { submitReview(review: { reviewer: \"" + global.userID + "\", reviewee: \"" + global.userID + "\", reviewerName: \"Charneet Keet\", reviewType: DISH, rating: 4.5, tags: \"Value\", body: \"Value\" }) }";

            review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

            isReviewable = "query { isReviewable(reviewerId: \"" + global.userID + "\", revieweeId: \"" + global.userID + "\", reviewType: DISH) }";

            reviewTagsForChef = "query { reviewTagsForChef(userId: \"" + global.userID + "\") } ";
            reviewTagsForUser = "query { reviewTagsForUser(userId: \"" + global.userID + "\") } ";

            reviews = "query { reviews(filters: {reviewee: \"" + global.userID + "\", reviewType: DISH}, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";

            updateReview = "mutation {updateReview(reviewId: \"" + newReviewID + "\", ratings: 23)}";

            addSavedItemsChefs = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { chefs:[\"" + global.userID + "\"] })}";
            addSavedItemsDishes = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { dishes:[\"" + global.dishID + "\"] })}";
            addSavedItemsPosts = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { posts:[\"" + global.postID + "\"] })}";

            savedChefs = "query { savedChefs(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore } }";
            savedDishes = "query { savedDishes(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { dishes{ id name description cuisine isDraft minPrice minDinerSize equipmentNeeded numOfLikes media { type url } } endCursor hasMore } }";
            savedPosts = "query { savedPosts(userId: \"" + global.userID + "\", cursor: null, pageSize: 6) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore} }";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_REVIEW-001 :Submit Review api', function (done) {

            helperUtil.addStep("Request Payload :: "+submitReview);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: submitReview}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {

                global.reviewID = response.data.submitReview;

                console.log("Review ID is :: >>>>>>>>>>> New Review ID >>>>>>>>>>"+reviewID);



                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                done();
            });
        });

    it('ZESTY_REVIEW-002 :Get Review api', function (done) {

        newReviewID= global.reviewID;

        helperUtil.addStep("New Review ID is :: "+newReviewID);

        review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

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

    it('ZESTY_REVIEW-003 :Is Reviewable api', function (done) {


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

    it('ZESTY_REVIEW-004 :Review Tag for Chef api', function (done) {

        helperUtil.addStep("Request Payload :: "+reviewTagsForChef);

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

    it('ZESTY_REVIEW-005 :Review Tag for User api', function (done) {

        helperUtil.addStep("Request Payload :: "+reviewTagsForUser);

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

    it('ZESTY_REVIEW-006 :Reviews Filtered api', function (done) {

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

    it('ZESTY_REVIEW-007 :Update Review api', function (done) {

        newReviewID= global.reviewID;

        helperUtil.addStep("New Dish ID is :: "+newReviewID);

        updateReview = "mutation {updateReview(reviewId: \"" + newReviewID + "\", ratings: 23)}";

        helperUtil.addStep("Request Payload :: "+updateReview);

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

    it('ZESTY_REVIEW-008 :Get Review api', function (done) {

            newReviewID= global.reviewID;

            helperUtil.addStep("New Dish ID is :: "+newReviewID);

            review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

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


        it('ZESTY_USER-009 :Add Saved Items For Chef api', function (done) {

                helperUtil.addStep("Request Payload :: "+addSavedItemsChefs);
                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: addSavedItemsChefs}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                    done();
                });
            });

        it('ZESTY_USER-010 :Add Saved Items For Dishes api', function (done) {

                helperUtil.addStep("Request Payload :: "+addSavedItemsDishes);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: addSavedItemsDishes}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                    done();
                });
            });

        it('ZESTY_USER-011 :Add Saved Items For Posts api', function (done) {

                helperUtil.addStep("Request Payload :: "+addSavedItemsPosts);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: addSavedItemsPosts}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                    done();
                });
            });




            it('ZESTY_USER-012 :Saved Chefs api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedChefs);


                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: savedChefs}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.data.savedChefs.chefs[0]));

                                    done();
                                });
                            });

            it('ZESTY_USER-013 :Saved Dishes api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedDishes);


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

            it('ZESTY_USER-014 :Saved Post api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedPosts);

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


});