var request = require('graphql-request');
var rawRequest = require('graphql-request').rawRequest;
var GraphQLClient = require('graphql-request').GraphQLClient;
var fetch = require('isomorphic-fetch');

var util = require('util'),
    userInfo,


  helperUtil = require('./../utilities/helperUtil'),
  JSONData = require('./../testData/testData_' + process.env.NODE_ENV+ '.json');


describe('Test Q Series Specific Scenarios API', function () {


    var updateDish,dishesByChef;

    var updateUserQuery,addUserPayment,userPaymentMethods,updateUserPayment,addUserToStripe;
    var newCardId = 'card_1CaC5IJt7gce93gZgTTYcP2Y';
    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";
    var newPostID = "ef03145a-de48-484c-8f1c-db3409aecef4";
    var newDishID ="ef03145a-de48-484c-8f1c-db3409aecef4";
    var newReviewID ="ef03145a-de48-484c-8f1c-db3409aecef4";
    var email="shanky.kalra@wikfur.com";
    var bookingID,newBookingID,updatedNewBookingID;

    var addChefPayout,chefPayoutMethod,chefsByDish,updateChef,updateChefPayoutMethod,findChefs;


    var updateUser;





    beforeEach(function (done) {
        if (!userInfo) {
            helperUtil.envInfo();



            chefsByDish = "query { chefsByDish( dishName: \"Aloo Puri\", cursor: null, pageSize: 10) { chefs {id emailId firstName lastName } endCursor hasMore next hasNext previous hasPrevious} }";

            chefsByDish_1 = "query { chefsByDish( dishName: \"Chicken Tikka\", cursor: null, pageSize: 10,next:null, previous:null) { chefs {id emailId firstName lastName } endCursor hasMore next hasNext previous hasPrevious} }";


            findChefs_1 = "query{findChefs(filters: { cuisines: [\"\",\"\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_2 = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_3 = "query{findChefs(filters: { cuisines: [\"Chinese\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore next hasNext previous hasPrevious }}";

            findChefs_4 = "query{findChefs(filters: { cuisines: [\"Chinese\",\"Italian\"],  engagementSize: 6 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_5 = "query{findChefs(filters: {  dishes:[\"Palak Paneer\"] }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_6 = "query{findChefs(filters: {  priceMin:25 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_7 = "query{findChefs(filters: {  priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_8 = "query{findChefs(filters: {  priceMin:25, priceMax:100 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_9 = "query{findChefs(filters: {  }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_10 = "query{findChefs(filters: { search: \"90004\", searchType: ZIPCODE }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_11 = "query{findChefs(filters: { search: \"91342\", searchType: ZIPCODE}, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_12 = "query{findChefs(filters: { search: \"93101\", searchType: ZIPCODE}, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_13 = "query{findChefs(filters: {  priceMin:110 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";

            findChefs_14 = "query{findChefs(filters: {  priceMax:190 }, cursor: null, pageSize: 10, next:null, previous:null) { chefs{ id emailId firstName lastName rating reviewCount canFly minEngagementPrice maxDiners active } endCursor hasMore }}";



            dishesByChef = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_1 = "query {dishesByChef( chefId: \"" + global.userID +123+ "\", pageSize: 10, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_2 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:false, next:null, previous:null  ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";

            dishesByChef_3 = "query {dishesByChef( chefId: \"" + global.userID + "\", pageSize: 10, live:true, next:null, previous:null ) { dishes{id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious}}";


            findDishes_1 = "query {findDishes(filters: { longitude:-119.417931 , latitude:36.778259}, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_2 = "query {findDishes(filters: { }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_3 = "query {findDishes(filters: { cuisines: [\"Chinese\",\"Italian\"] }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_4 = "query {findDishes(filters: { dishes:[\"Palak Paneer\"] }, cursor: null, pageSize:10, includeChefs:true,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_5 = "query {findDishes(filters: { cuisines: [\"Chinese\"] }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_6 = "query {findDishes(filters: { priceMin:80 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";

            findDishes_7 = "query {findDishes(filters: { priceMin:150 }, cursor: null, pageSize:10, includeChefs:true,chefCount: 3,next:null, previous:null) { dishes{id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes} endCursor hasMore next hasNext previous hasPrevious }}";


             posts = "query {posts(filters: { title: \"Fun\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_1 = "query {posts(filters: { title: \"Furnace\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_2 = "query {posts(filters: { title: \"Fungee\",  chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6) { posts {id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_3 = "query {posts(filters: { tags: [ \"Algae\"] }) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

             posts_4 = "query {posts(filters: { tags: [ \"Algae\"], title: \"Fungee\" ,chefId:  \"" + global.userID + "\" }, cursor: null, pageSize: 6,next:null, previous:null) { posts { id chefId title blurb body isDraft tags numOfLikes liked media{ type url }} endCursor hasMore next hasNext previous hasPrevious}}";

//

             user_1 = "query { user(id: \"" + global.userID +123+ "\") { id, emailId, firstName, lastName,cellPhone,isChef,campaign,accessToken,profilePic,dateOfBirth,altPhone,address{street1} } }";

             user = "query { user(id: \"" + global.userID + "\") { id emailId firstName lastName cellPhone isChef campaign accessToken profilePic dateOfBirth altPhone address{street1} paymentInfo{ type card{ cardId type last4 } } } }";


             savedChefs_1 = "query { savedChefs(userId: \"" + global.userID + 123 + "\", cursor: null, pageSize: 6) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore } }";

             savedChefs_2 = "query { savedChefs(userId: \"" + global.userID + "\", cursor: null, pageSize: 6,next:null, previous:null) { chefs{ id emailId firstName lastName maxDiners minEngagementPrice active rating reviewCount } endCursor hasMore next hasNext previous hasPrevious } }";


             savedDishes_1 = "query { savedDishes(userId: \"" + global.userID + 123 + "\", cursor: null, pageSize: 6) { dishes{ id name description   minPrice minDinerSize equipmentNeeded numOfLikes media { type url } } endCursor hasMore } }";

             savedDishes_2 = "query { savedDishes(userId: \"" + global.userID + "\", cursor: null, pageSize: 6,next:null, previous:null) { dishes{ id name description   minPrice minDinerSize equipmentNeeded numOfLikes media { type url } }endCursor hasMore next hasNext previous hasPrevious } }";


             savedPosts_1 = "query { savedPosts(userId: \"" + global.userID + 123 +  "\", cursor: null, pageSize: 6) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore} }";

             savedPosts_2 = "query { savedPosts(userId: \"" + global.userID +  "\", cursor: null, pageSize: 6,next:null, previous:null) { posts{ id chefId title blurb body isDraft tags numOfLikes media { type url } } endCursor hasMore next hasNext previous hasPrevious} }";

//
             reviewTagsForChef = "query { reviewTagsForChef(userId: \"" + global.userID + "\") } ";


             getAvailableDishes = "query { getAvailableDishes(country: \"USA\") }";

             getAvailableDishes_1 = "query { getAvailableDishes(country: \"UK\") }";


             getChef =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

             getChef_1 =  "query { chef(id: \"" + global.userID + 123 + "\", dishCount: 3, postCount: 3) { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2} } }";

             getChef_2 =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName taxId emailId maxDiners minEngagementPrice canFly completedSetupStep dateOfBirth profilePic address {street1 street2}  payoutMethod { id accountId last4 routingNumber } } }";

             getChef_3 =  "query { chef(id: \"" + global.userID + "\") { id firstName lastName emailId maxDiners minEngagementPrice canFly active address{ street1 street2 } dishesList{ dishes{id name cuisines} hasMore next } } } ";


             reviews = "query { reviews(filters: {reviewee: \"" + global.userID + "\", reviewType: DISH}, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";

             reviews_1 = "query { reviews(filters: {reviewee: \"" + global.userID + "\", reviewType: CHEF, bookingId:\"" + global.bookingIDFinal + "\" }, cursor: null, pageSize: 6) { reviews{id reviewer reviewerName reviewee rating bookingId tags body reviewType} endCursor hasMore } }";


//
             dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes  ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

             getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

             cuisines = "query { cuisines(country: \"US\") }";


             userBookings_1 = "query { userBookings(userId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore } }";

             userBookings_2 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,next:null, previous:null) {bookings{ id chefId  date   chefReviewId } endCursor hasMore next hasNext previous hasPrevious} }";

             userBookings_3 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED_BY_CHEF, cursor: null, pageSize: 6) {bookings{ id chefId  date   chefReviewId } endCursor hasMore} }";

             userBookings_4 = "query { userBookings(userId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,next:null, previous:null) {bookings{ id chefId  date   chefReviewId } endCursor hasMore next hasNext previous hasPrevious} }";


             chefBookings_1 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: INCOMPLETE, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

             chefBookings_2 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15,next:null, previous:null) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore next hasNext previous hasPrevious} }";

             chefBookings_3 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

             chefBookings_4 =  "query { chefBookings(chefId: \"" + global.userID + "\", status: COMPLETED, cursor: null, pageSize: 6,startDate: \"2018-08-13\", numWeeks:15) {bookings{ id userId distance amount date  userReviewId } endCursor hasMore} }";

//
             review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

             review_1 = "query {review(id: \""+ newReviewID + 123 + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

             reviewTagsForUser = "query { reviewTagsForUser(userId: \"" + global.userID + "\") } ";

             dishesList = "query {dishesList(country: \"US\")}";

             createUser = "mutation { createUser(user: { emailId: \""+ global.emailID +"\", pwd: \"P@ssw0rd\", firstName: \"Alex\", lastName: \"Price\", cellPhone: \"9814644011\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"90210\", country: \"India\"}, dateOfBirth: \"1991-01-06\" }) }";

             createUser_1 = "mutation { createUser(user: { emailId: \""+ global.emailID +"\", pwd: \"P@ssw0rd\",  lastName: \"Price\", cellPhone: \"9814644011\", address: { street1: \"711 Floor 7, Bestech Business Towers\", street2: \"Sector 66, Phase XI\", city: \"Mohali\", state: \"Punjab\", zip: \"90210\", country: \"India\"}, dateOfBirth: \"1991-01-06\" }) }";


//


            addSavedItemsChefs = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { chefs:[\"" + global.userID + "\"] })}";
            addSavedItemsDishes = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { dishes:[\"" + global.dishID + "\"] })}";
            addSavedItemsPosts = "mutation {addSavedItems(userId: \"" + global.userID + "\", itemsToAdd: { posts:[\"" + global.postID + "\"] })}";

            deleteSavedItemsChefs = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { chefs:[\"d359a2c9-a71b-43e1-90f2-8d6969cb753f\", \"acec02d4-8539-498f-866b-cf82546c3e20\"] })}";
            deleteSavedItemsPosts = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { posts:[\"d93a0419-0819-45ce-ab1e-e53027b2a415\", \"b9308b37-2313-4775-839f-d374e7cb02e1\"] })}";
            deleteSavedItemsDishes = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { dishes:[\"a6d371d2-ced3-40f8-91d5-e2caf534abec\", \"c54755e0-2882-4e18-a125-554b3693fee4\"] })}";

            deleteSavedItemsChefs_1 = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { chefs:[] })}";
            deleteSavedItemsPosts_1 = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { posts:[] })}";
            deleteSavedItemsDishes_1 = "mutation {deleteSavedItems(userId: \"" + global.userID + "\", itemsToDelete: { dishes:[] })}";


            addUserToStripe = "mutation {addUserToStripe(userId: \"" + global.userID + "\")}";

            addUserPayment = "mutation {addUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 2, expYear: 2023, cvc: 321 } } )}";
            addUserPayment_1 = "mutation {addUserPayment( userId: \"" + global.userID + 123 +"\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 2, expYear: 2023, cvc: 321 } } )}";

            updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";
            updateUserPayment_1 = "mutation {updateUserPayment( userId: \"" + global.userID +  "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + 123 +"\" )}";

//


            addChefPayout = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            addChefPayout_1 = "mutation { addChefPayoutMethod(chefId: \"" + global.userID + 123 + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";

            updateChefPayoutMethod = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";
            updateChefPayoutMethod_1 = "mutation { updateChefPayoutMethod(chefId: \"" + global.userID + 123 + "\", payout: { type: ACH, achAccount: { bankName: \"Stripe Test Bank\", type: CHECKING, routingNumber: \"110000000\", accountNumber: \"000123456789\" } }) } ";

            deleteChefPayoutMethod = "mutation { deleteChefPayoutMethod(chefId: \"" + global.userID + "\", accountId: \"acct_1CoSlsHOKx7hBtn4\") }";

            deleteUserPayment = "mutation { deleteUserPayment(userId: \"" + global.userID + "\", cardId: \""+ newCardId + "\") }";
            deleteUserPayment_1 = "mutation { deleteUserPayment(userId: \"" + global.userID + 123 + "\", cardId: \""+ newCardId + "\") }";

//

            login = "mutation { login(id: \""+ global.emailID +"\" , pwd: \"P@ssw0rd\" ) }";
            login_1 = "mutation { login(id: \""+ global.emailID + 123 + "\" , pwd: \"P@ssw0rd\" ) }";


            updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull New Dish.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ GLUTEN_FREE], ingredients : [ \"Red Chillies\", \"Pork\", ], isDraft: false, equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";

            createPost = "mutation { createPost( post: { chefId : \"" + global.userID + "\", title : \"Fungee1\", body : \"Laborum ad occaecat dolore fugiat id. Lorem officia irure mollit adipisicing laborum voluptate exercitation voluptate fugiat in proident. Culpa anim laboris nulla id reprehenderit esse cillum voluptate consequat quis. Laborum incididunt voluptate reprehenderit sunt sit sunt aliqua in minim elit.\",  tags: [ \"Algae\" , \"Weed\" ], media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\",size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE } ] }) }";

            updatePost = "mutation { updatePost( post: { chefId:  \"" + global.userID + 123 +  "\", id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

            submitReview = "mutation { submitReview(review: { reviewer: \"" + global.userID + "\", reviewee: \"" + global.userID + "\",  bookingId:\"" + global.bookingIDFinal + "\", reviewerName: \"Charneet Keet\", reviewType: CHEF, rating: 4.5, tags: \"Value\", body: \"Value\" }) }";
            submitReview_1 = "mutation { submitReview(review: { reviewee: \"" + global.userID + "\",  bookingId:\"" + global.bookingIDFinal + "\", reviewerName: \"Charneet Keet\", reviewType: CHEF, rating: 4.5, tags: \"Value\", body: \"Value\" }) }";

            updateReview = "mutation {updateReview(reviewId: \"" + newReviewID + 123 +"\", ratings: 23)}";


//

            createInProgressBooking = "mutation { createInProgressBooking(booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", date: \"2018-08-13\", timeSlot: { start: \"11:00\", end: \"13:00\"}, dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }] ,  equipmentsPresent: [\"Microwave Oven\", \"Grill\", \"Gas\"], cardId: \"" + global.cardID + "\",   }) }";
            createInProgressBooking_1 = "mutation { createInProgressBooking(booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", date: \"2018-08-13\", timeSlot: { start: \"11:00\", end: \"13:00\"}, dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }] ,  equipmentsPresent: [\"Microwave Oven\", \"Grill\", \"Gas\"], cardId: \"" + global.cardID + "\", status:INCOMPLETE }) }";

            updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\",   }) }";
            updateInProgressBooking_1 = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\", dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }]  }) }";


            createBooking = "mutation { createBooking(bookingId: \""+ newBookingID +"\" ) }";

//
            chefDaySchedule_1 = "query {chefDaySchedule(chefId: \"" + global.userID + "\", date: \"2018-10-05\") { date available slots{start end} }}";
            chefDaySchedule = "query {chefDaySchedule(chefId: \"" + global.userID + "\", date: \"2000-00-00\") { date available slots{start end} }}";

            chefWeeklySchedule = "query {chefSchedule(chefId: \"" + global.userID + "\") { daySchedules{ day slots{start end} } }}";



            //Invalid User
            reserveChefSlot_1 = "mutation { reserveChefSlot(chefId: \"" + global.userID + 123 +"\", userId: \"" + global.userID + 123 + "\", day: \"2018-08-13\", slot: {start: \"11:30\", end: \"14:00\"}) }";

            //Invalid Date
            reserveChefSlot_2 = "mutation { reserveChefSlot(chefId: \"" + global.userID + "\", userId: \"" + global.userID + "\", day: \"2018-08-53\", slot: {start: \"11:30\", end: \"14:00\"}) }";


            //Out of Slot
            reserveChefSlot_3 = "mutation { reserveChefSlot(chefId: \"" + global.userID + "\", userId: \"" + global.userID + "\", day: \"2018-11-02\", slot: {start: \"22:30\", end: \"23:00\"}) }";






            done();


        } else {
            done();
        }
    });



//ChefByDish

    it('01-With Dish Non-Existent :Q7_ChefByDish', function (done) {

         helperUtil.addStep("Request Payload :: "+chefsByDish);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefsByDish}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('02-With Dish Pagination TCs :Q7_ChefByDish', function (done) {

         helperUtil.addStep("Request Payload :: "+chefsByDish_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: chefsByDish_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

//findChefs

    it('03-With Empty List : Q8__find_Chefs', function (done) {
          helperUtil.addStep("Request Payload :: "+findChefs_1);


        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: findChefs_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

    it('04-With Pagination TCs: Q8__find_Chefs', function (done) {
            helperUtil.addStep("Request Payload :: "+findChefs_2);


          fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
              body: JSON.stringify({query: findChefs_2}),
          }).then(function (res) {

              return res.json();

          }).then(function (response) {
              helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
              done();
          });
      });

    it('05-With One Cuisine : Q8__find_Chefs', function (done) {
                  helperUtil.addStep("Request Payload :: "+findChefs_3);


                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: findChefs_3}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

    it('06-With Two Cuisine : Q8__find_Chefs', function (done) {

                      helperUtil.addStep("Request Payload :: "+findChefs_4);


                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: findChefs_4}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
      });

    it('07-With One Dish : Q8__find_Chefs', function (done) {
                          helperUtil.addStep("Request Payload :: "+findChefs_5);


                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: findChefs_5}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                            done();
                        });
          });

    it('08-With price Min: Q8__find_Chefs', function (done) {
                              helperUtil.addStep("Request Payload :: "+findChefs_6);


                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                body: JSON.stringify({query: findChefs_6}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                done();
                            });
      });

    it('09-With price Max: Q8__find_Chefs', function (done) {
                                helperUtil.addStep("Request Payload :: "+findChefs_7);


                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                  body: JSON.stringify({query: findChefs_7}),
                              }).then(function (res) {

                                  return res.json();

                              }).then(function (response) {
                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                  done();
                              });
       });

    it('10-With both price_Min & price Max: Q8__find_Chefs', function (done) {
                                helperUtil.addStep("Request Payload :: "+findChefs_8);


                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                  body: JSON.stringify({query: findChefs_8}),
                              }).then(function (res) {

                                  return res.json();

                              }).then(function (response) {
                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                  done();
                              });
       });

    it('11-No Filters: Q8__find_Chefs', function (done) {
                                       helperUtil.addStep("Request Payload :: "+findChefs_9);


                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                         method: 'POST',
                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                         body: JSON.stringify({query: findChefs_9}),
                                     }).then(function (res) {

                                         return res.json();

                                     }).then(function (response) {
                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                         done();
                                     });
       });

    it('11_1-Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                               helperUtil.addStep("Request Payload :: "+findChefs_10);


                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                 method: 'POST',
                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                 body: JSON.stringify({query: findChefs_10}),
                                             }).then(function (res) {

                                                 return res.json();

                                             }).then(function (response) {
                                                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                 done();
                                             });
         });

    it('11_2-Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                                       helperUtil.addStep("Request Payload :: "+findChefs_11);


                                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                         method: 'POST',
                                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                         body: JSON.stringify({query: findChefs_11}),
                                                     }).then(function (res) {

                                                         return res.json();

                                                     }).then(function (response) {
                                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                         done();
                                                     });
        });

    it('11_3-Invalid Zip Code Based Search api  : Q8__find_Chefs', function (done) {
                                                       helperUtil.addStep("Request Payload :: "+findChefs_12);


                                                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                         method: 'POST',
                                                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                         body: JSON.stringify({query: findChefs_12}),
                                                     }).then(function (res) {

                                                         return res.json();

                                                     }).then(function (response) {
                                                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                         done();
                                                     });
        });

    it('11_4-Price Min Scenario Search api  : Q8__find_Chefs', function (done) {
                                                               helperUtil.addStep("Request Payload :: "+findChefs_13);


                                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                                 method: 'POST',
                                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                                 body: JSON.stringify({query: findChefs_13}),
                                                             }).then(function (res) {

                                                                 return res.json();

                                                             }).then(function (response) {
                                                                 helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                                 done();
                                                             });
         });

    it('11_5-Price Max Scenario Based Search api  : Q8__find_Chefs', function (done) {
                                                                helperUtil.addStep("Request Payload :: "+findChefs_14)


                                                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                                  method: 'POST',
                                                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                                  body: JSON.stringify({query: findChefs_14}),
                                                              }).then(function (res) {

                                                                  return res.json();

                                                              }).then(function (response) {
                                                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                                  done();
                                                              });
          });


//DishesByChef

     it('12-With Non Existent Chef: Q11_Dishes_By_Chef', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                done();
            });
        });

     it('13-With Live Set to False: Q11_Dishes_By_Chef', function (done) {

                helperUtil.addStep("Request Payload :: "+dishesByChef_2);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dishesByChef_2}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

     it('14-With Live Set to True: Q11_Dishes_By_Chef', function (done) {

            helperUtil.addStep("Request Payload :: "+dishesByChef_3);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: dishesByChef_3}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

     it('15-With Valid Chef: Q11_Dishes_By_Chef', function (done) {

           helperUtil.addStep("Request Payload :: "+dishesByChef);

           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
               method: 'POST',
               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
               body: JSON.stringify({query: dishesByChef}),
           }).then(function (res) {

               return res.json();

           }).then(function (response) {
               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
               done();
           });
       });


//Posts Filters

     it('16-With Invalid Data In Title :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

     it('17-With Valid Data & Pagination Case :Q15_Posts', function (done) {

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

     it('18-With Specifc Title  :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_2);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_2}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

     it('19-With Specifc Tags  :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_3);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_3}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });

     it('20-With Specifc Title  & Tags :Q15_Posts', function (done) {

        helperUtil.addStep("Request Payload :: "+posts_4);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: posts_4}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


//User Module

      it('21-With Non Existent User :Q1_User', function (done) {

        helperUtil.addStep("Request Payload :: "+user_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: user_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
            done();
        });
    });

      it('22-With Existent User Specifc Fields :Q1_User', function (done) {

        helperUtil.addStep("Request Payload :: "+user);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: user}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


//SavedChefs

      it('23-With Invalid Chef :Saved Chefs api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedChefs_1);


                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: savedChefs_1}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {


                                    helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.errors));

                                    done();
                                });
                            });

      it('24-With Pagination Scenario :Saved Chefs api', function (done) {

                                      helperUtil.addStep("Request Payload :: "+savedChefs_2);


                                                          fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                              method: 'POST',
                                                              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                              body: JSON.stringify({query: savedChefs_2}),
                                                          }).then(function (res) {

                                                              return res.json();

                                                          }).then(function (response) {
                                                              helperUtil.addStep("Saved Chefs api response is :: " + JSON.stringify(response.data.savedChefs.chefs[0]));


                                                              done();
                                                          });
              });

//SavedDishes

      it('25-With Invalid Chef :Saved Dishes api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedDishes_1);


                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: savedDishes_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Saved Dishes api response is :: " + JSON.stringify(response.errors));
                        done();
                    });
                });

      it('26-With Pagination Scenario :Saved Dishes api', function (done) {

                                         helperUtil.addStep("Request Payload :: "+savedDishes_2);


                                                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                     method: 'POST',
                                                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                     body: JSON.stringify({query: savedDishes_2}),
                                                 }).then(function (res) {

                                                     return res.json();

                                                 }).then(function (response) {
                                                     helperUtil.addStep("Saved Dishes api response is :: " + JSON.stringify(response.data.savedDishes.dishes));
                                                     done();
                                                 });
                  });

//SavedPosts

      it('27-With Invalid Chef ::Saved Post api', function (done) {

            helperUtil.addStep("Request Payload :: "+savedPosts_1);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: savedPosts_1}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Saved Post response is :: " + JSON.stringify(response.errors));
                                    done();
                                });
             });

      it('28-With Pagination Scenario :Saved Post api', function (done) {

                        helperUtil.addStep("Request Payload :: "+savedPosts_2);

                                             fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                 method: 'POST',
                                                 headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                 body: JSON.stringify({query: savedPosts_2}),
                                             }).then(function (res) {

                                                 return res.json();

                                             }).then(function (response) {
                                                 helperUtil.addStep("Saved Post response is :: " + JSON.stringify(response.data.savedPosts.posts));
                                                 done();
                                             });
                        });

//FindDishes

       it('29-With Valid Values : Find Dishes api', function (done) {

                    helperUtil.addStep("Request Payload :: "+findDishes_1);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: findDishes_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                        done();
                    });
                });

       it('30-With Blank Filters: Find Dishes api', function (done) {

                        helperUtil.addStep("Request Payload :: "+findDishes_2);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: findDishes_2}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                            done();
                        });
                    });

       it('31-Two-Cuisines: Find Dishes api', function (done) {

                            helperUtil.addStep("Request Payload :: "+findDishes_3);

                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                body: JSON.stringify({query: findDishes_3}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                done();
                            });
                        });

       it('32-With -Dishes: Find Dishes api', function (done) {

                                helperUtil.addStep("Request Payload :: "+findDishes_4);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                    body: JSON.stringify({query: findDishes_4}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                    done();
                                });
                            });

       it('33-One-Cusines: Find Dishes api', function (done) {

                                    helperUtil.addStep("Request Payload :: "+findDishes_5);

                                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                        body: JSON.stringify({query: findDishes_5}),
                                    }).then(function (res) {

                                        return res.json();

                                    }).then(function (response) {
                                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                        done();
                                    });
                                });

       it('34-Price-Min_80: Find Dishes api', function (done) {

                                        helperUtil.addStep("Request Payload :: "+findDishes_6);

                                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                            body: JSON.stringify({query: findDishes_6}),
                                        }).then(function (res) {

                                            return res.json();

                                        }).then(function (response) {
                                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                            done();
                                        });
                                    });

       it('35-Price-Min_100: Find Dishes api', function (done) {

                                        helperUtil.addStep("Request Payload :: "+findDishes_7);

                                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                            body: JSON.stringify({query: findDishes_7}),
                                        }).then(function (res) {

                                            return res.json();

                                        }).then(function (response) {
                                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                            done();
                                        });
                                    });


//GetPostByID

        it('37-Valid-Post_by-ID :Get Post By ID api', function (done) {

                        console.log("Booking ID :: "+postID);

                        newPostID = global.postID;;


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

        it('38-Common_TCs_01: Get Post By ID api', function (done) {

                                    console.log("Booking ID :: "+postID);

                                    newPostID = global.postID;;


                                    getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

                                    helperUtil.addStep("Request Payload :: "+getPostById);

                                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                        body: JSON.stringify({query: getPostById}),
                                    }).then(function (res) {

                                        return res.json();

                                    }).then(function (response) {
                                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                        done();
                                    });
                                });

        it('39-Common_TCs_02: Get Post By ID api', function (done) {


                        console.log("Booking ID :: "+postID);

                        newPostID = global.postID;;


                        getPostById = "query {post(id: \""+ newPostID +"\") {id chefId title blurb body isDraft tags numOfLikes media{ type url } } }";

                        helperUtil.addStep("Request Payload :: "+getPostById);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                            body: JSON.stringify({query: getPostById}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                            done();
                        });
                    });


//ReviewsTagForChef

        it('40-Review_Tags_For_Chef:Review Tag for Chef api', function (done) {

                   helperUtil.addStep("Request Payload :: "+reviewTagsForChef);

                   fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                       method: 'POST',
                       headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                       body: JSON.stringify({query: reviewTagsForChef}),
                   }).then(function (res) {

                       return res.json();

                   }).then(function (response) {
                       helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                       done();
                   });
               });
