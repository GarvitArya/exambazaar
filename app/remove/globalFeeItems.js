var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var globalFeeItem = require('../app/models/globalFeeItem');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a globalFeeItem
router.post('/save', function(req, res) {
    var thisglobalFeeItem = req.body;
    console.log(JSON.stringify(thisglobalFeeItem));
    var this_globalFeeItem = new globalFeeItem({
        name: thisglobalFeeItem.name,
        type: thisglobalFeeItem.type
    });
    this_globalFeeItem.save(function(err, this_globalFeeItem) {
        if (err) return console.error(err);
        res.json(this_globalFeeItem._id);
    });
    //console.log(thisglobalFeeItem._id);
});




//to get all globalFeeItems
router.get('/', function(req, res) {
    globalFeeItem.find({}, function(err, docs) {
    if (!err){ 
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular globalFeeItem with _id globalFeeItemId
router.get('/edit/:globalFeeItemId', function(req, res) {
    var globalFeeItemId = req.params.globalFeeItemId;
    console.log("globalFeeItem id is: " + globalFeeItemId);
    globalFeeItem
        .findOne({ '_id': globalFeeItemId })
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The globalFeeItem name is: ' + JSON.stringify(globalFeeItem.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
module.exports = router;