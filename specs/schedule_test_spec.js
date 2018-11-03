var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL SCHEDULE API queries', function () {

    var chefDaySchedule,chefWeeklySchedule,createDaySchedule,createWeeklySchedule,updateDaySchedule,updateWeeklySchedule,deleteSlotForDay,deleteSlotForDate;


    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            createDaySchedule = "mutation { createDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-10-05\", dateSchedule: { date: \"2018-10-05\", available: true, slots: [{ start: \"10:00\", end: \"11:00\" }] }) }";
            createWeeklySchedule = "mutation { createSchedule(chefId: \"" + global.userID + "\", weekschedule: { daySchedules: [{day: FRIDAY, slots: [{ start: \"10:00\", end: \"11:00\" }, { start: \"12:00\", end: \"13:00\" }, { start: \"13:00\", end: \"15:00\" }]}, {day: TUESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]}, {day: WEDNESDAY, slots: [{ start: \"10:00\", end: \"13:00\" }, { start: \"15:00\", end: \"17:00\" }, { start: \"18:00\", end: \"20:00\" }]} ] }) }";

            chefDaySchedule = "query {chefDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-10-05\") { date available slots{start end} }}";
            chefWeeklySchedule = "query {chefSchedule(chefId: \"" + global.userID + "\") { daySchedules{ day slots{start end} } }}";


            //Single Slot
            updateDaySchedule = "mutation { updateSchedule(chefId: \"" + global.userID + "\", days: [TUESDAY], slot: { start: \"10:00\", end: \"19:30\" }){ daySchedules{ day slots{start end} } }  }";

            //For More Than One Day
            updateDaySchedule_1 = "mutation { updateSchedule(chefId: \"" + global.userID + "\", days: [TUESDAY,MONDAY], slot: { start: \"10:00\", end: \"19:30\" }){ daySchedules{ day slots{start end} } }  }";

            //Partially Overlap
            updateDaySchedule_2 = "mutation { updateSchedule(chefId: \"" + global.userID + "\", days: [TUESDAY], slot: { start: \"11:00\", end: \"19:30\" }){ daySchedules{ day slots{start end} } }  }";

            //Fully Overlaps
            updateDaySchedule_3 = "mutation { updateSchedule(chefId: \"" + global.userID + "\", days: [TUESDAY], slot: { start: \"10:00\", end: \"19:30\" }){ daySchedules{ day slots{start end} } }  }";

            //Adjacent Slot
            updateDaySchedule_4 = "mutation { updateSchedule(chefId: \"" + global.userID + "\", days: [TUESDAY], slot: { start: \"19:30\", end: \"20:30\" }){ daySchedules{ day slots{start end} } }  }";


            updateWeeklySchedule = "mutation { updateDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-10-05\",   slot: { start: \"10:00\", end: \"14:30\" }) { date available slots{start end} } }";

            deleteSlotForDay= "mutation { deleteSlotForDay(chefId: \"" + global.userID + "\", day: FRIDAY, slot: { start: \"10:00\", end: \"11:00\" }) }";

            deleteSlotForDate= "mutation { deleteSlotForDate(chefId: \"" + global.userID + "\", date: \"2018-10-05\", slot: { start: \"10:00\", end: \"14:30:00\" }) }";


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


    it('ZESTY_SCHEDULE-005 Single Slot :Update Day Schedule api', function (done) {

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

    it('ZESTY_SCHEDULE-006  For More Than One Day:Update Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+updateDaySchedule_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateDaySchedule_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });


    it('ZESTY_SCHEDULE-007 Partially Overlap:Update Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+updateDaySchedule_2);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateDaySchedule_2}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });




    it('ZESTY_SCHEDULE-008 Fully Overlap :Update Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+updateDaySchedule_3);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateDaySchedule_3}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });




    it('ZESTY_SCHEDULE-009 Adjacent Slot:Update Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+updateDaySchedule_4);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: updateDaySchedule_4}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });




    it('ZESTY_SCHEDULE-010 :Update Weekly Schedule api', function (done) {

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

    it('ZESTY_SCHEDULE-011 :Chef Day Schedule api', function (done) {

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

    it('ZESTY_SCHEDULE-012 :Chef Weekly Schedule api', function (done) {

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

        it('ZESTY_SCHEDULE-013 Calling before Delete :Chef Day Schedule api', function (done) {

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


        it('ZESTY_SCHEDULE-014 :Delete Slot Day api', function (done) {

                helperUtil.addStep("Request Payload :: "+deleteSlotForDay);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteSlotForDay}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });



        it('ZESTY_SCHEDULE-015 Calling after Delete :Chef Day Schedule api', function (done) {

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


        it('ZESTY_SCHEDULE-016 Calling before Delete :Chef Day Schedule api', function (done) {

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



       it('ZESTY_SCHEDULE-017 :Delete Slot Date api', function (done) {

                helperUtil.addStep("Request Payload :: "+deleteSlotForDate);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteSlotForDate}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });



        it('ZESTY_SCHEDULE-018 Calling after Delete :Chef Day Schedule api', function (done) {

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



});