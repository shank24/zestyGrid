
var fetch = require('node-fetch');

module.exports = {
    getStatus: function test(option, callback) {
        option = option || {}
        var payload = {
            method : option.method,
            body: option.body,
            headers : option.headers,
            url : option.url
        };


        fetch(payload.url,payload)
            .then(function (responses) {
                 callback(null, responses);
            })
            .catch(function (err) {
            // Request failed...
            console.log("Errrrrrrrrrrrrrrrrrr", err);
            callback(err);
        });

    },

    getData: function test(option, callback) {
        option = option || {}
        var payload = {
            method : option.method,
            body: option.body,
            headers : option.headers,
            url : option.url
        };


        fetch(payload.url,payload)
            .then(function (responses) {
                return responses.json();
            })
            .then(function (data) {
                callback(null, data);
            })
            .catch(function (err) {
                // Request failed...
                console.log("Errrrrrrrrrrrrrrrrrr", err);
                callback(err);
            });

    }
}



