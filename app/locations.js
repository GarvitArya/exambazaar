var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var location = require('../app/models/location');


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');


router.post('/save', function(req, res) {
    var thisLocation = req.body;
    var area = thisLocation.area;
    var city = thisLocation.city;
    console.log("Location is: " + JSON.stringify(thisLocation));
    
    existingLocation = location.findOne({ 'area': area, 'city': city},function (err, existingLocation) {
        if (err) return handleError(err);
        
        if(existingLocation){
            for (var property in thisLocation) {
                existingLocation[property] = thisLocation[property];
            }
            console.log("Location is: " + JSON.stringify(existingLocation));
            existingLocation.save(function(err, existingLocation) {
                if (err) return console.error(err);
                console.log(existingLocation._id + " saved!");
                res.json('Done');
            });
        }else{
            var this_location = new location({
                area: area,
                city: city
            });
            this_location.save(function(err, this_location) {
            if (err) return console.error(err);
                console.log("Location saved with id: " + this_location._id);
                res.json(this_location._id);
            });
        }
    });
});

router.post('/bulksave', function(req, res) {
    var locations = req.body;
    console.log(JSON.stringify(locations));
     locations.forEach(function(thisLocation, index){
        console.log(" Current Location is "+ index + JSON.stringify(thisLocation));
        var area = thisLocation.area;
        var city = thisLocation.city;
        
        existingLocation = location.findOne({ 'area': area, 'city': city},function (err, existingLocation) {
            if (err) return handleError(err);

            if(existingLocation){
                for (var property in thisLocation) {
                    existingLocation[property] = thisLocation[property];
                }
                console.log("Location is: " + JSON.stringify(existingLocation));
                existingLocation.save(function(err, existingLocation) {
                    if (err) return console.error(err);
                    console.log(existingLocation._id + " saved!");

                });
            }else{
                var this_location = new location({
                    area: area,
                    city: city
                });
                this_location.save(function(err, this_location) {
                    if (err) return console.error(err);
                    console.log("Location saved with id: " + this_location._id);
                    
                });
            }
        });

        });
    res.json('Done');
});
//to get all locations
router.get('/', function(req, res) {
    location.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/cities', function(req, res) {
    location.distinct("city",function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

//to get a particular location with _id locationId
router.get('/edit/:locationId', function(req, res) {
    var locationId = req.params.locationId;
    console.log(locationId);
    location
        .findOne({ '_id': locationId })
        .exec(function (err, docs) {
        if (!err){
            console.log(docs);
            res.json(docs);
        } else {throw err;}
    });
});

router.get('/city/:cityName', function(req, res) {
    var cityName = req.params.cityName;
    var allLocations = location
        .find({ 'city': cityName })
        .exec(function (err, allLocations) {
        if (!err){
            console.log(allLocations);
            res.json(allLocations);
        } else {throw err;}
    });
    
});

module.exports = router;