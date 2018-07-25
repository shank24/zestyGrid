
var request = require('graphql-request');

var util = require('util'),


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');

  //JSONData = require('./../testData/testData_' + process.env.NODE_ENV + '_' + process.env.NODE_USERTYPE + '.json');





describe('Test GraphQL API queries', function () {

    beforeEach(function () {
        helperUtil.envInfo();
    });

    afterEach(function () {

    });


    xit('SPISA-001 : Cooking Tips API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.cookingTips).then(function(data ){

            if (!error) {
                helperUtil.addStep("Total number of cooking tips are :: "+data.cookingTipsWithTotal.total);
            } else {
                helperUtil.addStepsWithScreenshot("Error Message is :: "+errors[0].message + " and Error Code is :: "+errors[0].statusCode);
            }

            done();
        });
    });

    it('SPISA-002 : Product List Count API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getProductsList).then(function(data ){

            console.log(">>>>>>>>>>>>>>>>"+data.status);
            helperUtil.addStep("Total number of product lists are :: "+data.getProductsList.count);

            done();
        });
    });

    it('SPISA-003 : Login API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.login).then(function(data ){

            helperUtil.addStep("User Name is :: "+data.userLogin.userName);

            done();
        });
    });

    it('SPISA-004 : Search Drink API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.search_drinks).then(function(data ){

            helperUtil.addStep("Drink ID is :: "+data.search.drinks[0].id+" and Title is "+data.search.drinks[0].title);

            done();
        });
    });

    it('SPISA-005 : Search Recipe API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.search_recipes).then(function(data ){

            helperUtil.addStep("Recipe ID is :: "+data.search.recipes[0].id + " and Title is "+ data.search.recipes[0].title);

            done();
        });
    });

    it('SPISA-006 : Get HomePage Data_cookingTip API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getHomePageData_cookingTip).then(function(data ){

            helperUtil.addStep("Total Sections is :: "+data.getHomePageData.length);

            for(i=0; i<data.getHomePageData.length;i++){
                var cookingTipTitle = data.getHomePageData[i].cookingTip ? data.getHomePageData[i].cookingTip.title : '';
                helperUtil.addStep("Sections name :: ",cookingTipTitle);

                 console.log(">>>>>>",data.getHomePageData[i]);
                //console.log(">>>>>>",data.getHomePageData[i].cookingTip.desc);
            }

            done();
        });
    });

    xit('SPISA-007 : Reset Password API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.resetPassword).then(function(data ){

            helperUtil.Reporter(data.resetPassword.message, "Success","Pass","Fail");

            done();
        });
    });

    xit('SPISA-007 : Get User Activity API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.getUserActivity).then(function(data ){

            /*if( !data.getUserActivity) {*/
            /*    helperUtil.addStep("Error is :: "+errors[0].message);*/
            /*}else {*/
            /*    helperUtil.addStep("User Name is :: "+data.getUserActivity);*/
            /*}*/

            console.log(">>>>>>>"+data);
            done();
        });
    });

    it('SPISA-005 : Search Recipe API', function (done) {

        request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, JSONData.Query.search_recipes).then(function(data ){

            helperUtil.addStep("Recipe ID is :: "+data.search.recipes[0].id + " and Title is "+ data.search.recipes[0].title);

            done();
        });
    });






});