``
        it('41-Review_Tags_For_Chef:Review Tag for Chef api', function (done) {

                                helperUtil.addStep("Request Payload :: "+reviewTagsForChef);

                                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                                    body: JSON.stringify({query: reviewTagsForChef}),
                                }).then(function (res) {

                                    return res.json();

                                }).then(function (response) {
                                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                    done();
                                });
                            });

//GetAvailableDishes

        it('42-With Valid Case : Get Available Dishes api', function (done) {

                          helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                          fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                              body: JSON.stringify({query: getAvailableDishes}),
                          }).then(function (res) {

                              return res.json();

                          }).then(function (response) {
                              helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                              done();
                          });
                      });

        it('43-With Invalid Country Code Case : Get Available Dishes api', function (done) {

                                      helperUtil.addStep("Request Payload :: "+getAvailableDishes_1);

                                      fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                          method: 'POST',
                                          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                          body: JSON.stringify({query: getAvailableDishes_1}),
                                      }).then(function (res) {

                                          return res.json();

                                      }).then(function (response) {
                                          helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                          done();
                                      });
           });

        it('44-With-Common_TCs_01 : Get Available Dishes api', function (done) {

                                                 helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                                                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                     method: 'POST',
                                                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                                     body: JSON.stringify({query: getAvailableDishes}),
                                                 }).then(function (res) {

                                                     return res.json();

                                                 }).then(function (response) {
                                                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                                     done();
                                                 });
            });

        it('45-With_Common_TCs_02 : Get Available Dishes api', function (done) {

                                                  helperUtil.addStep("Request Payload :: "+getAvailableDishes);

                                                  fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                      method: 'POST',
                                                      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                      body: JSON.stringify({query: getAvailableDishes}),
                                                  }).then(function (res) {

                                                      return res.json();

                                                  }).then(function (response) {
                                                      helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                                      done();
                                                  });
               });

