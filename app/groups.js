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


router.post('/bulksave', function(req, res) {
    var groups = req.body;
    //console.log(JSON.stringify(groups));
     
    groups.forEach(function(thisGroup, index){
        //console.log(" Current Group is "+ index + JSON.stringify(thisGroup));
        var groupId = thisGroup._id;
        var groupName = thisGroup.group;
        
        existingGroup = group.findOne({ '_id': groupId},function (err, existingGroup) {
            if (err) return handleError(err);

            if(existingGroup){
                for (var property in thisGroup) {
                    existingGroup[property] = thisGroup[property];
                }
                //console.log("Group is: " + JSON.stringify(existingGroup));
                existingGroup.save(function(err, existingGroup) {
                    if (err) return console.error(err);
                    console.log(existingGroup._id + " saved!");

                });
            }else{
                var this_group = new group({
                    group: groupName,
                });
                this_group.save(function(err, this_group) {
                    if (err) return console.error(err);
                    console.log("Group saved with id: " + this_group._id);
                    
                });
            }
        });

        });
    res.json('Done');
});
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
        //console.log("Group saved with id: " + this_group._id);
        res.json(newgroup._id);
    });
    
    
});




module.exports = router;