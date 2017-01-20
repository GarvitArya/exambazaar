var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var provider = require('../app/models/provider');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to get all providers
router.get('/:city', function(req, res) {
    var city = req.params.city;
    console.log("City is: "+city);
    provider.find({"address" : {$regex : ".*" + city + ".*"}}, {name:1 , address:1, coursesOffered:1, phone:1, website:1, students:1},function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    }); //.limit(500)
});

router.get('/edit/removeDuplicates/:city', function(req, res) {
    var city = req.params.city;
    console.log("City is: "+city);
    var allproviders =  provider.find({"address" : {$regex : ".*" + city + ".*"}}, { address:1},function(err, allproviders) {
    if (!err){
        console.log("There are " + allproviders.length + " providers right now.");
        allproviders.forEach(function(thisprovider, index){
            
            var url = thisprovider.website;
            var address = thisprovider.address;
            console.log("Processing " + index + " " + address);
            //{'website': url}
            var thisproviders = provider.find({'address': address}, { address:1},function(err, thisproviders) {
                if (!err){
                    
                    if(thisproviders.length >2)
                    console.log(thisprovider._id + " " + thisprovider.website + " " + thisproviders.length);
                    thisproviders.forEach(function(removeProvider, providerindex){
                        
                        if(providerindex>0){
                            console.log("About to remove " + removeProvider._id + " " + removeProvider.address );
                            
                            
                            removeProvider.remove(function(err) {
                                if (err) {
                                    res.statusCode = 403;
                                    res.send(err);
                                } else {
                                    console.log("Provider deleted ");
                                    //res.send({});
                                }
                            });
                        }
                    });
                    
                }
            });
        });
        
        
        //console.log(docs);
        res.json("Ok");
    } else {throw err;}
    });
});
module.exports = router;