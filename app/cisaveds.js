var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var cisaved = require('../app/models/cisaved');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular cisaved with _id cisavedId
router.get('/edit/:cisavedId', function(req, res) {
    var cisavedId = req.params.cisavedId;
    //console.log(cisavedId);
    cisaved
        .findOne({ '_id': cisavedId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});
//to get all cisaveds
router.get('/', function(req, res) {
    cisaved.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/savedCount', function(req, res) {
    cisaved.distinct( "institute",function(err, docs) {
    if (!err){
        res.json(docs.length);
    } else {throw err;}
    });
});


//to get all cisaveds from a user
router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    cisaved.find({user: userId}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var cisavedForm = req.body;
    var institute = cisavedForm.institute;
    var user = cisavedForm.user;
    
    var newcisaved = new cisaved({
        institute: institute,
        user: user
    });
    newcisaved.save(function(err, newcisaved) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newcisaved._id);
    });
    
    
});

router.get('/mediaType/:mediaType', function(req, res) {
    var mediaType = req.params.mediaType;
    var mediaTypeTags = cisaved.find({ media: mediaType}, function(err, mediaTypeTags) {
    if (!err){ 
        //console.log(docs);
        var distinctTypes = cisaved.distinct("type",{media: mediaType},function(err, distinctTypes) {
        if (!err){ 
                //console.log(distinctTypes);
                var mediaTypeAndTags = {
                    mediaTypeTags: mediaTypeTags,
                    distinctTypes: distinctTypes
                };
                //console.log(JSON.stringify(mediaTypeAndTags));
                res.json(mediaTypeAndTags);
        } else {throw err;}
        });
        
    } else {throw err;}
    });
});

router.get('/mediaTypes', function(req, res) {
    var mediaTypes = cisaved.distinct("media",function(err, mediaTypes) {
    if (!err){
        var mediaMapping =[];
        var counter=  0;
        var nMediaTypes = mediaTypes.length;
        mediaTypes.forEach(function(thisMediaType, index){
            var mediaTypeTags = cisaved.find({ media: thisMediaType}, function(err, mediaTypeTags) {
            if (!err){ 
                //console.log(docs);
                var distinctTypes = cisaved.distinct("type",{media: thisMediaType},function(err, distinctTypes) {
                if (!err){ 
                        //console.log(distinctTypes);
                        var mediaTypeAndTags = {
                            mediaTypeTags: mediaTypeTags,
                            distinctTypes: distinctTypes
                        };
                        //console.log(JSON.stringify(mediaTypeAndTags));
                        var mediaMapElement = {
                            mediaType: thisMediaType,
                            mediaTypeAndTags: mediaTypeAndTags
                        };
                        counter = counter + 1;
                        mediaMapping.push(mediaMapElement);
                        if(counter == nMediaTypes){
                            //console.log(JSON.stringify(mediaMapping));
                            res.json(mediaMapping);
                        }
                        //res.json(mediaTypeAndTags);
                } else {throw err;}
                });

            } else {throw err;}
            });
        
        });
        
        //res.json(mediaTypes);
    } else {throw err;}
    });
});



module.exports = router;