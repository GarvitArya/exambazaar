var express = require('express');
var router = express.Router();
var Moment = require('moment');

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var batch = require('../app/models/batch');
var day = require('../app/models/day');
var calendar = require('../app/models/calendar');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get all days
router.get('/', function(req, res) {
    day.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
        //process.exit();
    } else {throw err;}
    });
});
//to get a particular calendar with _id dayId
router.get('/edit/:dayId', function(req, res) {
    var dayId = req.params.dayId;
    console.log("Day id is: " + dayId);
    mongoose.model('day')
        .findOne({ '_id': dayId })
        //.deepPopulate('_institute') 
        .exec(function (err, docs) {
        if (!err){ 
            res.json(docs);
        } else {throw err;}
    });
});

module.exports = router;