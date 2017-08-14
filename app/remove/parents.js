var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var student = require('../app/models/student');
var parent = require('../app/models/parent');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');

//to add a parent
router.post('/save', function(req, res) {
    console.log("Input is:" + JSON.stringify(req.body));
    
    var thisParent = req.body;
    var thisStudentId = req.body.studentId;
    console.log("Student id is: " + thisStudentId);
    //console.log("Student is: " + JSON.stringify(thisStudent));
    //console.log("Institute is: " + JSON.stringify(thisInstitute));
    
    thisStudent = student.findOne({ '_id': thisStudentId },function (err, thisStudent) {
        if (err) return handleError(err);
        var this_parent = new parent({
            _student: thisStudent,
            basic: {
                salutation: thisParent.basic.salutation,
                firstName: thisParent.basic.firstName,
                lastName: thisParent.basic.lastName,
                middleName: thisParent.middleName,
                gender: thisParent.basic.gender,
                dob: thisParent.basic.dob,
                role: thisParent.basic.role
            },
            contact: {
                mobile: thisParent.contact.mobile,
                email: thisParent.contact.email
            }
            //,
            //other: {
            //    heq: thisParent.other.heq, 
            //    profession: thisParent.other.profession, 
            //    salary: thisParent.other.salary
            //}
        });
        console.log("Saving parent: " + JSON.stringify(this_parent));
        this_parent.save(function(err, this_parent) {
            if (err) return console.error(err);
            console.log("Saved parent with id: " + this_parent._id);
            
            //save parent in the institute data
            thisStudent.parents.push(this_parent);
            thisStudent.save(function(err, thisStudent) {
                if (err) return console.error(err);
            });
            //save reference to institute
            res.json(this_parent._id);
        });
    });
});

//to get all parents
router.get('/', function(req, res) {
    parent.find({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});

router.get('/invalidParents', function(req, res) {
    var invalidParents = [];
    var invalidParentCount = 0;
    var parents = parent.find({},{_student:1},function (err, parents) {
        if (err) return handleError(err);
        console.log("Parent is: " + JSON.stringify(parents));
        parents.forEach(function(thisParent, parentIndex){
            var studentExists = student.findOne({_id: thisParent._student}, function(err, result) {
                if (err) return console.error(err);

                if (result) {
                    // we have a result
                } else {
                    // no student exists 
                    invalidParentCount++;
                    console.log("Invalid Parent Count is: " + invalidParentCount);
                    console.log(thisParent._id + " "+ thisParent._student);
                    
                    thisParent.remove(function(err) {
                        if (err) {
                            res.statusCode = 403;
                            res.send(err);
                        } else {
                            console.log("Parent deleted");
                            //res.send({});
                        }
                    }); 
                }
        });
        });
    });
    res.send("Done");
});

//to get a particular parent with _id parentId
router.get('/edit/:parentId', function(req, res) {
    var parentId = req.params.parentId;
    //console.log(parentId);
    parent
        .findOne({ '_id': parentId })
        .populate('batchlist') 
        .exec(function (err, docs) {
        if (!err){ 
            //console.log('The parent name is: ' + JSON.stringify(parent.batchlist));
            console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/count', function(req, res) {
    parent.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});
module.exports = router;