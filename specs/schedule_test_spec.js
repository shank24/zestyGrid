var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL SCHEDULE API queries', function () {

    var chefDaySchedule,chefWeeklySchedule,createDaySchedule,createWeeklySchedule,updateDaySchedule,updateWeeklySchedule;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            createDaySchedule = "mutation { createDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-08-10\", dateSchedule: { date: \"2018-08-13\", available: true, slots: [{ start: \"10:00\", end: \"15:00\" }] }) }";
            createWeeklySchedule = "mutation { createSchedule(chefId: \"" + global.userID + "\", weekschedule: { daySchedules: [{day: MONDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: TUESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: WEDNESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]} ] }) }";

            chefDaySchedule = "query {chefDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-08-10\") { date available slots{start end} }}";
            chefWeeklySchedule = "query {chefSchedule(chefId: \"" + global.userID + "\") { daySchedules{ day slots{start end} } }}";

            updateDaySchedule = "mutation { updateDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-08-10\", dateSchedule: { date: \"2018-08-10\", available: true, slots: [{ start: \"10:00\", end: \"14:30\" }] }) }";
            updateWeeklySchedule = "mutation { updateSchedule(chefId: \"" + global.userID + "\", weekschedule: { daySchedules: [{day: MONDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"19:00\" }, { start: \"18:00\", end: \"21:00\" }]}, {day: TUESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: THURSDAY, slots: [{ start: \"11:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"17:00\", end: \"19:00\" }]} ] }) }";

            done();

        } else {
            done();
        }
    });

    it('ZESTY_SCHEDULE-001 :Create Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+createDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-002 :Create Weekly Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+createWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


    it('ZESTY_SCHEDULE-003 :Chef Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-004 :Chef Weekly Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+chefWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


    it('ZESTY_SCHEDULE-005 :Update Day Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateDaySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateDaySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-006 :Update Weekly Schedule api', function (done) {

        helperUtil.addStep("Request Payload :: "+updateWeeklySchedule);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateWeeklySchedule}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_SCHEDULE-007 :Chef Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+chefDaySchedule);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: chefDaySchedule}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('ZESTY_SCHEDULE-008 :Chef Weekly Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+chefWeeklySchedule);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: chefWeeklySchedule}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

});