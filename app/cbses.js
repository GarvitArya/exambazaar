var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var cbse = require('../app/models/cbse');
var coaching = require('../app/models/coaching');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

router.post('/bulksave', function(req, res) {
    var affiliationForm = req.body;
    var affiliationNumbers = affiliationForm.affiliationNumbers;
    var thisuser = affiliationForm._createdBy;
    console.log(affiliationNumbers);
    console.log(thisuser);
    
    if(affiliationNumbers && affiliationNumbers.length > 0){
        
        
        var existingCbses = cbse.find({ 'affilationNo': {$in: affiliationNumbers} },function (err, existingCbses) {
            if(!existingCbses){
                existingCbses = [];
            }else{
                existingCbses = existingCbses.map(function(a) {return a.affilationNo.toString();});
            }
            var nAdded = 0;
            var counter = 0;
            var nAffiliations = affiliationNumbers.length;
            affiliationNumbers.forEach(function(thisAffiliation, aindex){
                var eIndex = existingCbses.indexOf(thisAffiliation.toString());
                console.log(eIndex);
                if(eIndex == -1){
                    var this_cbse = new cbse({
                        affilationNo : thisAffiliation,
                        _createdBy : thisuser,
                    });
                    this_cbse.save(function(err, this_cbse) {
                    if (err) return console.error(err);
                        console.log(this_cbse._id + " saved!");
                        counter += 1;
                        nAdded += 1;
                        if(counter == nAffiliations){
                            res.json(nAdded);
                        }
                        //res.json(true);
                    });
                }else{
                    
                    counter += 1;
                    console.log('Affiliation Number ' + thisAffiliation + ' already exists!');
                    if(counter == nAffiliations){
                        res.json(nAdded);
                    }
                }

            });
        });
        
        
        
    }else{
        res.json(null);
    }
    
});

router.get('/', function(req, res) {
    //console.log('Here');
    cbse.find({active: true, count: {$gte: 10}}, {name:1, count: 1}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

module.exports = router;