//GetChef

        it('46-With_Invalid_Chef_ID :Get Chef api', function (done) {

                      helperUtil.addStep("Request Payload :: "+getChef_1);

                      fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                          method: 'POST',
                          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                          body: JSON.stringify({query: getChef_1}),
                      }).then(function (res) {

                          return res.json();

                      }).then(function (response) {
                          helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                          done();
                      });
                  });

        it('47-With Payment Method :Get Chef api', function (done) {

                                  helperUtil.addStep("Request Payload :: "+getChef_2);

                                  fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                      method: 'POST',
                                      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                      body: JSON.stringify({query: getChef_2}),
                                  }).then(function (res) {

                                      return res.json();

                                  }).then(function (response) {
                                      helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                      done();
                                  });
             });

        it('48-With Dishes List :Get Chef api', function (done) {

                                               helperUtil.addStep("Request Payload :: "+getChef_3);

                                               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                   method: 'POST',
                                                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                   body: JSON.stringify({query: getChef_3}),
                                               }).then(function (res) {

                                                   return res.json();

                                               }).then(function (response) {
                                                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                                   done();
                                               });
             });

        it('49-With_Valid_Values :Get Chef api', function (done) {

                         helperUtil.addStep("Request Payload :: "+getChef);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: getChef}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                             done();
                         });
                     });


