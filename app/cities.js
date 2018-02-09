var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var city = require('../app/models/city');
var coaching = require('../app/models/coaching');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

var indiaLatLng = {
    lat: {
        min: 8.09008,
        max: 34.55765,    
    },
    lng: {
        min: 68.82655,
        max: 96.12882,    
    },
};

function checkValidLatLng(lat, lng){
    var valid = true;
    lat = Number(lat);
    lng = Number(lng);
    //console.log(lat + " | " + lng);
    if(lat && lng){
        if(lat > indiaLatLng.lat.max || lat < indiaLatLng.lat.min){
            valid = false;
        }
        if(lng > indiaLatLng.lng.max || lng < indiaLatLng.lng.min){
            valid = false;
        }
    }else{
        valid = false;
    }
    //console.log(valid);
    return valid;
};

router.post('/save', function(req, res) {
    var thisCity = req.body;
    var cityName = thisCity.name;
    var thisLatLng = thisCity.latlng;
    var thisLng = Number(thisLatLng.lng);
    var thisLat = Number(thisLatLng.lat);
    
    var ignoreProperties = ['_id', 'name'];
    
    var existingCity = city.findOne({ 'name': cityName },function (err, existingCity) {
        if(existingCity){
            for (var property in thisCity) {
                if(ignoreProperties.indexOf(property) == -1){
                    existingCity[property] = thisCity[property];    
                } 
            }
            if(checkValidLatLng(thisLat, thisLng)){
                thisCity.loc = {
                    type : 'Point',
                    coordinates : [thisLng, thisLat]
                };
                existingCity.save(function(err, existingCity) {
                    if (err) return console.error(err);
                    //console.log(existingCity._id + " saved!");
                    res.json(true);
                });
            }else{
                console.log('Invalid Lat Lng for: ' + cityName);
                res.json(false);
            }
            
            //console.log("City is: " + JSON.stringify(existingCity));
            
        }else{
           var this_city = new city({
                name : cityName,
            });
            for (var property in thisCity) {
                if(ignoreProperties.indexOf(property) == -1){
                    this_city[property] = thisCity[property];    
                } 
            }
            if(checkValidLatLng(thisLat, thisLng)){
                this_city.loc = {
                    type : 'Point',
                    coordinates : [thisLng, thisLat]
                };
                this_city.save(function(err, this_city) {
                if (err) return console.error(err);
                    //console.log(this_city._id + " saved!");
                    res.json(true);
                }); 
            }else{
                console.log('Invalid Lat Lng for: ' + cityName);
                res.json(false);
            }
            
        }
        
    });
});

router.post('/aroundme', function(req, res) {
    
    var kmsToRadian = function(kms){
        var earthRadiusInKms = 6371;
        return kms / earthRadiusInKms;
    };
    var queryForm = req.body;
    var thisLng = Number(queryForm.latlng.lng);
    var thisLat = Number(queryForm.latlng.lat);
    var kms = Number(queryForm.distanceinKm);
    var limit = 5;
    if(checkValidLatLng(thisLat, thisLng)){
        var coordinates = [thisLng, thisLat];
        console.log(coordinates);
        console.log(kms);
        var query = {
            "loc" : {
                $near: {
                   $geometry: { "type" : "Point", "coordinates" : coordinates },
                   $maxDistance: 500000,
                   $minDistance: 0
                }
            },
            /*"loc" : {
                $geoWithin : {
                    $centerSphere : [coordinates, kmsToRadian(kms)]
                }
            },*/
            active: true,
        };
        var allCities = city
        .find( query, {},function(err, allCities) {
            if (!err){
                res.json(allCities);
            } else {throw err;}
        }).limit(limit);
    }else{
        var allCities = city
        .find( {metro: true}, {},function(err, allCities) {
            if (!err){
                res.json(allCities);
            } else {throw err;}
        }).limit(limit);
    }
});

router.get('/', function(req, res) {
    //console.log('Here');
    city.find({active: true, count: {$gte: 10}}, {name:1, count: 1}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/topcities', function(req, res) {
    var limit = 100;
    city.find({active: true}, {name:1, state: 1, count:1, _id: 0}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }).sort('-count').limit(limit);
});

