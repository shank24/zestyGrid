var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var helperUtil = {},

  Promise = require('bluebird'),

  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');

  var html5Lint = require( 'html5-lint' );
  var rp = require('request-promise');


  helperUtil.generateAuthToken = function (done) {

    var email = helperUtil.dummyEmailAddress();

    function generateUserQuery ( type, userId) {
      if( type === 'query') {
        return "query { user(id: \"" + userId+ "\") { id, emailId, firstName, lastName,cellPhone,isChef,campaign,accessToken,profilePic,dateOfBirth,altPhone,address{street1} } }"
      }
      else if( type === 'createNewUser') {
        return "mutation { createUser(user: { emailId: \""+ email.toString() +"\", pwd: \"P@ssw0rd\", firstName: \"Alex\", lastName: \"Price\", profilePic:\"https://homepages.cae.wisc.edu/~ece533/images/airplane.png\", cellPhone: \"9814644011\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Los Angeles\", state: \"California\", zip: \"90004\", country: \"USA\"}, zipcode: \"90004\" ,dateOfBirth: \"1991-01-06\" }) }"
      } else if(type ==='getUserID'){
        return "mutation { login(id: \""+ email.toString() +"\", pwd: \"P@ssw0rd\" ) }"
      }
    }


    request.request(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, generateUserQuery('createNewUser')).then(function(data){

      helperUtil.addStep("User ID :: "+data.createUser);
      var userID = data.createUser;
      var authToken;
      var newUserIDQuery = generateUserQuery('query',userID);

      // Get Auth Token using Login API
      fetch(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: generateUserQuery('getUserID')}),
      }).then(function(res) {

        authToken = res.headers.get('authorization');
        global.authToken = authToken;
        global.userID = userID;
        helperUtil.addStep("Auth Token is :: "+authToken);

        return res.json();
      })
          .then(function(res){

            // Get User API
            const client = new GraphQLClient(JSONData.AutoTextList[0].BASE_URL+JSONData.AutoTextList[0].REDIRECT_URL, {
              headers: {
                Authorization: 'Bearer ' + authToken,
              },
            });

            helperUtil.addStep("Auto Generated Query is :: "+newUserIDQuery);
            client.request(newUserIDQuery).then(function(data){

              global.emailID = data.user.emailId;

              helperUtil.addStep("ID :: "+data.user.id);
              helperUtil.addStep("Email ID :: "+data.user.emailId);
              helperUtil.addStep("First Name :: "+data.user.firstName);
              helperUtil.addStep("Last Name :: "+data.user.lastName);
              done(null, {
                userID: userID,
                authToken: authToken
              });
            });
          });
    })
        .catch(function(err) {
          console.log("Error Message :: "+err.message);
          done(err);
        });
  };


  helperUtil.text2codeRatio = function(url, callback){
    if (!isUrl(url)) {
      throw new Error('Invalid url');
    }
    if (!callback) {
      throw new Error('Callback must be set to recieve the text-to-code ratio for the url.');
    }
    function qresponse(error,response,body){
      var ratio;
      if (!error && response.statusCode === 200) {
        $ = cheerio.load(body);

        var textLength = $("body").text().length;
        helperUtil.addStep("Text Length :: "+textLength);

        var htmlLength = $("body").html().length;
        helperUtil.addStep("HTML Length :: "+htmlLength);

        ratio = Math.round(($("body").text().length/$("body").html().length)*100);
      }
      callback(ratio,error);
    }
    request(url, qresponse);
  };



  helperUtil.envInfo = function () {
    helperUtil.addEnvironment("User Type :: ",process.env.NODE_USERTYPE);
    helperUtil.addEnvironment("Environment :: ",process.env.NODE_ENV);
    helperUtil.addEnvironment("URL :: ",JSONData.AutoTextList[0].BASE_URL);
  };

  helperUtil.addEnvironment = function (Name,Value) {
    allure.addEnvironment(Name, Value);
  };

  helperUtil.addStep = function (StepInfo) {
    allure.createStep(StepInfo, function(){
    })();
  };

  helperUtil.addStepsWithScreenshot = function (StepInfo) {
    allure.createStep(StepInfo, function () {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment(StepInfo, function () {return new Buffer(png, 'base64');}, 'image/png')();
      });
    })();
  };

  helperUtil.Reporter = function (actualResult,expectedResult,passMessage,failMessage) {
    expect(actualResult).toBe(expectedResult);
    if(actualResult === expectedResult){
      helperUtil.addStep(passMessage);
    }else{
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };

  helperUtil.ReporterElement = function (Expect,expectedResult,failMessage) {
    expect(Expect).toBe(expectedResult);
    if(Expect !== expectedResult){
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };

  helperUtil.Reporter_toEqual = function (Expect,expectedResult,passMessage,failMessage) {
    expect(Expect).toEqual(expectedResult);
    if(Expect === expectedResult){
      helperUtil.addStep(passMessage);
    }else{
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };

  helperUtil.Reporter_toBeTruthy = function (Expect,expectedResult,passMessage,failMessage) {
    expect(Expect).toBeTruthy();
    if(Expect === true){
      helperUtil.addStep(passMessage);
    }else{
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };

  helperUtil.Reporter_notToBe = function (Expect,expectedResult,passMessage,failMessage) {
    expect(Expect).not.toBe(expectedResult);
    if(Expect !== expectedResult){
      helperUtil.addStep(passMessage);
    }else{
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };

  helperUtil.Reporter_toContain = function (Expect,expectedResult,passMessage,failMessage) {
    expect(Expect).toContain(expectedResult);
    if(Expect === expectedResult){
      helperUtil.addStep(passMessage);
    }else{
      helperUtil.addStepsWithScreenshot(failMessage);
    }
  };


  helperUtil.dummyEmailAddress = function () {
    var allowedChars = "abcdefghiklmnopqrstuvwxyz";
    var stringLength = 5;
    var randomstring = '';

    for (var i = 0; i < stringLength; i++) {
      var rnum = Math.floor(Math.random() * allowedChars.length);
      randomstring += allowedChars.substring(rnum, rnum + 1);
    }
    // Append a domain name
    randomstring += "@zestygrid.com";
    return randomstring;
  };

  helperUtil.randomNumber = function () {
    return Math.floor((Math.random() * 10) + 1);
  };

  helperUtil.randomNumberPower = function (digit) {
    return Math.floor((Math.random() * Math.pow(10,digit)) + 1);
  };

  helperUtil.getTodayDateAndTime = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var todayDate;
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    todayDate = mm + '/' + dd + '/' + yyyy;
    return todayDate;
  };

  helperUtil.getDesiredDateObject = function (numberOfDays) {
    var desiredDate = new Date();

    desiredDate.setDate(desiredDate.getDate() + numberOfDays);
    desiredDate = new Date(desiredDate);

    return desiredDate;
  };

  helperUtil.getDateAndTime = function (date) {
    if(!date){
      date = new Date();
    }
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    var formattedDate;
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    formattedDate = mm + '/' + dd + '/' + yyyy;
    return formattedDate;
  };

  helperUtil.setValueUsingJavascript = function (inputText, locator) {
    return browser.executeScript("arguments[0].setAttribute('value', '" + inputText +"')", locator);
  };

module.exports = helperUtil;