//ReviewsFiltered

        it('50-With_Valid_Data :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                               done();
                           });
                       });

        it('51-With_Booking_ID :Reviews Filtered api', function (done) {

                               helperUtil.addStep("Request Payload :: "+reviews_1);

                                helperUtil.addStep("Final ID ::" + global.bookingIDFinal);

                               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                   body: JSON.stringify({query: reviews_1}),
                               }).then(function (res) {

                                   return res.json();

                               }).then(function (response) {
                                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                                   done();
                               });
                           });

        it('52-With-Common_TCs_01 :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                               done();
                           });
                       });

        it('53-With-Common_TCs_02 :Reviews Filtered api', function (done) {

                           helperUtil.addStep("Request Payload :: "+reviews);



                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                               body: JSON.stringify({query: reviews}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                               done();
                           });
                       });

//Dish

        it('54-Valid Dish Exists :  Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;
                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

        it('55-Invalid Dish Non Exists : Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "123"+ "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

        it('56-With-Common_TCs_01 : Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);


                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' +"123"},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

        it('57-With-Common_TCs_02: Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                newDishID= global.dishID;

                dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                helperUtil.addStep("Request Payload :: "+dish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                    body: JSON.stringify({query: dish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                    done();
                });
            });

//Cuisines

        it('58-With Valid Country Code : Cuisine api', function (done) {

                helperUtil.addStep("Request Payload :: "+cuisines);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: cuisines}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

//UserBooking

        it('59-Incomplete-Booking : User Booking api', function (done) {

                    helperUtil.addStep("Request Payload :: "+userBookings_1);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: userBookings_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));

                        done();
                    });
                });

        it('60-With Pagination Based : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_2);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_2}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

        it('61-With Specific Booking_STATE : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_3);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_3}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

        it('62-With Authenticated User : User Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+userBookings_4);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: userBookings_4}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

//ChefBooking

        it('63-With Incomplete-Booking : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_1);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_1}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));

                         done();
                     });
                 });

        it('64-With Pagination Based : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_2);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_2}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

        it('65-Without Start Date & Num-Weeks : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_3);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_3}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

        it('66-With Authenticated User : Chef Booking api', function (done) {

                     helperUtil.addStep("Request Payload :: "+chefBookings_4);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: chefBookings_4}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {

                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                         done();
                     });
                 });

