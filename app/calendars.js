var express = require('express');
var router = express.Router();
var Moment = require('moment');

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var batch = require('../app/models/batch');
var day = require('../app/models/day');
var calendar = require('../app/models/calendar');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add an Calendar
router.post('/save', function(req, res) {
    var thisCalendar = req.body;
    var calendarId = thisCalendar._id;
    
    this_calendar.save(function(err, this_calendar) {
        if (err) return console.error(err);
        console.log("Institue id: " + this_calendar._id);   
        var this_batch = new batch({
            _calendar: this_calendar._id,
            name: '1A',
            grade: '1',
            section: 'A',
            batchTeacher: 'Sangeeta Srivastava'
        });
        this_batch.save(function(err,this_batch){
            if (err) return console.error(err);
            console.log(this_batch._id);
            this_calendar.batches.push(this_batch);
            this_calendar.save(function(err, this_calendar) {
                if (err) return console.error(err);
            });
        });
        console.log("Saved batch!");
        res.json(this_calendar.id);
    }); 
});

//to get all calendars
router.get('/', function(req, res) {
    calendar.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
        //process.exit();
    } else {throw err;}
    });
});
//to get a particular calendar with _id calendarId
router.get('/edit/:calendarId', function(req, res) {
    var calendarId = req.params.calendarId;
    console.log("Calendar id is: " + calendarId);
    calendar
        .findOne({ '_id': calendarId })
        .deepPopulate('_institute') 
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The calendar name is: ' + JSON.stringify(calendar.batches));
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

module.exports = router;