require('isomorphic-fetch');

/*
var assert = require('assert');
var defaults = require('101/defaults');
*/

module.exports = function factory (graphqlUrl) {

    return function graphqlFetch (query, vars, opts) {

        vars = vars || {};
        opts = opts || {};
        opts.body = JSON.stringify({
            query: query,
            variables: vars
        });

        // default opts
       /* defaults(opts, {
            method: 'POST',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        });*/

        Object.assign({
            method: 'POST',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        }, opts);
        // default headers
        //var headers = opts.headers
        /*if (!headers.get('content-type')) {
            opts.headers.append('content-type', 'application/json')
        }*/
        return fetch(graphqlUrl, opts).then(function (res) {
            return res.json();
        });
    };
};