//GetReview

         it('67-With-Invalid-ID:Get Review api', function (done) {

               newReviewID= global.reviewID;

               helperUtil.addStep("New Review ID is :: "+newReviewID);

               review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

               helperUtil.addStep("Request Payload :: "+review_1);

               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                   method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                   body: JSON.stringify({query: review_1}),
               }).then(function (res) {

                   return res.json();

               }).then(function (response) {
                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                   done();
               });
           });

         it('68-With-Valid-Data :Get Review api', function (done) {

                   newReviewID= global.reviewID;

                   helperUtil.addStep("New Review ID is :: "+newReviewID);

                   review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

                   helperUtil.addStep("Request Payload :: "+review);

                   fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                       method: 'POST',
                       headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                       body: JSON.stringify({query: review}),
                   }).then(function (res) {

                       return res.json();

                   }).then(function (response) {
                       helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                       done();
                   });
               });

         it('69-With-Common_TCs_01  :Get Review api', function (done) {

                            newReviewID= global.reviewID;

                            helperUtil.addStep("New Review ID is :: "+newReviewID);

                            review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

                            helperUtil.addStep("Request Payload :: "+review);

                            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                body: JSON.stringify({query: review}),
                            }).then(function (res) {

                                return res.json();

                            }).then(function (response) {
                                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                done();
                            });
              });

         it('70-With-Common_TCs_02 :Get Review api', function (done) {

                                 newReviewID= global.reviewID;

                                 helperUtil.addStep("New Review ID is :: "+newReviewID);

                                 review = "query {review(id: \""+ newReviewID + "\") {id reviewer reviewerName reviewee rating tags body reviewType } }";

                                 helperUtil.addStep("Request Payload :: "+review);

                                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                     method: 'POST',
                                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken + "123"},
                                     body: JSON.stringify({query: review}),
                                 }).then(function (res) {

                                     return res.json();

                                 }).then(function (response) {
                                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                     done();
                                 });
             });

