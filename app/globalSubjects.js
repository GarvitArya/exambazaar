var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var globalSubject = require('../app/models/globalSubject');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a globalSubject
router.post('/save', function(req, res) {
    var thisGlobalSubject = req.body;
    console.log(JSON.stringify(thisGlobalSubject));
    var this_globalSubject = new globalSubject({
        instituteType: thisGlobalSubject.instituteType,
        affiliation: thisGlobalSubject.affiliation,
        name: thisGlobalSubject.name,
        code: thisGlobalSubject.code
    });
    this_globalSubject.save(function(err, this_globalSubject) {
        if (err) return console.error(err);
        res.json(this_globalSubject._id);
    });
    //console.log(thisGlobalSubject._id);
});




//to get all globalSubjects
router.get('/', function(req, res) {
    globalSubject.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular globalSubject with _id globalSubjectId
router.get('/edit/:globalSubjectId', function(req, res) {
    var globalSubjectId = req.params.globalSubjectId;
    console.log("GlobalSubject id is: " + globalSubjectId);
    globalSubject
        .findOne({ '_id': globalSubjectId })
        .deepPopulate('batches _institute subjects subjects._batch subjects._batch.students')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The globalSubject name is: ' + JSON.stringify(globalSubject.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});
module.exports = router;