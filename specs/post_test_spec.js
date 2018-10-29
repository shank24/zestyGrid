var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test GraphQL POST API queries', function () {

    var createPost,deletePost,featuredPosts,getPostById,posts,updatePost;

     var newPostID = "ef03145a-de48-484c-8f1c-db3409aecef4";

    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();

            createPost = "mutation { createPost( post: { chefId : \"" + global.userID + "\", title : \"Fungee1\", body : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\",  tags: [ \"Algae\" , \"Weed\" ], media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\",size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE } ], isDraft:false }) }";

            getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

            featuredPosts = "query {featuredPosts(postCount: 10) {id chefId title blurb body isDraft tags numOfLikes media{ type url }}}";


            posts = "query {posts(filters: { title: \"Fun\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";


            updatePost = "mutation { updatePost( post: { chefId:  \"" + global.userID + "\", id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

            deletePost = "mutation { deletePost(id: \""+ newPostID +"\") }";


            done();

        } else {
            done();
        }
    });

    it('ZESTY_POST-001 :Create Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+createPost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createPost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {

            global.postID = response.data.createPost;

            console.log("New Post ID :: "+postID);

            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-002 :Get Post By ID api', function (done) {

           console.log("Booking ID :: "+postID);

           newPostID = postID;


           getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

           helperUtil.addStep("Request Payload :: "+getPostById);

           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
               method: 'POST',
               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
               body: JSON.stringify({query: getPostById}),
           }).then(function (res) {

               return res.json();

           }).then(function (response) {
               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
               done();
           });
       });

    it('ZESTY_POST-003 :Featured Post api', function (done) {

        helperUtil.addStep("Request Payload :: "+featuredPosts);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: featuredPosts}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-004 :Posts api', function (done) {

        helperUtil.addStep("Request Payload :: "+posts);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-005 :Update Post api', function (done) {

        console.log("Booking ID :: "+postID);

        newPostID = postID;


        updatePost = "mutation { updatePost( post: { id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

        helperUtil.addStep("Request Payload :: "+updatePost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updatePost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('ZESTY_POST-006 :Calling Get Post After Update api', function (done) {

               console.log("Booking ID :: "+postID);

               newPostID = postID;


               getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

               helperUtil.addStep("Request Payload :: "+getPostById);

               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                   method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                   body: JSON.stringify({query: getPostById}),
               }).then(function (res) {

                   return res.json();

               }).then(function (response) {
                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                   done();
               });
           });

    xit('ZESTY_POST-007 :Delete Post api', function (done) {

        console.log("Post  ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+postID);

        newPostID = global.postID;

        deletePost = "mutation { deletePost(id: \""+ newPostID +"\") }";

        helperUtil.addStep("Request Payload :: "+deletePost);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: deletePost}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });
});