//ReviewTagForUser

          it('71 With Valid Data :Review Tag for User api', function (done) {

                     helperUtil.addStep("Request Payload :: "+reviewTagsForUser);

                     fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                         body: JSON.stringify({query: reviewTagsForUser}),
                     }).then(function (res) {

                         return res.json();

                     }).then(function (response) {
                         helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                         done();
                     });
                 });

          it('72-With-Common_TCs_01 :Review Tag for User api', function (done) {

                               helperUtil.addStep("Request Payload :: "+reviewTagsForUser);

                               fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                                   body: JSON.stringify({query: reviewTagsForUser}),
                               }).then(function (res) {

                                   return res.json();

                               }).then(function (response) {
                                   helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                   done();
                               });
         });

          it('73-With-Common_TCs_02 :Review Tag for User api', function (done) {

                              helperUtil.addStep("Request Payload :: "+reviewTagsForUser);

                              fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken+"123"},
                                  body: JSON.stringify({query: reviewTagsForUser}),
                              }).then(function (res) {

                                  return res.json();

                              }).then(function (response) {
                                  helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                                  done();
                              });
            });

//DishesList

          it('74-With-Valid_Scenario: Dishes List api', function (done) {

                      helperUtil.addStep("Request Payload :: "+dishesList);

                      fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                          method: 'POST',
                          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                          body: JSON.stringify({query: dishesList}),
                      }).then(function (res) {

                          return res.json();

                      }).then(function (response) {
                          helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                          done();
                      });
                  });

//CreateUser

          it('75-With Re-Creating A New User :M1_Create_User', function (done) {

                  helperUtil.addStep("Request Payload :: "+createUser);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: createUser}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                     done();
                 });
             });

          it('76-With Creating User Without Required Fields :M1_Create_User', function (done) {

                  helperUtil.addStep("Request Payload :: "+createUser_1);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: createUser_1}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                     done();
                 });
             });

          it('77-With Common_TCs_01:M1_Create_User', function (done) {

                  helperUtil.addStep("Request Payload :: "+createUser_1);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + "123"},
                     body: JSON.stringify({query: createUser}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                     done();
                 });
             });

          it('78-With Common_TCs_02:M1_Create_User', function (done) {

                            helperUtil.addStep("Request Payload :: "+createUser_1);

                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                               method: 'POST',
                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken + "123"},
                               body: JSON.stringify({query: createUser}),
                           }).then(function (res) {

                               return res.json();

                           }).then(function (response) {
                               helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                               done();
                           });
            });

//AddSavedItems(Posts,Chefs.Dishes)

        it('79-Calling Add Saved Items Chef Again :Add Saved Items For Chef api', function (done) {

                        helperUtil.addStep("Request Payload :: "+addSavedItemsChefs);
                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: addSavedItemsChefs}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                            done();
                        });
                    });

        it('80-Calling Add Saved Items Dishes Again :Add Saved Items For Dishes api', function (done) {

                        helperUtil.addStep("Request Payload :: "+addSavedItemsDishes);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: addSavedItemsDishes}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                            done();
                        });
                    });

        it('81-Calling Add Saved Items Posts Again :Add Saved Items For Posts api', function (done) {

                        helperUtil.addStep("Request Payload :: "+addSavedItemsPosts);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: addSavedItemsPosts}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Add Saved Items response is :: " + JSON.stringify(response.data.addSavedItems));
                            done();
                        });
                    });

//DeleteSavedItems

        it('82-ZESTY_USER-009 :Delete Saved Items Chefs api', function (done) {


             helperUtil.addStep("Request Payload :: "+deleteSavedItemsChefs);


                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteSavedItemsChefs}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                    done();
                });
            });

        it('83-ZESTY_USER-009 :Delete Saved Items Posts api', function (done) {

         helperUtil.addStep("Request Payload :: "+deleteSavedItemsPosts);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteSavedItemsPosts}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                    done();
                });
            });

        it('84-ZESTY_USER-009 :Delete Saved Items Dishes api', function (done) {

             helperUtil.addStep("Request Payload :: "+deleteSavedItemsDishes);


                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteSavedItemsDishes}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                    done();
                });
            });

//AddUsertoStripe

         it('85-Calling It Again :Add User to Stripe api', function (done) {

                helperUtil.addStep("Request Payload :: "+addUserToStripe);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query:addUserToStripe }),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Add User to Stripe response is :: " + JSON.stringify(response.data.addUserToStripe));
                    done();
                });
            });

         it('86-With Valid User ID :Add User Payment api', function (done) {

                 helperUtil.addStep("Request Payload :: "+addUserPayment);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: addUserPayment}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Add User Payment response is :: " + response.data.addUserPayment);
                     done();
                 });
             });

//AddUserPayment

         it('87-With InValid User ID :Add User Payment api', function (done) {

                 helperUtil.addStep("Request Payload :: "+addUserPayment_1);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: addUserPayment_1}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Add User Payment response is :: " + response.data.addUserPayment);
                     done();
                 });
             });

