var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var mediaTag = require('../app/models/mediaTag');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.get('/mediaTypes', function(req, res) {
    mediaTag.distinct("media",function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.post('/bulksave', function(req, res) {
    var mediaTags = req.body;
    console.log(JSON.stringify(mediaTags));
     
    mediaTags.forEach(function(thisMediaTag, index){
        console.log(" Current MediaTag is "+ index + JSON.stringify(thisMediaTag));
        var mediaTagId = thisMediaTag._id;
        var media = thisMediaTag.media;
        var type = thisMediaTag.type;
        var subType = thisMediaTag.subType;
        
        existingMediaTag = mediaTag.findOne({ '_id': mediaTagId},function (err, existingMediaTag) {
            if (err) return handleError(err);

            if(existingMediaTag){
                for (var property in thisMediaTag) {
                    existingMediaTag[property] = thisMediaTag[property];
                }
                console.log("MediaTag is: " + JSON.stringify(existingMediaTag));
                existingMediaTag.save(function(err, existingMediaTag) {
                    if (err) return console.error(err);
                    console.log(existingMediaTag._id + " saved!");

                });
            }else{
                var this_mediaTag = new mediaTag({
                    media: media,
                    type: type,
                    subType: subType
                });
                this_mediaTag.save(function(err, this_mediaTag) {
                    if (err) return console.error(err);
                    console.log("MediaTag saved with id: " + this_mediaTag._id);
                    
                });
            }
        });

        });
    res.json('Done');
});
//to get all mediaTags
router.get('/', function(req, res) {
    mediaTag.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/mediaType/:mediaType', function(req, res) {
    var mediaType = req.params.mediaType;
    var mediaTypeTags = mediaTag.find({ media: mediaType}, function(err, mediaTypeTags) {
    if (!err){ 
        //console.log(docs);
        var distinctTypes = mediaTag.distinct("type",{media: mediaType},function(err, distinctTypes) {
        if (!err){ 
                console.log(distinctTypes);
                var mediaTypeAndTags = {
                    mediaTypeTags: mediaTypeTags,
                    distinctTypes: distinctTypes
                };
                console.log(JSON.stringify(mediaTypeAndTags));
                res.json(mediaTypeAndTags);
        } else {throw err;}
        });
        
    } else {throw err;}
    });
});

//to get a particular mediaTag with _id mediaTagId
router.get('/edit/:mediaTagId', function(req, res) {
    var mediaTagId = req.params.mediaTagId;
    console.log(mediaTagId);
    mediaTag
        .findOne({ '_id': mediaTagId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;