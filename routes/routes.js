// Modules
let sqldb = require('../sqldb/db');
let ico_coins = require('../controller/ico/ico_coins')
let pinned_messages = require('../controller/ico/pinned_messages')
let tweets = require('../controller/tweets');
let tweet = require('../controller/new_tweet');
let apitweet = require('../controller/apitweet');
let coins = require('../controller/coins');
let coin = require('../controller/coin');
let uniqueCoins = require('../controller/firebase/uniquecoins');
let firebaseAllCoins  = require('../controller/firebase/allcoins');
let firebaseTweets = require('../controller/firebase/tweets');
let moveTweets =  require('../controller/moveUpdatedTweets');


// API Endpoints
module.exports = function(app) {

   // app.get('/', function(req, res) {
     //   res.sendFile("/root/website/cryptohype.github.io/index.html")
   // });
    app.get('/ico', function(req, res) {
        sqldb.getConnection(function (err, con){
            ico_coins(con, function(data){
                res.send(data);
                con.release()
            })
        })
    })
    app.get('/ico/pinned', function(req ,res) {
        sqldb.getConnection(function (err, con){
            pinned_messages(con, function(data){
                res.send(data);
                con.release()
            })
        })
    })
    // ALL Tweets
    app.get('/tweets', function (req, res) {
        sqldb.getConnection(function  (err,con) {
            tweets(con,function (t) {
 //               t.tweets.reverse();
                res.json(t)
                con.release();
            })
        })
    });
    // Tweet data
    app.get('/tweets/:coin_symbol', function (req,res) {
        sqldb.getConnection(function  (err, con) {
            apitweet(con, req.params.coin_symbol, function (t) {
                t.tweets.reverse();
                res.json(t);
                con.release();
            })
        })

    });
    //All Coins
    app.get('/coins',  function (req, res) {
        sqldb.getConnection(function (err, con){
             coins(con, function (coins) {
                res.json(coins)
                con.release();
            })           
        })

    });
    // Coin data
    app.get('/coins/:coin_symbol', function (req,res) {
        sqldb.getConnection(function (err, con){
            coin(con, req.params.coin_symbol, function (coin) {
                res.json(coin);
                con.release();
            })
        })    
    });
    // Unique Coins from firebase
    app.get('/uniquecoins', function (req, res) {
        uniqueCoins(function (uniquecoins) {
            res.json(uniquecoins);
        })
    });
    // update all coins and uniquecoins tweet to firebase
    app.get('/update' , function (req, res) {
        sqldb.getConnection(function  (err, con) {
            // All coins update to firebase's all coins
            firebaseAllCoins(con);
            // update uniquecoin's tweets to firebase;
            firebaseTweets(con, function (data) {
                // closing database connection
                res.send(data);
                con.release();
            });
        })
    });
    app.get('/move', function (req, res) {
        sqldb.getConnection(function  (err, con) {
            moveTweets(con,function (data) {
                res.send(data);
                con.release();
            })
        });    
    })

   app.get('/blog', function (req, res) {
        	res.redirect('http://localhost:2368');
        });    
    })

};
