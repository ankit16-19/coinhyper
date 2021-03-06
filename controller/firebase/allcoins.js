let db = require('./firebase.js').db();
let coins = require('../latest_coins');

module.exports = function(con) {
    // All coins
    coins(con, function(coins) {
        // Update each coin in firebase
        coins.forEach(coin => {
            console.log('New coin',  ' => ',  coin.coin_name);
            // changing status to 1 for the coins that are updated on firebase
            con.query(`UPDATE coins SET status=1  WHERE coin_name = '${coin.coin_name}'`);

            // update firebase
            db.collection('AllCoins').doc(coin.coin_symbol).set({
                coin_name:coin.coin_name,
                coin_symbol: coin.coin_symbol,
                coinPage: coin.coin_handle,
                lastUpdate: new Date(coin.date),
                lastupdates: coin.date
                }, {
                    merge: true
            });
        });
    })
};
