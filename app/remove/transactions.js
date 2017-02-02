var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var institute = require('../app/models/institute');
var teacher = require('../app/models/teacher');
var student = require('../app/models/student');
var transaction = require('../app/models/transaction');
var user = require('../app/models/user');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a transaction
router.post('/save', function(req, res) {
    var thistransaction = req.body;
    var thisInstitute = req.body.institute.data;
                                          
    thisInstitute = institute.findOne({ '_id': thisInstitute._id },function (err, thisInstitute) {
        if (err) return handleError(err);
        var this_transaction = new transaction({
            _institute: thisInstitute,
            _from: { type: Schema.ObjectId, ref: 'student' },
            _to: { type: Schema.ObjectId, ref: 'teacher' },
            name : thistransaction.name,
            type : thistransaction.type,
            description : thistransaction.description,
            amount : thistransaction.amount,
            date: thistransaction.date,
            status: thistransaction.status
        });
        this_transaction.save(function(err, this_transaction) {
            if (err) return console.error(err);
            /*thisInstitute.transactions.push(this_transaction);
            thisInstitute.save(function(err, thisInstitute) {
                if (err) return console.error(err);
            });
            //save reference to institute
            */
            res.json(this_transaction._id);
        });
    });
});

//to get all transactions
router.get('/', function(req, res) {
    transaction.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
//to get a particular transaction with _id transactionId
router.get('/edit/:transactionId', function(req, res) {
    
    var transactionId = req.params.transactionId;
    //var mobile = req.params.mobile;
    //console.log("transaction is " + transactionId);
    transaction
        .findOne({ '_id': transactionId })
        .deepPopulate('_from _to')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
});
module.exports = router;