//UpdateUserPayment

         it('88-With Valid User ID :Update User Payment api', function (done) {



                console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
                newCardId = global.cardID;
                helperUtil.addStep("New Card ID is :: "+newCardId);

                updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

                console.log("New Request :: "+updateUserPayment);

                helperUtil.addStep("Request Payload :: "+updateUserPayment);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: updateUserPayment}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.data.updateUserPayment));

                    done();
                }).catch(err => {

                    done(err);
                });
            });

         it('89-ZESTY_USER-008 Valid User ID :Delete User Payment api', function (done) {

                         helperUtil.addStep("Request Payload :: "+deleteUserPayment);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: deleteUserPayment}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.data.deleteUserPayment));
                             done();
                         });
            });

         it('90-With Valid User ID :Update User Payment api', function (done) {



                         console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
                         newCardId = global.cardID;
                         helperUtil.addStep("New Card ID is :: "+newCardId);

                         updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + "\" )}";

                         console.log("New Request :: "+updateUserPayment);

                         helperUtil.addStep("Request Payload :: "+updateUserPayment);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: updateUserPayment}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.data.updateUserPayment));

                             done();
                         }).catch(err => {

                             done(err);
                         });
             });

         it('91 - With Invalid User Id :Update User Payment api', function (done) {



                         console.log("Card ID is :: >>>>>>>>>>> HOLA >>>>>>>>>>"+cardID);
                         newCardId = global.cardID;
                         helperUtil.addStep("New Card ID is :: "+newCardId);

                         updateUserPayment = "mutation {updateUserPayment( userId: \"" + global.userID + "\", payment: { type: CARD, card: { number: \"378282246310005\", expMonth: 5, expYear: 2025, cvc: 987 } }, cardId: \""+ newCardId + 123 +"\" )}";

                         console.log("New Request :: "+updateUserPayment);

                         helperUtil.addStep("Request Payload :: "+updateUserPayment_1);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: updateUserPayment_1}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Update User Payment response is :: " + JSON.stringify(response.errors));

                             done();
                         }).catch(err => {

                             done(err);
                         });
                     });


//DeleteSavedItemsNULL

         it('92-ZESTY_USER-009 NULL Values :Delete Saved Items Chefs api', function (done) {


                     helperUtil.addStep("Request Payload :: "+deleteSavedItemsChefs_1);


                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: deleteSavedItemsChefs_1}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                            done();
                        });
         });

         it('93-ZESTY_USER-009 NULL Values :Delete Saved Items Posts api', function (done) {

                 helperUtil.addStep("Request Payload :: "+deleteSavedItemsPosts_1);

                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: deleteSavedItemsPosts_1}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                            done();
                        });
         });

         it('94-ZESTY_USER-009 NULL Values :Delete Saved Items Dishes api', function (done) {

                     helperUtil.addStep("Request Payload :: "+deleteSavedItemsDishes_1);


                        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                            body: JSON.stringify({query: deleteSavedItemsDishes_1}),
                        }).then(function (res) {

                            return res.json();

                        }).then(function (response) {
                            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data.deleteSavedItems));
                            done();
                        });
         });

//AddChefPayout

         it('95-ZESTY_CHEF-004 Valid Case :Add Chef Payout api', function (done) {

                helperUtil.addStep("Request Payload :: "+addChefPayout);
                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: addChefPayout}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });

         it('96-ZESTY_CHEF-004 Invalid Case :Add Chef Payout api', function (done) {

                    helperUtil.addStep("Request Payload :: "+addChefPayout_1);
                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: addChefPayout_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {
                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                        done();
                    });
                });

//UpdateChefPayout

         it('97-ZESTY_CHEF-005 Valid Case :Update Chef Payout api', function (done) {

                 helperUtil.addStep("Request Payload :: "+updateChefPayoutMethod);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: updateChefPayoutMethod}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
         });

         it('98-ZESTY_CHEF-007 Valid Case :Delete Chef Payout api', function (done) {

                         helperUtil.addStep("Request Payload :: "+deleteChefPayoutMethod);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: deleteChefPayoutMethod}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                             done();
                         });
         });

         it('99-ZESTY_CHEF-005 Invalid Case :Update Chef Payout api', function (done) {

                  helperUtil.addStep("Request Payload :: "+updateChefPayoutMethod_1);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: updateChefPayoutMethod_1}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));
                     done();
                 });
          });

//DeleteChefPayout

         it('99_1-ZESTY_CHEF-007 Valid Case :Delete Chef Payout api', function (done) {

                 helperUtil.addStep("Request Payload :: "+deleteChefPayoutMethod);

                 fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                     body: JSON.stringify({query: deleteChefPayoutMethod}),
                 }).then(function (res) {

                     return res.json();

                 }).then(function (response) {
                     helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                     done();
                 });
         });

//DeleteUserPayment

         it('99_2-ZESTY_USER-008 Valid User ID :Delete User Payment api', function (done) {

                helperUtil.addStep("Request Payload :: "+deleteUserPayment);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: deleteUserPayment}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.data.deleteUserPayment));
                    done();
                });
            });

         it('99_3-ZESTY_USER-008 Invalid User ID :Delete User Payment api', function (done) {

          helperUtil.addStep("Request Payload :: "+deleteUserPayment_1);

                                  fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                      method: 'POST',
                                      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                      body: JSON.stringify({query: deleteUserPayment_1}),
                                  }).then(function (res) {

                                      return res.json();

                                  }).then(function (response) {
                                      helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.errors));
                                      done();
                                  });
         });

//LoginUser

        it('99_4-ZESTY_USER-008 Valid User:Login User api', function (done) {

                   helperUtil.addStep("Request Payload :: "+login);

                                           fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                               method: 'POST',
                                               headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                               body: JSON.stringify({query: login}),
                                           }).then(function (res) {

                                               return res.json();

                                           }).then(function (response) {
                                               helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.data));
                                               done();
                                           });
         });

        it('99_5-ZESTY_USER-008 Invalid User:Login User api', function (done) {

                           helperUtil.addStep("Request Payload :: "+login_1);

                                                   fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                                                       method: 'POST',
                                                       headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                                                       body: JSON.stringify({query: login_1}),
                                                   }).then(function (res) {

                                                       return res.json();

                                                   }).then(function (response) {
                                                       helperUtil.addStep("Delete User Payment response is :: " + JSON.stringify(response.data));
                                                       done();
                                                   });
         });

//UpdateDish

        it('99_6-ZESTY_DISHES-010 : Update Dish api', function (done) {

                helperUtil.addStep("New Dish ID is :: "+newDishID);

                updateDish = "mutation { updateDish( dish: { id: \""+ newDishID + "\", chefId : \"" + global.userID + "\",  name : \"Fungee123\", description : \"Something Meaningfull New Dish.\",  cuisines :[\"Chinese\",\"Italian\"],  approxIngredientsCost : 171.83, approxPrepTime : 60, dishTypes : [ GLUTEN_FREE], ingredients : [ \"Red Chillies\", \"Pork\", ], isDraft: false, equipmentNeeded : [ \"Bread machine\", \"Communal oven\", \"Solar cooker\" ], minDinerSize : 19,  media : [ { type : VIDEO, url : \"https://unsplash.com/photos/Gg5-K-mJwuQ\" ,size:SMALL_ROUND_THUMBNAIL ,appType:MOBILE} ] }) }";


                helperUtil.addStep("Request Payload :: "+updateDish);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: updateDish}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
         });

        it('99_7-Valid Dish Exists :  Dish api', function (done) {

                         helperUtil.addStep("New Dish ID is :: "+newDishID);

                         newDishID= global.dishID;
                         dish = "query { dish(id: \""+ newDishID + "\") { id chefId name description media {url type}  dishTypes isDraft ingredients minPrice minDinerSize equipmentNeeded approxIngredientsCost numOfLikes } }";

                         helperUtil.addStep("Request Payload :: "+dish);

                         fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                             body: JSON.stringify({query: dish}),
                         }).then(function (res) {

                             return res.json();

                         }).then(function (response) {
                             helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                             done();
                         });
                     });

