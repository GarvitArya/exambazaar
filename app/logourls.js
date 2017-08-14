var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var logourl = require('../app/models/logourl');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get a particular logourl with _id logourlId
router.get('/edit/:logourlId', function(req, res) {
    var logourlId = req.params.logourlId;
    //console.log(logourlId);
    logourl
        .findOne({ '_id': logourlId })
        .exec(function (err, docs) {
        if (!err){
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});
//to get all logourls
router.get('/', function(req, res) {
    logourl.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.post('/save', function(req, res) {
    var logourlForm = req.body;
    var institute = logourlForm.institute;
    var user = logourlForm.user;
    
    var newlogourl = new logourl({
        institute: institute,
        user: user
    });
    newlogourl.save(function(err, newlogourl) {
        if (err) return console.error(err);
        //console.log("MediaTag saved with id: " + this_mediaTag._id);
        res.json(newlogourl._id);
    });
    
    
});



module.exports = router;