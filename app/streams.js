var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var stream = require('../app/models/stream');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a stream
router.post('/save', function(req, res) {
    var thisStream = req.body;
    var streamName = thisStream.name;
    var streamDisplayName = thisStream.displayname;
    console.log("Stream is: " + JSON.stringify(streamName));
    var existingStream = stream.findOne({ 'name': streamName },function (err, existingStream) {
        if(existingStream){
            for (var property in thisStream) {
                existingStream[property] = thisStream[property];
                //console.log(existingExam[property]);
            }
            console.log("Stream is: " + JSON.stringify(existingStream));
            existingStream.save(function(err, existingStream) {
                if (err) return console.error(err);
                console.log(existingStream._id + " saved!");
                res.json('Done');
            });
        }else{
           var this_stream = new stream({
                name : streamName,
                displayname: streamDisplayName
            });
            this_stream.save(function(err, this_stream) {
                if (err) return console.error(err);
                res.json(this_stream._id);
            }); 
        }
        
    });
});

router.get('/', function(req, res) {
    console.log('Here');
    stream.find({}, function(err, docs) {
    if (!err){ 
        console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    stream.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/edit/:streamId', function(req, res) {
    var streamId = req.params.streamId;
    console.log("Stream is " + streamId);
    stream
        .findOne({ '_id': streamId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/stream/:streamName', function(req, res) {
    var streamName = req.params.streamName;
    console.log("Stream is " + streamName);
    stream
        .findOne({ 'name': streamName },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

module.exports = router;