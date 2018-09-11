
var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL BOOKINGS API queries', function () {

    var chefBookings,createBooking,createInProgressBooking,markBookingAsCompleted,reserveChefSlot,updateBooking,updateInProgressBooking,userBookings ;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            chefBookings =  "query { chefBookings(chefId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";
            createBooking = "mutation { createBooking(bookingId: \"7a883b97-c078-497c-839d-50bfa8ba3a1f\" ) }";
            createInProgressBooking = "mutation { createInProgressBooking(booking: { userId: \"" + global.userID + "\", chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", date: \"2018-08-13\", timeSlot: { start: \"11:00\", end: \"13:00\"}, dishes: [{ dishId: \"e9021266-cfca-4e44-b3f6-70edc46ed5d4\", serves: 4 }] ,  equipmentsPresent: [\"Microwave Oven\", \"Grill\", \"Gas\"], cardId: \"card_1D3lThJt7gce93gZX548jWz6\",   }) }";
            markBookingAsCompleted = "mutation { markBookingAsCompleted(id: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", bookingId: \"a52fe6c8-1ad9-42b2-b9bb-549cc608fa38\") }";
            reserveChefSlot = "mutation { reserveChefSlot(chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", userId: \"" + global.userID + "\", day: \"2018-08-13\", slot: {start: \"11:30\", end: \"14:00\"}) }";
            updateBooking = "mutation { updateBooking(bookingId: \"75c18880-7fc9-42ce-a498-f9695134cd5e\", status: COMPLETED ) }";
            updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \"722df5f0-4c86-46dc-bcb1-303c65586439\", booking: { userId: \"" + global.userID + "\", chefId: \"4c686360-f6ef-4dbc-9e9c-7b70a0f82ebe\", cardId: \"card_1D3lThJt7gce93gZX548jWz6\",   }) }";
            userBookings = "query { userBookings(userId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore} }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_BOOKINGS-001 : Chef Booking api', function (done) {

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

    it('ZESTY_BOOKINGS-002 : Create Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+createBooking);
        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-003 : Create In Progress Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+createInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-004 : Mark Booking As Complete api', function (done) {

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

    it('ZESTY_BOOKINGS-005 : Reserve Chef Slot api', function (done) {

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

    it('ZESTY_BOOKINGS-006 : Update Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-007 : Update In Progress Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_BOOKINGS-008 : User Booking api', function (done) {

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



});