router.get('/findstates', function(req, res) {
    res.json(true);
    var groupNames = coaching.aggregate(
    [
        {$match: {disabled: false, type: 'Coaching'} },
        {"$group": { "_id": { city: "$city" }, count:{$sum:1}, state: { $addToSet: "$state" } } },
        {$sort:{"count":-1}},
        { $project: { "city": "$_id.city", "state": "$state", "count": "$count", _id: 0}},

    ],function(err, groupNames) {
    if (!err){
        var filterGroupNames = [];
        groupNames.forEach(function(thisCityState, cindex){
            
            var cityName = thisCityState.city;
            var thisCity = city.findOne({name: cityName}, {name: 1, count: 1}, function(err, thisCity) {
            if (!err){
                
                if(thisCity){
                    thisCity.count = thisCityState.count;
                    thisCity.save(function(err, thisCity) {
                        if (err) return console.error(err);
                        //console.log('Saved' + thisCity._id);
                    });
                }else{
                    //console.log('--------- Something went wrong: ' + cityName);
                }
                
            } else {throw err;}
            });
            if(thisCityState.state.length > 1){
                console.log('More than 1 state for: ' + thisCityState.city);
                console.log(thisCityState.state);
            }
            if(thisCityState.state.length == 0){
                console.log('No state for: ' + thisCityState.city);
            }
            if(thisCityState.state.indexOf("") != -1){
                console.log('No state for: ' + thisCityState.city);
            }
            
            if(thisCityState.state.length == 1){
                var thisCity = city.findOne({name: cityName}, {name: 1, count: 1}, function(err, thisCity) {
                if (!err){
                    
                    if(thisCity && thisCityState.state[0] && thisCityState.state[0].trim() != ''){
                        thisCity.state = thisCityState.state[0];
                        thisCity.save(function(err, thisCity) {
                            if (err) return console.error(err);
                            //console.log('Saved' + thisCity._id);
                        });
                    }else{
                        //console.log('--------- Something went wrong: ' + cityName);
                    }

                } else {throw err;}
                });
            }
        });
        //console.log(groupNames);
        
        
        //res.json(groupNames);
    } else {throw err;}
    });
    
    
});
router.get('/all', function(req, res) {
    city.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {throw err;}
    });
});




router.get('/count', function(req, res) {
    city.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


router.get('/edit/:cityId', function(req, res) {
    var cityId = req.params.cityId;
    //console.log("City is " + cityId);
    city
        .findOne({ '_id': cityId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/city/:cityName', function(req, res) {
    var cityName = req.params.cityName;
    city
        .findOne({ 'name': cityName },{})
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});

router.post('/addLogo', function(req, res) {
    var newLogoForm = req.body;
    console.log(newLogoForm);
    var logo = newLogoForm.logo;
    var cityId = newLogoForm.cityId;
    var color = newLogoForm.color;
    //console.log('Express received: ' + JSON.stringify(newLogoForm));
    
    var thisCity = city
        .findOne({ _id: cityId }, {logo:1})
        .exec(function (err, thisCity) {
        if (!err){
            
            if(thisCity && color){
                if(color == 'black'){
                    if(!thisCity.logo){
                        thisCity.logo = {};
                    }
                    thisCity.logo.black = logo;
                    thisCity.save(function(err, thisCity) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisCity._id);
                        res.json(thisCity.logo);
                    });
                }else if(color == 'white'){
                    if(!thisCity.logo){
                        thisCity.logo = {};
                    }
                    thisCity.logo.white = logo;
                    thisCity.save(function(err, thisCity) {
                        if (err) return console.error(err);
                        //console.log("Logo data saved for " + thisCity._id);
                        res.json(thisCity.logo);
                    });
                }else{
                    res.json(false);
                }
                
                
            }else{
                console.log('No such city');
                res.json(false);
            }
        } else {throw err;}
    });
    
});

module.exports = router;