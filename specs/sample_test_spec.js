var testerGraphQL = require ('./test_graphql_spec.js');

var i = require('./../test_graphQL');


var request = require('request-promise');
var graphql = require('graphql').graphql;
var unirest = require('unirest');
var fetch = require('isomorphic-fetch');

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

    xit('123456',function (done) {
        console.log("KEshav");
    });

    xit('123456',function (done) {

        i.getStatus({
            url : 'http://dev-spisa.herokuapp.com/graphql',
            method : 'POST',
            body : JSON.stringify({"query": "query {cookingTipsWithTotal { total: total}}"}),
            headers: {
                'Accept':'application/json','Content-Type':'application/json'
            }


        }, function (err, result) {
            helperUtil.addStep('' + result.status);
            result = result.json();
            result.then(function (abc) {
                console.log(abc);
                helperUtil.addStep('' + abc.data.cookingTipsWithTotal.total);

                done();
            });
        });
    });


    xit('Sample Module Test',function () {

        var URL = 'http://dev-spisa.herokuapp.com/graphql';
        var query = JSON.stringify({"query": "query {cookingTipsWithTotal { total: total}}"});

        var tester = testerGraphQL(URL,null, null, null, query);


        tester.then(function (body) {
            console.log(body,">>>>>>>>>>>"+body.json());
        }).catch(function (err) {
            console.log(err);
        });


    });

    xit('Should resolve 12345', function () {

        var options = {
            method : 'POST',
            body: JSON.stringify({"query": "query {cookingTipsWithTotal { total: total}}"}),
            headers : {
                'Accept':'application/json','Content-Type':'application/json'
            }
        };

        fetch('http://dev-spisa.herokuapp.com/graphql',options)
            .then(function (responses) {
                console.log(responses);

                console.log("Status:::::::::::::::::"+responses.status);
                var res = responses.json();

                return res;
            }).then(function (data) {
            console.log(data, '---------') ;

        }).catch(function (err) {
                // Request failed...
                console.log("Errrrrrrrrrrrrrrrrrr", err);

            });
        browser.driver.sleep(5000);


    });







});