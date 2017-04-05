var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var group = require('../app/models/group');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular group with _id groupId
router.get('/edit/:groupId', function(req, res) {
    var groupId = req.params.groupId;
    //console.log(groupId);
    group
        .findOne({ '_id': groupId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});
//to get all groups
router.get('/', function(req, res) {
    group.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var groupForm = req.body;
    var institute = groupForm.institute;
    var user = groupForm.user;
    
    var newgroup = new group({
        institute: institute,
        user: user
    });
    newgroup.save(function(err, newgroup) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newgroup._id);
    });
    
    
});

router.get('/mediaType/:mediaType', function(req, res) {
    var mediaType = req.params.mediaType;
    var mediaTypeTags = group.find({ media: mediaType}, function(err, mediaTypeTags) {
    if (!err){ 
        //console.log(docs);
        var distinctTypes = group.distinct("type",{media: mediaType},function(err, distinctTypes) {
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


module.exports = router;