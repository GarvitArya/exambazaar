var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var contact = require('../app/models/contact');
var mongoose = require('mongoose');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');


//to add an contact
router.post('/save', function(req, res) {
    var thisContact = req.body;
    var contactId = null;
    if(thisContact._id){
       contactId = thisContact._id;
    }
    
    var existingContact = contact.findOne({ '_id': contactId },function (err, existingContact) {
        console.log(existingContact);
        if(existingContact){
            for (var property in thisContact) {
                existingContact[property] = thisContact[property];
            }
            existingContact.save(function(err, existingContact) {
                if (err) return console.error(err);
                res.json(existingContact);
            });
        }else{
            existingContact = new contact({});
            for (var property in thisContact) {
                existingContact[property] = thisContact[property];
            }
            existingContact.save(function(err, existingContact) {
                if (err) return console.error(err);
                res.json(existingContact);
            }); 
        }
    });
});



//to get all contacts
router.get('/', function(req, res) {
    //console.log('Here');
    contact
        .find({ })
        //.deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            //var contactIds = docs.map(function(a) {return a.name;});
            //console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
    
});

router.get('/contact/:contactId', function(req, res) {
    var contactId = req.params.contactId;
    var thisContact = contact
        .findOne({'_id': contactId})
        .deepPopulate('exam')
        .exec(function (err, thisContact) {
        if (!err){
            
            //console.log(thisContact);
            res.json(thisContact);
        } else {throw err;}
    });
    
});

router.get('/remove/:contactId', function(req, res) {
    var contactId = req.params.contactId;
    
    contact.remove({_id: contactId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Contact removed!');
            res.json(true);
        }                              
    });
    
    
});

router.get('/count', function(req, res) {
    contact.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:contactId', function(req, res) {
    var contactId = req.params.contactId;
    //console.log("Contact is " + contactId);
    contact
        .findOne({ '_id': contactId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});


module.exports = router;