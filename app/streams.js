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
    //console.log("Stream is: " + JSON.stringify(streamName));
    var existingStream = stream.findOne({ 'name': streamName },function (err, existingStream) {
        if(existingStream){
            for (var property in thisStream) {
                existingStream[property] = thisStream[property];
                //console.log(existingExam[property]);
            }
            //console.log("Stream is: " + JSON.stringify(existingStream));
            existingStream.save(function(err, existingStream) {
                if (err) return console.error(err);
                //console.log(existingStream._id + " saved!");
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
    //console.log('Here');
    stream.find({active: {$ne: false}}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/all', function(req, res) {
    stream.find({}, function(err, docs) {
    if (!err){
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
    //console.log("Stream is " + streamId);
    stream
        .findOne({ '_id': streamId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/stream/:streamName', function(req, res) {
    var streamName = req.params.streamName;
    //console.log("Stream is " + streamName);
    stream
        .findOne({ 'name': streamName },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    console.log(newLogoForm);
    var logo = newLogoForm.logo;
    var streamId = newLogoForm.streamId;
    var color = newLogoForm.color;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisStream = stream
        .findOne({ _id: streamId }, {logo:1})
        .exec(function (err, thisStream) {
        if (!err){
            
            if(thisStream && color){
                if(color == 'black'){
                    if(!thisStream.logo){
                        thisStream.logo = {};
                    }
                    thisStream.logo.black = logo;
                    thisStream.save(function(err, thisStream) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisStream._id);
                        res.json(thisStream.logo);
                    });
                }else if(color == 'white'){
                    if(!thisStream.logo){
                        thisStream.logo = {};
                    }
                    thisStream.logo.white = logo;
                    thisStream.save(function(err, thisStream) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisStream._id);
                        res.json(thisStream.logo);
                    });
                }else{
                    res.json(false);
                }
                
                
            }else{
                console.log('No such stream');
                res.json(false);
            }
        } else {throw err;}
    });
    
});

module.exports = router;