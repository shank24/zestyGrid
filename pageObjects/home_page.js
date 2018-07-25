
var helperUtil = require('./../utilities/helperUtil');

var home_page = function () {

  this.login_userName = function () {
    var login_userName = element(by.css("#username"));
    expect(login_userName.isPresent()).toBe(true, 'Email input box not found');
    return login_userName;
  };

  this.login_Password = function () {
    var login_password = element(by.css("#password"));
    expect(login_password.isPresent()).toBe(true, 'Password input box not found');
    return login_password;
  };

  this.login_clickLoginButton = function () {
    var login_clickLoginButton = element(by.css("button[type='submit']"));
    expect(login_clickLoginButton.isPresent()).toBe(true, 'Login submit button not found');
    return login_clickLoginButton;
  };


};
module.exports = new home_page();