var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var subscriber = require('../app/models/subscriber');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});

mongoose.createConnection(config.url);

mongoose.Promise = require('bluebird');


router.post('/bulksave', function(req, res) {
    var thisSubscriberList = req.body;
    var nSubscribers = thisSubscriberList.length;
    var counter = 0;
    
    thisSubscriberList.forEach(function(thisSubscriber, sIndex){
        var thisEmail = '';
        if(thisSubscriber.email){
            thisEmail = thisSubscriber.email;
        }

        console.log("Subcriber is: " + JSON.stringify(thisSubscriber));

        var existingSubscriber = subscriber.findOne({ 'email': thisEmail},function (err, existingSubscriber) {
            if (err) return handleError(err);

            if(existingSubscriber){
                for (var property in thisSubscriber) {
                    existingSubscriber[property] = thisSubscriber[property];
                }
                
                existingSubscriber.save(function(err, existingSubscriber) {
                    if (err) return console.error(err);
                    console.log(existingSubscriber._id + " updated!");
                    counter += 1;
                    if(counter == nSubscribers){
                        res.json('Done');
                    }
                    //res.json('Done');
                });
            }else{
                var this_subscriber = new subscriber({});
                for (var property in thisSubscriber) {
                    this_subscriber[property] = thisSubscriber[property];
                }
                this_subscriber.save(function(err, this_subscriber) {
                if (err) return console.error(err);
                    console.log("Subscriber added with id: " + this_subscriber._id);
                    counter += 1;
                    if(counter == nSubscribers){
                        res.json('Done');
                    }
                });
            }
            
            
        });
        
        
    });
    
    
    
});

//to get all subscribers
router.get('/', function(req, res) {
    subscriber.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular subscriber with _id subscriberId
router.get('/edit/:subscriberId', function(req, res) {
    var subscriberId = req.params.subscriberId;
    console.log(subscriberId);
    subscriber
        .findOne({ '_id': subscriberId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});


module.exports = router;