//CreatePost

        it('99_8-ZESTY_POST-001 Without isDraft :Create Post api', function (done) {

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

//UpdatePost

        it('99_9-ZESTY_POST-005 Updating Chef In Post :Update Post api', function (done) {

                console.log("Booking ID :: "+postID);

                newPostID = postID;


                updatePost = "mutation { updatePost( post: { chefId:  \"" + global.userID + 123 +  "\", id: \""+ newPostID +"\", title : \"Fungee123\", body : \"Something Meaningfull\",  tags: [ \"Fungee\" , \"Wiener Schnitzel\", \"Bermuda fish chowder\" ], isDraft:false }) }";

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

//SubmitReviews

        it('99_10-ZESTY_REVIEW-001 With All Values :Submit Review api', function (done) {

            helperUtil.addStep("Request Payload :: "+submitReview);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: submitReview}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {

                global.reviewID = response.data.submitReview;

                console.log("Review ID is :: >>>>>>>>>>> New Review ID >>>>>>>>>>"+reviewID);



                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));

                done();
            });
        });

        it('99_11-ZESTY_REVIEW-001 Missing 1 Fields :Submit Review api', function (done) {

                    helperUtil.addStep("Request Payload :: "+submitReview_1);

                    fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                        body: JSON.stringify({query: submitReview_1}),
                    }).then(function (res) {

                        return res.json();

                    }).then(function (response) {

                        global.reviewID = response.data.submitReview;

                        console.log("Review ID is :: >>>>>>>>>>> New Review ID >>>>>>>>>>"+reviewID);



                        helperUtil.addStep("Updated response is :: " + JSON.stringify(response.errors));

                        done();
                    });
         });

//UpdateReview

        it('99_12-ZESTY_REVIEW-007 Invalid Review ID:Update Review api', function (done) {

                newReviewID= global.reviewID;

                helperUtil.addStep("New Dish ID is :: "+newReviewID);

                updateReview = "mutation {updateReview(reviewId: \"" + newReviewID + 123 + "\", ratings: 23)}";

                helperUtil.addStep("Request Payload :: "+updateReview);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: updateReview}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
            });



//createInProgressBooking

    it('99_13-ZESTY_BOOKINGS-002 Create Booking : Create In Progress Booking api', function (done) {

        helperUtil.addStep("Request Payload :: "+createInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: createInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            bookingID = response.data.createInProgressBooking;
            console.log("New Booking ID :: "+bookingID);
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            done();
        });
    });


    it('99_14-ZESTY_BOOKINGS-002 With Incomplete Status : Create In Progress Booking api', function (done) {

            helperUtil.addStep("Request Payload :: "+createInProgressBooking_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: createInProgressBooking_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                bookingID = response.data.createInProgressBooking;
                console.log("New Booking ID :: "+bookingID);
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });


//updateInProgressBooking

    it('99_15-ZESTY_BOOKINGS-003 Updates Done  : Update In Progress Booking api', function (done) {

        console.log("Booking ID :: "+bookingID);

        newBookingID = bookingID;

        updateInProgressBooking = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\",   }) }";

        console.log(">>>>>>>>>>"+updateInProgressBooking);
        helperUtil.addStep("Request Payload :: "+updateInProgressBooking);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateInProgressBooking}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done();
        }).catch(err => {
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done(err);
        });
    });




    it('99_16-ZESTY_BOOKINGS-003 Adding Dishes : Update In Progress Booking api', function (done) {

        console.log("Booking ID :: "+bookingID);

        newBookingID = bookingID;

        updateInProgressBooking_1 = "mutation { updateInProgressBooking(bookingId: \""+ newBookingID +"\", booking: { userId: \"" + global.userID + "\", chefId: \"" + global.userID + "\", cardId: \"" + global.cardID + "\", dishes: [{ dishId: \"" + global.dishID + "\", serves: 4 }]  }) }";

        console.log(">>>>>>>>>>"+updateInProgressBooking);
        helperUtil.addStep("Request Payload :: "+updateInProgressBooking_1);

        fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
            body: JSON.stringify({query: updateInProgressBooking_1}),
        }).then(function (res) {

            return res.json();

        }).then(function (response) {
            helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done();
        }).catch(err => {
            //bookingID = '7a883b97-c078-497c-839d-50bfa8ba3a1f';
            done(err);
        });
    });





//chefDaySchedule


    it('99_17-ZESTY_SCHEDULE-003 When Dates Are NULL :Chef Day Schedule api', function (done) {

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



    it('99_18-ZESTY_SCHEDULE-004 With Slots Defined :Chef Day Schedule api', function (done) {

            helperUtil.addStep("Request Payload :: "+chefDaySchedule_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: chefDaySchedule_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

//chefWeeklySchedule

    it('99_19-ZESTY_SCHEDULE-004 :Chef Weekly Schedule api', function (done) {

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

//reserveChefSlot

    it('99_20-ZESTY_BOOKINGS-001 Invalid User : Reserve Chef Slot api', function (done) {

            helperUtil.addStep("Request Payload :: "+reserveChefSlot_1);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: reserveChefSlot_1}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });

    it('99_21-ZESTY_BOOKINGS-001 Invalid Date Format: Reserve Chef Slot api', function (done) {

            helperUtil.addStep("Request Payload :: "+reserveChefSlot_2);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: reserveChefSlot_2}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });



    it('99_22-ZESTY_BOOKINGS-001 Out of Slot : Reserve Chef Slot api', function (done) {

            helperUtil.addStep("Request Payload :: "+reserveChefSlot_3);

            fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                body: JSON.stringify({query: reserveChefSlot_3}),
            }).then(function (res) {

                return res.json();

            }).then(function (response) {
                helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                done();
            });
        });




     it('99_23-ZESTY_CHEF-003 :Get Chef api', function (done) {

                helperUtil.addStep("Request Payload :: "+getChef);

                fetch(JSONData.AutoTextList[0].BASE_URL + JSONData.AutoTextList[0].REDIRECT_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.authToken},
                    body: JSON.stringify({query: getChef}),
                }).then(function (res) {

                    return res.json();

                }).then(function (response) {
                    helperUtil.addStep("Updated response is :: " + JSON.stringify(response.data));
                    done();
                });
     });


});