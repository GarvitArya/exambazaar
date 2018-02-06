var express = require('express');
var router = express.Router();

var config = require('../config/mydatabase.js');
var exam = require('../app/models/exam');
var stream = require('../app/models/stream');
var test = require('../app/models/test');
var assessment = require('../app/models/assessment');
var question = require('../app/models/question');
var mongoose = require('mongoose');
var PDFDocument = require('pdfkit');

var moment = require('moment');
moment().format();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
mongoose.createConnection(config.url);
mongoose.Promise = require('bluebird');


//to add an test
router.post('/save', function(req, res) {
    var thisTest = req.body;
    if(thisTest._actualdate){
        console.log(thisTest._actualdate);
    }
    var testId = '';
    if(thisTest._id){
       testId = thisTest._id;
    }
    
    var existingTest = test.findOne({ '_id': testId },function (err, existingTest) {
        
        if(existingTest){
            for (var property in thisTest) {
                existingTest[property] = thisTest[property];
            }
            existingTest.save(function(err, existingTest) {
                if (err) return console.error(err);
                res.json(existingTest);
            });
        }else{
            existingTest = new test({});
            for (var property in thisTest) {
                existingTest[property] = thisTest[property];
            }
            existingTest.save(function(err, existingTest) {
                if (err) return console.error(err);
                res.json(existingTest);
            }); 
        }
    });
});

router.post('/suggestTests', function(req, res) {
    var testUserForm = req.body;
    var testId = testUserForm.test.toString();
    var userId = testUserForm.user.toString();
    var limit = 8;
    var finalSuggestedTests = [];
    
    var userTests = assessment.find({ 'user': userId }, {test: 1, user: 1},function (err, userTests) {
        
        var userTestIds = [];
        if(!userTests){
            userTests = [];
        }
        if(userTests.length > 0){
            userTestIds = userTests.map(function(a) {return a.test.toString();});
        }
        var existingTest = test.findOne({ '_id': testId }, {exam: 1},function (err, existingTest) {

            if(existingTest){
                var examId = existingTest.exam.toString();
                var suggestedTests = test.find({ 'exam': examId, simulationactive: true, _id: {$ne: testId} }, {exam: 1, name: 1},function (err, suggestedTests) {
                    if(suggestedTests){
                        suggestedTests.forEach(function(thisTest, index){
                            var thisTestId = thisTest._id.toString();
                            var tIndex = userTestIds.indexOf(thisTestId);
                            if(tIndex == -1){
                                finalSuggestedTests.push(thisTest);
                            }
                            
                        });
                        if(finalSuggestedTests.length > limit){
                            finalSuggestedTests = finalSuggestedTests.slice(0, limit);
                        }
                        
                        //console.log(finalSuggestedTests);
                        res.json(finalSuggestedTests);
                    }else{
                        res.json([]); 
                    }
                });


            }else{
                res.json([]); 
            }
        });
        
        
    });
    
    
});
router.post('/testpdf', function(req, res) {
    var thisTest = req.body;
    var testId = thisTest._id;
    console.log('Starting for test: ' + testId);
    
    var optionArray = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
    
    var existingTest = test.findOne({ '_id': testId },function (err, existingTest) {
        if(existingTest){
            var doc = new PDFDocument({margins : {
                top: 50,
                bottom:50,
                left: 50,
                right: 50
            }});
            doc.registerFont('Cardo', 'views/Cardo-Regular.ttf');
            var title = existingTest.name;
            var content = existingTest.description;
            doc.image('public/images/logo/pdflogo.png', 100, 50);
            doc.font('Cardo').fontSize(12).text(title + ' - brought to you by Exambazaar. Exambazaar is one of the largest education discovery platform in India & provides comprehensive information about entrance exams, colleges, courses and test preparation in India. Find us at https://www.exambazaar.com/', 50, 350, {
                lineBreak: true
            });
            doc.addPage();
            var testQuestions = question
                .find({test: existingTest._id})
                .exec(function (err, testQuestions) {
                if(testQuestions && testQuestions.length > 0){
                    testQuestions.forEach(function(thisQuestion, qIndex){
                        thisQuestion._startnumber = Number(thisQuestion._startnumber);
                        
                        if(thisQuestion._endnumber){
                            thisQuestion._endnumber = Number(thisQuestion._endnumber);
                        }
                    });
                    
                    testQuestions.sort(function(a,b) {return (Number(a._startnumber) > Number(b._startnumber)) ? 1 : ((Number(b._startnumber) > Number(a._startnumber)) ? -1 : 0);} );
                    
                    var nQuestionSets = testQuestions.length;
                    var counter = 0;
                    doc.info['Title'] = title + " brought to you by Exambazaar.com";
                    doc.image('public/images/logo/pdflogo2.png', 50, 20).text('www.exambazaar.com', 50, 40);
                    
                    doc.info['Author'] = 'Exambazaar.com';
                    doc.font('Cardo')
                    .fontSize(24)
                    .text(title, 50, 100); 
                    testQuestions.forEach(function(thisQuestion, qIndex){
                        var startnumber = thisQuestion._startnumber;
                        var endnumber = thisQuestion._endnumber;
                        var contentString = "Q. " + startnumber;
                        if(endnumber && endnumber > startnumber){
                            contentString += " - " + endnumber;
                            contentString = 'Directions for: ' + contentString;
                            doc.moveDown()
                                .fillColor('black')
                                .font('Cardo')
                                .fontSize(14)
                                .text(contentString, {
                                align: 'justify',
                                //indent: 30,
                                //height: 300,
                                ellipsis: true
                            });
                            var contextString = thisQuestion.context;
                            doc.moveDown()
                                .fillColor('blue')
                                .font('Cardo')
                                .fontSize(12)
                                .text(contextString, {
                                align: 'justify',
                                //indent: 30,
                                //height: 300,
                                ellipsis: true
                            });
                            
                            
                            
                        }
                        
                        /*var images = thisQuestion.images;
                        if(images && images.length > 0){
                            images.forEach(function(thisImage, iIndex){
                                console.log(thisImage);
                                doc.moveDown().image(thisImage).text(contentString);

                            });


                        }*/
                        thisQuestion.questions.forEach(function(thisSubQuestion, sIndex){
                            var qno = Number(startnumber) + sIndex;
                            var questionString = 'Q. ' + qno + ' ' + thisSubQuestion.question;
                           
                            doc.moveDown()
                                .fillColor('black')
                                .font('Cardo')
                                .fontSize(12)
                                .text(questionString, {
                                align: 'justify',
                                //indent: 30,
                                //height: 300,
                                ellipsis: true
                            });
                            var sType = thisSubQuestion.type;
                            if(sType == 'mcq'){
                                var options = thisSubQuestion.options;
                                options.forEach(function(thisOption, oIndex){
                                    var oString = optionArray[oIndex] + thisOption.option;
                                    doc.moveDown()
                                        .fillColor('black')
                                        .font('Cardo')
                                        .fontSize(12)
                                        .text(oString, {
                                        align: 'justify',
                                        //indent: 30,
                                        //height: 300,
                                        ellipsis: true
                                    });
                                    
                                });
                                //optionArray
                            }
                            
                        });
                        
                        counter += 1;
                        if(counter == nQuestionSets){
                            doc.pipe(res);
                            doc.end();
                        }
                    });
                }    
                    
                    
            });
            
            
            //var filename = encodeURIComponent(title) + '.pdf';
            
            //res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
            //res.setHeader('Content-type', 'application/pdf');
            
            
            

            /*doc.fontSize(15)
                .fillColor('blue')
                .text('Read Full Article', 100, 100)
                .link(100, 100, 160, 27, link);

            doc.moveDown()
                .fillColor('red')
                .text("Author: "+author_name);*/

            
            
            
        }else{
            res.json(null);
        }
    });
});



router.post('/customMarking', function(req, res) {
    var customMarkingForm = req.body;
    var testId = customMarkingForm.testId;
    var questionIds = customMarkingForm.questionIds;
    var customMarking = customMarkingForm.customMarking;
    
    var existingTest = test.findOne({ '_id': testId },function (err, existingTest) {
        
        if(existingTest){
            
            var testQuestions = question
                .find({test: testId, _id: {$in: questionIds}}, {questions: 1})
                .deepPopulate('questions')
                .exec(function (err, testQuestions) {
                var valid = true;
                
                if(testQuestions && testQuestions.length > 0){
                var nQuestions = 0;
                var counter = 0;

                testQuestions.forEach(function(thisQuestion, qIndex){
                    nQuestions += thisQuestion.questions.length;
                });
                
                
                testQuestions.forEach(function(thisQuestion, qIndex){
                var questionId = thisQuestion._id;
                thisQuestion.questions.forEach(function(subQuestion, sIndex){
                    subQuestion.marking = customMarking;
                    
                    thisQuestion.save(function(err, thisQuestion) {
                        if (err) return console.error(err);

                        console.log(questionId + " saved!");
                        
                        counter += 1;
                        if(counter == nQuestions){
                            res.json(true);
                        }
                    });
                    
                    
                });

                    
                    
                });



                }else{
                    
                    res.json(false);
                }     
            });
            
            
            
        }else{
            res.json(false);
        }
    });
});

//to get all tests
router.get('/', function(req, res) {
    //console.log('Here');
    var allTests = test
        .find({})
        //.deepPopulate('exam')
        .exec(function (err, allTests) {
        if (!err){
            res.json(allTests);
        } else {throw err;}
    });
    
});

router.get('/names', function(req, res) {
    
    test
        .find({simulationactive: true}, {name: 1, exam: 1})
        //.deepPopulate('exam')
        .exec(function (err, docs) {
        if (!err){
            res.json(docs);
        } else {throw err;}
    });
    
});

router.post('/markSimulate', function(req, res) {
    var testIds = req.body;
    var limit = 2000;
    /*var testIds = [
        "599c57b84f2991101b2355ab",
        "599c58474f2991101b2355ad",
        "599c59834f2991101b2355d9",
        "599c62c5085cd914e7fe73d7",
        "599e9a7f262de245f7c82a11",
        "599e9b1f262de245f7c82a12",

    ];*/
    
    res.json(true);
    //_id: {$in: testIds}
    if(testIds && testIds.length > 0){
        console.log('Marking Simulation for some Tests');
        var allTests = test
            .find({_id: {$in: testIds}},{_id: 1, simulate: 1, nQuestions: 1, instructions: 1, duration: 1})
            .limit(limit)
            .exec(function (err, allTests) {
            if (!err){
                var nTests = allTests.length;
                var tCounter = 0;
                var theseTests = allTests.map(function(a) {return a._id.toString();});
                allTests.forEach(function(existingTest, index){
                    var testId = existingTest._id.toString();
                    var solutionKey = [];
                    var testQuestions = question
                    .find({test: testId}, {questions: 1, _startnumber: 1, _endnumber: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    var valid = true;
                    if(!existingTest.simulate){
                        existingTest.simulate = {};
                    }
                    existingTest.simulate.comments = [];
                    var maxScore = 0;    
                    if(testQuestions && testQuestions.length > 0){
                    var nQuestions = 0;    
                    var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});

                    var counter = 0;

                    testQuestions.forEach(function(thisQuestion, qIndex){
                        nQuestions += thisQuestion.questions.length;
                    });


                    testQuestions.forEach(function(thisQuestion, qIndex){
                    var questionId = thisQuestion._id;
                    thisQuestion.questions.forEach(function(subQuestion, sIndex){
                        var subScore = 3;
                        if(subQuestion.marking.correct){
                            subScore = Number(subQuestion.marking.correct);
                        }
                        maxScore += subScore;
                        var qno = Number(thisQuestion._startnumber) + sIndex;
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        if(subQuestion.question.length < 10 ){
                            valid = false;

                            var comment = "Invalid Q No: " + qno;
                            comment += ": as Question length is < 10 characters";
                            existingTest.simulate.comments.push(comment);
                            //console.log(comment);
                        }
                        if(subQuestion.type == 'mcq'){
                            var answerMarked = false;
                            subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption.option.length < 1 ){
                                valid = false;
                                var comment = "Invalid Q No: " + qno;
                                comment += ": as Option length is < 1 character";
                                existingTest.simulate.comments.push(comment);
                                //console.log(comment);
                            }
                            if(thisOption._correct){
                                answerMarked = true;
                            }



                            });
                            if(!answerMarked){
                                valid = false;
                                var comment = "Invalid Q No: " + qno;
                                comment += ": as correct option answer is not marked!";
                                existingTest.simulate.comments.push(comment);
                            }

                        }
                        if(subQuestion.type == 'numerical'){
                            //
                            if(subQuestion.numericalAnswerType == 'Exact'){
                                subQuestion.numericalAnswers.forEach(function(thisAnswer, aIndex){
                                if(thisAnswer.length < 1 ){
                                    valid = false;
                                    var comment = "Invalid Q No: " + qno;
                                    comment += ": as one of the numerical answer of type 'Exact' is blank";
                                    existingTest.simulate.comments.push(comment);
                                    //console.log(comment);

                                }
                                });

                            }
                            if(subQuestion.numericalAnswerType == 'Range'){
                                if(!subQuestion.numericalAnswerRange || (!subQuestion.numericalAnswerRange.min && subQuestion.numericalAnswerRange.min != 0) || (!subQuestion.numericalAnswerRange.max && subQuestion.numericalAnswerRange.max != 0) ){
                                    valid = false;
                                    var comment = "Invalid Q No: " + qno;
                                    comment += ": as either of min/max of the numerical answer of type 'Range' is blank";
                                    existingTest.simulate.comments.push(comment);
                                    //console.log(comment);

                                }else{

                                    /*if(subQuestion.numericalAnswerRange.min.length < 1 || subQuestion.numericalAnswerRange.max.length < 1 ){
                                        valid = false;
                                    }  */ 
                                }
                            }


                        }


                        counter += 1;
                        if(counter == nQuestions){
                            if(valid){

                                if(existingTest.nQuestions && Number(existingTest.nQuestions) == nQuestions){

                                }else{
                                    valid = false;
                                    var comment = "Total number of questions in the test not marked";
                                    existingTest.simulate.comments.push(comment);
                                }
                                //console.log(existingTest._id + " " + existingTest.duration);
                                if(existingTest.duration && existingTest.duration != '' && Number(existingTest.duration) > 0){

                                }else{
                                    valid = false;
                                    var comment = "Test duration has not been manually set!";
                                    existingTest.simulate.comments.push(comment);
                                }
                                if(existingTest.instructions && existingTest.instructions.length >= 5){

                                }else{
                                    valid = false;
                                    var comment = "Test has less than 5 instruction points!";
                                    existingTest.simulate.comments.push(comment);
                                }
                                if(existingTest.simulate.sections && existingTest.simulate.sections.length > 1){
                                    
                                var totalDuration = 0;
                                existingTest.simulate.sections.forEach(function(thisSection, sindex){
                                    if(thisSection.name && thisSection.timedSeparately){
                                        totalDuration += Number(thisSection.time);
                                    }
                                });
                                if(totalDuration == existingTest.duration){
                                    
                                }else{
                                    valid = false;
                                    var comment = "Test has sections timed separately but sum of those durations does not add up to the total duration of the test";
                                    existingTest.simulate.comments.push(comment);
                                }
                                }
                                
                                
                                if(existingTest.simulate.sections && existingTest.simulate.sections.length > 1){
                                    
                                var ordered = existingTest.simulate.sections.map(function(a) {return Number(a.order);});
                                
                                for(var i = 1; i <= existingTest.simulate.sections.length; i++) {
                                    var oIndex = ordered.indexOf(i);
                                    if(oIndex == -1) {
                                        valid = false;
                                        var comment = "Test has missing section at position sequence: " + i;
                                        existingTest.simulate.comments.push(comment);
                                    }
                                }    
                                    
                                if(totalDuration == existingTest.duration){
                                    
                                }else{
                                    valid = false;
                                    var comment = "Test has sections timed separately but sum of those durations does not add up to the total duration of the test";
                                    existingTest.simulate.comments.push(comment);
                                }
                                }
                                
                                
                            }

                            existingTest.simulate.ready = valid;
                            if(valid){
                                console.log('Max Score is: ' + maxScore);
                                existingTest.maxScore = maxScore; 
                            }
                            existingTest.save(function(err, existingTest) {
                                if (err) return console.error(err);
                                console.log(existingTest._id + " saved!");

                                tCounter += 1;
                                if(tCounter == nTests){
                                    console.log("--- All done --- " + nTests + " tests assessed!");
                                }
                            });
                            //console.log("A -- " + testId);


                        }


                    });

                    });



                    }else{

                        valid = false;
                        var comment = "No test questions linked to the test";
                        existingTest.simulate.ready = false;
                        existingTest.simulate.comments.push(comment);
                        existingTest.save(function(err, existingTest) {
                            if (err) return console.error(err);
                            console.log(existingTest._id + " saved!");
                            tCounter += 1;
                            if(tCounter == nTests){
                                console.log("--- All done --- " + nTests + " tests assessed!");
                            }
                        });
                    }     
                });



                });
            } else {throw err;}
        });
        
    }else{
        console.log('Marking Simulation for all Tests');
        var allTests = test
            .find({},{_id: 1, simulate: 1, nQuestions: 1, instructions: 1, duration: 1})
            .limit(limit)
            .exec(function (err, allTests) {
            if (!err){
                var nTests = allTests.length;
                var tCounter = 0;
                var theseTests = allTests.map(function(a) {return a._id.toString();});
                allTests.forEach(function(existingTest, index){
                    var testId = existingTest._id.toString();
                    var solutionKey = [];
                    var testQuestions = question
                    .find({test: testId}, {questions: 1, _startnumber: 1, _endnumber: 1})
                    .deepPopulate('questions')
                    .exec(function (err, testQuestions) {
                    var valid = true;
                    if(!existingTest.simulate){
                        existingTest.simulate = {};
                    }
                    existingTest.simulate.comments = [];
                    var maxScore = 0;    
                    if(testQuestions && testQuestions.length > 0){
                    var nQuestions = 0;    
                    var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});

                    var counter = 0;

                    testQuestions.forEach(function(thisQuestion, qIndex){
                        nQuestions += thisQuestion.questions.length;
                    });


                    testQuestions.forEach(function(thisQuestion, qIndex){
                    var questionId = thisQuestion._id;
                    thisQuestion.questions.forEach(function(subQuestion, sIndex){
                        var subScore = 3;
                        if(subQuestion.marking.correct){
                            subScore = Number(subQuestion.marking.correct);
                        }
                        maxScore += subScore;
                        var qno = Number(thisQuestion._startnumber) + sIndex;
                        var subQuestionId = subQuestion._id;
                        var correctOptionId = null;
                        if(subQuestion.question.length < 10 ){
                            valid = false;

                            var comment = "Invalid Q No: " + qno;
                            comment += ": as Question length is < 10 characters";
                            existingTest.simulate.comments.push(comment);
                            //console.log(comment);
                        }
                        if(subQuestion.type == 'mcq'){
                            var answerMarked = false;
                            subQuestion.options.forEach(function(thisOption, oIndex){
                            if(thisOption.option.length < 1 ){
                                valid = false;
                                var comment = "Invalid Q No: " + qno;
                                comment += ": as Option length is < 1 character";
                                existingTest.simulate.comments.push(comment);
                                //console.log(comment);
                            }
                            if(thisOption._correct){
                                answerMarked = true;
                            }



                            });
                            if(!answerMarked){
                                valid = false;
                                var comment = "Invalid Q No: " + qno;
                                comment += ": as correct option answer is not marked!";
                                existingTest.simulate.comments.push(comment);
                            }

                        }
                        if(subQuestion.type == 'numerical'){
                            //
                            if(subQuestion.numericalAnswerType == 'Exact'){
                                subQuestion.numericalAnswers.forEach(function(thisAnswer, aIndex){
                                if(thisAnswer.length < 1 ){
                                    valid = false;
                                    var comment = "Invalid Q No: " + qno;
                                    comment += ": as one of the numerical answer of type 'Exact' is blank";
                                    existingTest.simulate.comments.push(comment);
                                    //console.log(comment);

                                }
                                });

                            }
                            if(subQuestion.numericalAnswerType == 'Range'){
                                if(!subQuestion.numericalAnswerRange || (!subQuestion.numericalAnswerRange.min && subQuestion.numericalAnswerRange.min != 0) || (!subQuestion.numericalAnswerRange.max && subQuestion.numericalAnswerRange.max != 0) ){
                                    valid = false;
                                    var comment = "Invalid Q No: " + qno;
                                    comment += ": as either of min/max of the numerical answer of type 'Range' is blank";
                                    existingTest.simulate.comments.push(comment);
                                    //console.log(comment);

                                }else{

                                    /*if(subQuestion.numericalAnswerRange.min.length < 1 || subQuestion.numericalAnswerRange.max.length < 1 ){
                                        valid = false;
                                    }  */ 
                                }
                            }


                        }


                        counter += 1;
                        if(counter == nQuestions){
                            if(valid){

                                if(existingTest.nQuestions && Number(existingTest.nQuestions) == nQuestions){

                                }else{
                                    valid = false;
                                    var comment = "Total number of questions in the test not marked";
                                    existingTest.simulate.comments.push(comment);
                                }
                                //console.log(existingTest._id + " " + existingTest.duration);
                                if(existingTest.duration && existingTest.duration != '' && Number(existingTest.duration) > 0){

                                }else{
                                    valid = false;
                                    var comment = "Test duration has not been manually set!";
                                    existingTest.simulate.comments.push(comment);
                                }
                                if(existingTest.instructions && existingTest.instructions.length >= 5){

                                }else{
                                    valid = false;
                                    var comment = "Test has less than 5 instruction points!";
                                    existingTest.simulate.comments.push(comment);
                                }
                            }

                            existingTest.simulate.ready = valid;
                            if(valid){
                                console.log('Max Score is: ' + maxScore);
                                existingTest.maxScore = maxScore; 
                            }
                            existingTest.save(function(err, existingTest) {
                                if (err) return console.error(err);
                                console.log(existingTest._id + " saved!");

                                tCounter += 1;
                                if(tCounter == nTests){
                                    console.log("--- All done --- " + nTests + " tests assessed!");
                                }
                            });
                            //console.log("A -- " + testId);


                        }


                    });

                    });



                    }else{

                        valid = false;
                        var comment = "No test questions linked to the test";
                        existingTest.simulate.ready = false;
                        existingTest.simulate.comments.push(comment);
                        existingTest.save(function(err, existingTest) {
                            if (err) return console.error(err);
                            console.log(existingTest._id + " saved!");
                            tCounter += 1;
                            if(tCounter == nTests){
                                console.log("--- All done --- " + nTests + " tests assessed!");
                            }
                        });
                    }     
                });



                });
            } else {throw err;}
        });
        
    }    
    
});

router.get('/testsWithQuestions', function(req, res) {
    var testSummary = question.aggregate(
    [
        {$match: {} },
        {"$group": { "_id": { test: "$test" }, count:{$sum: {"$size": "$questions"}} } },
        {$sort:{"count":-1}}
    ],function(err, testSummary) {
    if (!err){
        var finalTestSummary = [];
        //console.log(testSummary);
        testSummary.forEach(function(existingTest, index){
            var newItem = {
                _id: existingTest._id.test,
                count: existingTest.count
            };
            finalTestSummary.push(newItem);
        });
        res.json(finalTestSummary);
        
    } else {throw err;}
    });
    
});

router.get('/exam/:examId', function(req, res) {
    var examId = req.params.examId;
    var allTests = test
        .find({exam: examId})
        .exec(function (err, allTests) {
        if (!err){
            res.json(allTests);
        } else {throw err;}
    });
    
});

router.get('/examByName/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName})
        .exec(function (err, thisExam) {
        if (!err){
            //console.log(thisExam);
            var examId = thisExam._id;
            var allTests = test
                .find({exam: examId, watermarked: true})
                .exec(function (err, allTests) {
                if (!err){
                    res.json(allTests);
                } else {throw err;}
            });
        } else {throw err;}
    });
});

router.get('/officialPapersStreamExam', function(req, res) {
    var allTests = test
        .find({official: true, simulationactive: true}, {exam:1})
        .exec(function (err, allTests) {
        if (!err){
            var finalTests = [];
            
            var nTests = allTests.length;
            var counter = 0;
            var examIds = allTests.map(function(a) {return a.exam.toString();});
            
            var allStreams = stream
            .find({active: true}, {})
            .exec(function (err, allStreams) {
                var allExams = exam
                .find({active: true, stream: {$exists: true}}, {name:1, displayname:1, seoname: 1, stream:1, rank: 1})
                .exec(function (err, allExams) {
                    var allExamIds = allExams.map(function(a) {return a._id.toString();});
                    var allStreamIds = allStreams.map(function(a) {return a._id.toString();});
                    allTests.forEach(function(thisTest, tIndex){
                        var examId = thisTest.exam.toString();
                        var streamId = null;
                        var eIndex = allExamIds.indexOf(examId);
                        var thisExam = null;
                        var thisStream = null;
                        var sIndex = -1;
                        if(eIndex != -1){
                        thisExam = allExams[eIndex];
                        streamId = thisExam.stream.toString();
                        var sIndex = allStreamIds.indexOf(streamId);
                        thisStream = allStreams[sIndex];
                        var newTest = {
                            test: thisTest,
                            exam: thisExam,
                            stream: thisStream,
                        };
                        finalTests.push(newTest);
                        counter += 1;
                        if(counter == nTests){
                        var testStreamIds = finalTests.map(function(a) {return a.stream._id.toString();});
                        var testExamIds = finalTests.map(function(a) {return a.exam ._id.toString();});
                        var uniqueStreamIds = [];
                        var uniqueExamIds = [];

                        testStreamIds.forEach(function(thisId, pIndex){
                            if(uniqueStreamIds.indexOf(thisId) == -1){
                                uniqueStreamIds.push(thisId);
                            }
                        });
                        testExamIds.forEach(function(thisId, pIndex){
                            if(uniqueExamIds.indexOf(thisId) == -1){
                                uniqueExamIds.push(thisId);
                            }
                        });
                        /*var streamExamOfficialPapers = {
                            streams: uniqueStreamIds,
                            exams: uniqueExamIds,
                            tests: finalTests
                        };  */
                        var streamExamOfficialPapers = [];    
                        uniqueStreamIds.forEach(function(thisStream, index){
                            var sIndex = allStreamIds.indexOf(thisStream);
                            var thisStream = allStreams[sIndex];
                            var newStream = {
                                _id: thisStream._id,
                                name: thisStream.name,
                                displayname: thisStream.displayname,
                                active: thisStream.active,
                                rank: thisStream.rank,
                                exams: []
                            };
                            streamExamOfficialPapers.push(newStream);
                        });
                        uniqueExamIds.forEach(function(thisExam, index){
                            var eIndex = allExamIds.indexOf(thisExam);
                            var thisExam = allExams[eIndex];
                            var thisStreamId = thisExam.stream.toString();
                            var sIndex = uniqueStreamIds.indexOf(thisStreamId);
                            var newExam = {
                                _id: thisExam._id,
                                name: thisExam.name,
                                displayname: thisExam.displayname,
                                seoname: thisExam.seoname,
                                active: thisExam.active,
                                rank: thisExam.rank,
                                tests: []
                            };
                            streamExamOfficialPapers[sIndex].exams.push(newExam);
                        });  
                        finalTests.forEach(function(thisTest, tIndex){
                            var seopStreamIds = streamExamOfficialPapers.map(function(a) {return a._id.toString();});
                            var streamId = thisTest.stream._id.toString();
                            var examId = thisTest.exam._id.toString();
                            var sIndex = seopStreamIds.indexOf(streamId);
                            var thisStream = streamExamOfficialPapers[sIndex];
                            var seopExamIds = thisStream.exams.map(function(a) {return a._id.toString();});
                            var eIndex = seopExamIds.indexOf(examId);
                            console.log(streamExamOfficialPapers[sIndex].exams[eIndex]);
                            streamExamOfficialPapers[sIndex].exams[eIndex].tests.push(thisTest.test._id);
                        });    
                        //streamExamOfficialPapers
                        console.log(streamExamOfficialPapers);
                        res.json(streamExamOfficialPapers);
                        }
                        }else{
                            counter += 1;
                            console.log('Something went wrong!');
                        }
                    });
                    
                });
                
            });
            
            
        } else {throw err;}
    });
});


router.get('/officialPapers/:examName', function(req, res) {
    var examName = req.params.examName;
    var thisExam = exam
        .findOne({'name': examName})
        .exec(function (err, thisExam) {
        if (!err){
            //console.log(thisExam);
            if(thisExam){
                var examId = thisExam._id;
                var allTests = test
                    .find({exam: examId, official: true, simulationactive: true}, {name: 1, description: 1, duration: 1, simulationactive: 1, year: 1, nQuestions: 1, simulationrank: 1, downloadable: 1, url: 1, _actualdate: 1})
                    .exec(function (err, allTests) {
                    if (!err){
                        res.json(allTests);
                    } else {throw err;}
                });
            }else{
                res.json([]);
            }
            
        } else {throw err;}
    });
});

router.get('/allOfficialPapers', function(req, res) {
    var allTests = test
    .find({official: true, simulationactive: true}, {name: 1, description: 1, duration: 1, simulationactive: 1, year: 1, nQuestions: 1, simulationrank: 1, downloadable: 1, url: 1, _actualdate: 1})
    .exec(function (err, allTests) {
    if (!err){
        res.json(allTests);
    } else {throw err;}
});
});

router.get('/test/:testId', function(req, res) {
    var testId = req.params.testId;
    var thisTest = test
        .findOne({'_id': testId})
        .deepPopulate('exam')
        .exec(function (err, thisTest) {
        if (!err){
            
            //console.log(thisTest);
            res.json(thisTest);
        } else {throw err;}
    });
    
});

router.get('/readTest/:testId', function(req, res) {
    
    var testId = req.params.testId;
    console.log('Reading test: ' + testId);
    var thisTest = test
        .findOne({'_id': testId})
        .exec(function (err, thisTest) {
        if (!err){
            var question = thisTest.url.question;
            if(question){
                console.log(question);
                
            }
            //console.log(thisTest);
            res.json(thisTest);
        } else {throw err;}
    });
    
});

router.get('/answerKey/:testId', function(req, res) {
    
    var testId = req.params.testId;
    
    var solutionKey = [];
    var testQuestions = question
        .find({test: testId}, {questions: 1})
        .deepPopulate('questions')
        .exec(function (err, testQuestions) {
        if(testQuestions){
        var nQuestions = 0;   
        var testQuestionsIds = testQuestions.map(function(a) {return a._id.toString();});

        var counter = 0;

        testQuestions.forEach(function(thisQuesiton, qIndex){
            nQuestions += thisQuesiton.questions.length;
        });
        //console.log(nQuestions);
        testQuestions.forEach(function(thisQuesiton, qIndex){
        var questionId = thisQuesiton._id;
        thisQuesiton.questions.forEach(function(subQuestion, sIndex){
            var subQuestionId = subQuestion._id;
            var correctOptionId = null;
            var correctNumericalAnswers = null;

            if(subQuestion.type == 'mcq'){
                subQuestion.options.forEach(function(thisOption, oIndex){
                    if(thisOption._correct){
                        correctOptionId = thisOption._id;

                        var thisKey = {
                            question: questionId.toString(),
                            subquestion: subQuestionId.toString(),
                            marking: subQuestion.marking,
                            type: subQuestion.type,
                            option: correctOptionId.toString(),
                        };
                        solutionKey.push(thisKey);
                        counter += 1;
                    }


                });
            }

            if(subQuestion.type == 'numerical'){

                if(subQuestion.numericalAnswerType == 'Exact'){
                    correctNumericalAnswers = subQuestion.numericalAnswers;
                    var thisKey = {
                        question: questionId.toString(),
                        subquestion: subQuestionId.toString(),
                        marking: subQuestion.marking,
                        type: subQuestion.type,
                        numericalAnswerType: subQuestion.numericalAnswerType,
                        numericalAnswers: correctNumericalAnswers,
                    };
                    solutionKey.push(thisKey);
                    counter += 1;
                }else if (subQuestion.numericalAnswerType == 'Range'){
                    numericalAnswerRange = subQuestion.numericalAnswerRange;
                    var thisKey = {
                        question: questionId.toString(),
                        subquestion: subQuestionId.toString(),
                        marking: subQuestion.marking,
                        type: subQuestion.type,
                        numericalAnswerType: subQuestion.numericalAnswerType,
                        numericalAnswerRange: numericalAnswerRange,
                    };
                    solutionKey.push(thisKey);
                    counter += 1;
                }

            }

            if(counter == nQuestions){
                console.log(solutionKey);
                res.json(solutionKey);
            }
        });

        });

        }else{
            res.json(null);
        }
    });
    
    
    
    
});

router.get('/remove/:testId', function(req, res) {
    var testId = req.params.testId;
    
    test.remove({_id: testId}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Test removed!');
            res.json(true);
        }                              
    });
    
    
});

router.get('/count', function(req, res) {
    test.count({}, function(err, docs) {
    if (!err){ 
        //console.log(docs);
        res.json(docs);
    } else {throw err;}
    });
});


//to get a particular user with _id userId
router.get('/edit/:testId', function(req, res) {
    var testId = req.params.testId;
    //console.log("Test is " + testId);
    test
        .findOne({ '_id': testId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/testExam/:testId', function(req, res) {
    var testId = req.params.testId;
    var thisTest = test
        .findOne({ '_id': testId },{exam: 1})
        .exec(function (err, thisTest) {
        if (!err){
            var examId = thisTest.exam.toString();
            
            var thisExam = exam
            .findOne({ '_id': examId, active: true },{name: 1, displayname:1, seoname: 1})
            .exec(function (err, thisExam) {
            if (!err){
                if(thisExam && thisExam.seoname){
                    res.json(thisExam);
                }else{
                    res.json(null);
                }
            }
            });
            
            //process.exit();
        } else {throw err;}
    });
});

router.get('/k21', function(req, res) {
    var testId = '5a17f5f617cb4c07c5dd7f5b';
    //console.log("Test is " + testId);
    test
        .findOne({ '_id': testId },{})
        //.deepPopulate('_master.contact')
        .exec(function (err, docs) {
        if (!err){ 
            //console.log(docs);
            res.json(docs);
            //process.exit();
        } else {throw err;}
    });
});

router.get('/markWatermarked', function(req, res) {
    var urls = [
        "https://exambazaar.s3.amazonaws.com/000aa6a56685e95fcb0facde7ce98323.pdf",
"https://exambazaar.s3.amazonaws.com/00792bf4114935f656585b938d220c16.pdf",
"https://exambazaar.s3.amazonaws.com/00bbc69060509c5a12ac76572c17a168.pdf",
"https://exambazaar.s3.amazonaws.com/01a16dfcb12bb24ea146e77740d9a2e2.pdf",
"https://exambazaar.s3.amazonaws.com/01dc1f16707dbf01bc60b67f5ac4daea.pdf",
"https://exambazaar.s3.amazonaws.com/01eed5534a9cb2978f312697d4d68760.pdf",
"https://exambazaar.s3.amazonaws.com/01fd0f8f77bfaf57e01d1fb336926f53.pdf",
"https://exambazaar.s3.amazonaws.com/020f0c47e6f430a8931e7ddc26950c1e.pdf",
"https://exambazaar.s3.amazonaws.com/03639453b88b786fca82ed9a9c5405fa.pdf",
"https://exambazaar.s3.amazonaws.com/0380967ff4a6203e95d8d49b37a08302.pdf",
"https://exambazaar.s3.amazonaws.com/045112af28f18882fde83822f60e8a14.pdf",
"https://exambazaar.s3.amazonaws.com/04d8d87d24a33b749ef0c52fbe8c26a7.pdf",
"https://exambazaar.s3.amazonaws.com/04de54fdb231f09c11ec51c5d980e0af.pdf",
"https://exambazaar.s3.amazonaws.com/052a3ab96fe3474a9feb7ccea7ec6cd7.pdf",
"https://exambazaar.s3.amazonaws.com/058cfcb2e8f99df6707d663d37013f2d.pdf",
"https://exambazaar.s3.amazonaws.com/05aac78b89eda0c5deacf665eb71cd70.pdf",
"https://exambazaar.s3.amazonaws.com/05de3935907f28cf7665fa873358fc09.pdf",
"https://exambazaar.s3.amazonaws.com/05f00e900a31d60e48b976da48f77ea2.pdf",
"https://exambazaar.s3.amazonaws.com/060df883b7be9e4af48e05f54f586702.pdf",
"https://exambazaar.s3.amazonaws.com/064451d0db75765676eae922457fb2bd.pdf",
"https://exambazaar.s3.amazonaws.com/0658354000d3b22dd661ef53fa296a38.pdf",
"https://exambazaar.s3.amazonaws.com/070eb23bca48af3268b80e741251b125.pdf",
"https://exambazaar.s3.amazonaws.com/074c82bd6d13a09d08136fba8723a84b.pdf",
"https://exambazaar.s3.amazonaws.com/07fc76236bdc97fda17bfb298ffdc1b8.pdf",
"https://exambazaar.s3.amazonaws.com/0881c3c1253e184169a89953dbee8f59.pdf",
"https://exambazaar.s3.amazonaws.com/088357a6a242b664e48c93d1bd80eb01.pdf",
"https://exambazaar.s3.amazonaws.com/0942c108fdf44c004cf654899af3a801.pdf",
"https://exambazaar.s3.amazonaws.com/09d8b2631eaf4f8f1659eb2a5afac9ee.pdf",
"https://exambazaar.s3.amazonaws.com/0a15873d591f3f1b00d9026bf0e08b80.pdf",
"https://exambazaar.s3.amazonaws.com/0a367ccbd0b63d061cb7a5c0cd6d48c2.pdf",
"https://exambazaar.s3.amazonaws.com/0a509b4ee3cc97e8c2afabf9ce77cda0.pdf",
"https://exambazaar.s3.amazonaws.com/0b41638afc47e27834e6070dc7ad5eaf.pdf",
"https://exambazaar.s3.amazonaws.com/0bf142269933a4c54ce658648248bd94.pdf",
"https://exambazaar.s3.amazonaws.com/0c02b8615901902bf8b37d37e25d5729.pdf",
"https://exambazaar.s3.amazonaws.com/0ce03bd617301c7f37e238e98eb8f08b.pdf",
"https://exambazaar.s3.amazonaws.com/0d12c80196e16e6d0e64a9d411fda04b.pdf",
"https://exambazaar.s3.amazonaws.com/0d56586cfafe9b37d2be142b4d5caaf7.pdf",
"https://exambazaar.s3.amazonaws.com/0d9cb64c9b3c846ccf5fdab52227a541.pdf",
"https://exambazaar.s3.amazonaws.com/0dfc3b4777241a4f952b9501886c9a84.pdf",
"https://exambazaar.s3.amazonaws.com/0e661d6de605ef94185296648af3dc17.pdf",
"https://exambazaar.s3.amazonaws.com/0ebcaf82c7b9146f61ddfa0d482951c3.pdf",
"https://exambazaar.s3.amazonaws.com/0f0ae88c4950b01b17be2942bbda2407.pdf",
"https://exambazaar.s3.amazonaws.com/102c8287aaf5241cb158822492f58813.pdf",
"https://exambazaar.s3.amazonaws.com/1045f6da63507bc390e15361ced836a9.pdf",
"https://exambazaar.s3.amazonaws.com/1054f229fbe21c5b18561daf703b5014.pdf",
"https://exambazaar.s3.amazonaws.com/109b2e79de16d303b6e5050d1406756c.pdf",
"https://exambazaar.s3.amazonaws.com/112759ec0e8a4dc44d1855ab47c9144c.pdf",
"https://exambazaar.s3.amazonaws.com/11350d03bafe9a5dd48fb520bb1527b2.pdf",
"https://exambazaar.s3.amazonaws.com/114288650c43e4ebca225521f2c2587e.pdf",
"https://exambazaar.s3.amazonaws.com/120b5119c36b5b2e6f88a675a2ba3038.pdf",
"https://exambazaar.s3.amazonaws.com/121c5242238954555f0c6c47329ee2bb.pdf",
"https://exambazaar.s3.amazonaws.com/12fe8dc0973f4c63384f51cdf2dfe178.pdf",
"https://exambazaar.s3.amazonaws.com/1354b8b321f5275d4b65e7f0f7e03da0.pdf",
"https://exambazaar.s3.amazonaws.com/138a7603506438bac8b474e26a0b562c.pdf",
"https://exambazaar.s3.amazonaws.com/13964d565f88ed435a05757a5ea17e6b.pdf",
"https://exambazaar.s3.amazonaws.com/139d319db570d07e14e094ebd2c01fb9.pdf",
"https://exambazaar.s3.amazonaws.com/13b36c8e340adf217754d5f276526477.pdf",
"https://exambazaar.s3.amazonaws.com/1425f2c841886576931d75a41fa66272.pdf",
"https://exambazaar.s3.amazonaws.com/14701fe0e3b3da6cfcee5caf6381851b.pdf",
"https://exambazaar.s3.amazonaws.com/1555ee3544feea92d61366f9e2def678.pdf",
"https://exambazaar.s3.amazonaws.com/162c5bd8a4eef93cc6526c308af3bca1.pdf",
"https://exambazaar.s3.amazonaws.com/162f9db7d681a944794e860d6a3fc9ec.pdf",
"https://exambazaar.s3.amazonaws.com/16e18cbbeca1d8e7063b1ea3c78a8c57.pdf",
"https://exambazaar.s3.amazonaws.com/171ee3e7c82a895a80edca19e91dd50e.pdf",
"https://exambazaar.s3.amazonaws.com/1729d819cdd1233d056d989cff1be90e.pdf",
"https://exambazaar.s3.amazonaws.com/172c1223e430372b817432ac01ca3378.pdf",
"https://exambazaar.s3.amazonaws.com/17465c42790379eca98c795f18bce358.pdf",
"https://exambazaar.s3.amazonaws.com/175003b990fb5ef644535ca4ff3a268a.pdf",
"https://exambazaar.s3.amazonaws.com/17ed1b89f1f0a9503042f0e755e5fed0.pdf",
"https://exambazaar.s3.amazonaws.com/1825d90ba3ae4474098b6a31a9afa846.pdf",
"https://exambazaar.s3.amazonaws.com/18c12d10c68f9ba3b1f455ff8a8270c6.pdf",
"https://exambazaar.s3.amazonaws.com/18f03f639b4ee226e186f5ee1ca05059.pdf",
"https://exambazaar.s3.amazonaws.com/18f37445218acf5b1720ee2b169eab91.pdf",
"https://exambazaar.s3.amazonaws.com/19395cdf74ec0a312a2106e7ac1f1927.pdf",
"https://exambazaar.s3.amazonaws.com/195570aac81d4b786aaa99467f4c7ad6.pdf",
"https://exambazaar.s3.amazonaws.com/19607c2aeb8d567c3cae219e436b56d2.pdf",
"https://exambazaar.s3.amazonaws.com/19ddf0811a884d473cfdefe04aa3e04b.pdf",
"https://exambazaar.s3.amazonaws.com/1a64a2e4a013246d9ddddb0c80293a4f.pdf",
"https://exambazaar.s3.amazonaws.com/1a820b849a07b65ae5646d936c528d5c.pdf",
"https://exambazaar.s3.amazonaws.com/1bd47bd5b01d27c22f95868abb7b42cb.pdf",
"https://exambazaar.s3.amazonaws.com/1c0267351cbc39a0ca84cc3954b6ced7.pdf",
"https://exambazaar.s3.amazonaws.com/1c32e0ba0c4737a2b032cb37b08e9669.pdf",
"https://exambazaar.s3.amazonaws.com/1c6689dd033096f24d468fc8f11fe468.pdf",
"https://exambazaar.s3.amazonaws.com/1d29d65017e847a63759a376e2cb18e9.pdf",
"https://exambazaar.s3.amazonaws.com/1dce7afd51c2087a818965a1fee1ebd3.pdf",
"https://exambazaar.s3.amazonaws.com/1e58bddeb86c80b776a3af3786ecb871.pdf",
"https://exambazaar.s3.amazonaws.com/1ed764c592013aec5d6fd8d5c7ccbd60.pdf",
"https://exambazaar.s3.amazonaws.com/1edee8d6ec4ad8da04f12f7f27bbfa50.pdf",
"https://exambazaar.s3.amazonaws.com/1f06f2059d8f13daf1ead176b06583d1.pdf",
"https://exambazaar.s3.amazonaws.com/1fed2fd15fccfd5b1e9eff8ff5a264f2.pdf",
"https://exambazaar.s3.amazonaws.com/2018d4252a2805ea82e99a13d7ca755a.pdf",
"https://exambazaar.s3.amazonaws.com/217dd66d910d3c68dd10d86758e3c741.pdf",
"https://exambazaar.s3.amazonaws.com/21cc43f58af8cef90c21a19c07fa09fa.pdf",
"https://exambazaar.s3.amazonaws.com/2226225dd73f3945fdab7326b7cd30e1.pdf",
"https://exambazaar.s3.amazonaws.com/2276351348ceeee060ad7c13e70faee6.pdf",
"https://exambazaar.s3.amazonaws.com/228858167c20e9150c175cb9adb7fbdb.pdf",
"https://exambazaar.s3.amazonaws.com/22e1ed354b60de613274c80c8361bc4c.pdf",
"https://exambazaar.s3.amazonaws.com/2318f37f950236196b5fe6b3d1071707.pdf",
"https://exambazaar.s3.amazonaws.com/23ddd62809051bf350ec1dc35cc17b57.pdf",
"https://exambazaar.s3.amazonaws.com/23dfcfb2766ca9cdb9c5ce9deba2bb09.pdf",
"https://exambazaar.s3.amazonaws.com/23f2c774920f9b33202496f0dc6075c0.pdf",
"https://exambazaar.s3.amazonaws.com/24692cbb86d54b1b61ae9255e469fab4.pdf",
"https://exambazaar.s3.amazonaws.com/24e8bfa583b2f4524e2fc351d1d63d37.pdf",
"https://exambazaar.s3.amazonaws.com/250dae2debc5eca5ed9a6c64e4180b37.pdf",
"https://exambazaar.s3.amazonaws.com/25923342f2e6b6dba46c90327a63814c.pdf",
"https://exambazaar.s3.amazonaws.com/25e3c18cb5fa7d81567343c3e974a929.pdf",
"https://exambazaar.s3.amazonaws.com/262136c4d0ae2f8cc3a14a67603ccc08.pdf",
"https://exambazaar.s3.amazonaws.com/263cef72fcdf53ed14790da554faabfa.pdf",
"https://exambazaar.s3.amazonaws.com/2665ad47a2a2b9f8eb806e158f10c893.pdf",
"https://exambazaar.s3.amazonaws.com/2670f528e836bfe3157027d4f5a0bc95.pdf",
"https://exambazaar.s3.amazonaws.com/26a119190f9c8b1d7a83d069b3ee2515.pdf",
"https://exambazaar.s3.amazonaws.com/2765be8624170b729281c7b12667c130.pdf",
"https://exambazaar.s3.amazonaws.com/2887bb0272d41665d36d087e073d6be1.pdf",
"https://exambazaar.s3.amazonaws.com/28bb3d818425de44044a0b28e9620f47.pdf",
"https://exambazaar.s3.amazonaws.com/2960ccb27783aec1165155b58867e334.pdf",
"https://exambazaar.s3.amazonaws.com/297412951da249da9562f93df847ca4b.pdf",
"https://exambazaar.s3.amazonaws.com/299d3382e6db1820bc6776530cb93670.pdf",
"https://exambazaar.s3.amazonaws.com/29a647cffdd3011924bf2f7633730f2a.pdf",
"https://exambazaar.s3.amazonaws.com/29ad9cf4d5ded2512670a3cde648f0d2.pdf",
"https://exambazaar.s3.amazonaws.com/29c737a5558631d51f0eb538c93d2c84.pdf",
"https://exambazaar.s3.amazonaws.com/2a4bfb7b92b962b02f04cabeca0779f7.pdf",
"https://exambazaar.s3.amazonaws.com/2a920231eb255552976cca955a1c61bf.pdf",
"https://exambazaar.s3.amazonaws.com/2a962cf258507f6567630c7cdfa8c74f.pdf",
"https://exambazaar.s3.amazonaws.com/2ac2cbe82e7f864be1b12236c6d525ee.pdf",
"https://exambazaar.s3.amazonaws.com/2ae9cb355cd3af8b61b7e75cf482e320.pdf",
"https://exambazaar.s3.amazonaws.com/2bbc5f928a5650be31d78aa7f216d6e6.pdf",
"https://exambazaar.s3.amazonaws.com/2bf4aba7b1812071f7d4b8ec38c0f20a.pdf",
"https://exambazaar.s3.amazonaws.com/2c1f87b1c490281321c0e1e29795af95.pdf",
"https://exambazaar.s3.amazonaws.com/2c297c7c6373ba9ff396dd31b71453f7.pdf",
"https://exambazaar.s3.amazonaws.com/2c3b7f753362eb69368da32a28584edb.pdf",
"https://exambazaar.s3.amazonaws.com/2c42421b7c557c45f76e0965e64a8298.pdf",
"https://exambazaar.s3.amazonaws.com/2c469ce45c7844369fdecc976b8a64ab.pdf",
"https://exambazaar.s3.amazonaws.com/2cd2c59035f70ba672e423c41980e865.pdf",
"https://exambazaar.s3.amazonaws.com/2cdbf078169cfe1926d8b209385ad73a.pdf",
"https://exambazaar.s3.amazonaws.com/2d0ad288078690e204ef964812327f78.pdf",
"https://exambazaar.s3.amazonaws.com/2d1a0958b6e3e68779a88c7ca9e95b7f.pdf",
"https://exambazaar.s3.amazonaws.com/2d662c939ae4f61515bfd45842454f94.pdf",
"https://exambazaar.s3.amazonaws.com/2e38bc480c164c1c0ad983c574e915e3.pdf",
"https://exambazaar.s3.amazonaws.com/2e7f3ea62e5c9226edef986fbd0bcaf3.pdf",
"https://exambazaar.s3.amazonaws.com/2ea83904e1699d7ef241c5c72fffb81a.pdf",
"https://exambazaar.s3.amazonaws.com/2f282bd5462754d2ab29494892381281.pdf",
"https://exambazaar.s3.amazonaws.com/2f39bd34717baee213494cc574dfd609.pdf",
"https://exambazaar.s3.amazonaws.com/2f650cf0d6a71bebb23f4188f7422f27.pdf",
"https://exambazaar.s3.amazonaws.com/2f70ce9c1e2fb2f79887fce804ed1302.pdf",
"https://exambazaar.s3.amazonaws.com/2fd3d404899907f30dcb3281c82e1a86.pdf",
"https://exambazaar.s3.amazonaws.com/2fe8908f8c21b05cc7a750ffd91fc05f.pdf",
"https://exambazaar.s3.amazonaws.com/2ff59e8c5cc9a2b540cf380b71e58503.pdf",
"https://exambazaar.s3.amazonaws.com/30e122bc22b7ebe790d485e1213a940d.pdf",
"https://exambazaar.s3.amazonaws.com/317279da54a78496b41968a068bd700f.pdf",
"https://exambazaar.s3.amazonaws.com/319354846ae07eb7b987c2c921cb1f86.pdf",
"https://exambazaar.s3.amazonaws.com/31a09a42722ce19b2d10eb638b762b95.pdf",
"https://exambazaar.s3.amazonaws.com/31a45d4585c9d321516f8ae838a40499.pdf",
"https://exambazaar.s3.amazonaws.com/31defbb4aa7efc37b905b94e38b8ad33.pdf",
"https://exambazaar.s3.amazonaws.com/32116f651bca5b6391436cf644726b65.pdf",
"https://exambazaar.s3.amazonaws.com/326aaa0546d411ea421052cd6f07b9ec.pdf",
"https://exambazaar.s3.amazonaws.com/327f1ad04ddbc0ad24ecca165befa9bb.pdf",
"https://exambazaar.s3.amazonaws.com/32d1855521017d864607a75b093e889c.pdf",
"https://exambazaar.s3.amazonaws.com/334103272a430c5ef9a0493b95d3dc11.pdf",
"https://exambazaar.s3.amazonaws.com/3365096f950a0f53d97dbf7394b048d9.pdf",
"https://exambazaar.s3.amazonaws.com/345005bb004a6f353c8794953fdecf72.pdf",
"https://exambazaar.s3.amazonaws.com/356e82f3b038758390cf30126d91c60a.pdf",
"https://exambazaar.s3.amazonaws.com/35c0b4606d11840d7901b9f1bcce8e6e.pdf",
"https://exambazaar.s3.amazonaws.com/365ff3ee074ab25d67ac2673c15d0f94.pdf",
"https://exambazaar.s3.amazonaws.com/374a8b5729615a070d3e31c505db9e84.pdf",
"https://exambazaar.s3.amazonaws.com/375780ce7d2ccc9cc092280442db550b.pdf",
"https://exambazaar.s3.amazonaws.com/378fc4954d8543887f5f98bf01659898.pdf",
"https://exambazaar.s3.amazonaws.com/37b805d3bc68de60ea8568e60d7f8fd1.pdf",
"https://exambazaar.s3.amazonaws.com/37dc8076671259a07f25073b9a8ee20d.pdf",
"https://exambazaar.s3.amazonaws.com/37eef1570ee2a0c1255c2fd96e6334a7.pdf",
"https://exambazaar.s3.amazonaws.com/37f77063c5a897e06c1dce932c297317.pdf",
"https://exambazaar.s3.amazonaws.com/386c3c1f68833775b2638745626a7ae4.pdf",
"https://exambazaar.s3.amazonaws.com/3899775e673f631e7141a806813e6f5b.pdf",
"https://exambazaar.s3.amazonaws.com/38de6816a6b3e2913f0a7be6afcf3975.pdf",
"https://exambazaar.s3.amazonaws.com/390666d4d6e22f626e46b907f3e587d3.pdf",
"https://exambazaar.s3.amazonaws.com/39123e71c3e4c9b1634c9dd7d07ed9b3.pdf",
"https://exambazaar.s3.amazonaws.com/39382ec09fb9f739a444ea446c47036a.pdf",
"https://exambazaar.s3.amazonaws.com/39514262c7b02fc51f6c375e6c6be311.pdf",
"https://exambazaar.s3.amazonaws.com/3a07ec16476a49ebdbf4d203719147aa.pdf",
"https://exambazaar.s3.amazonaws.com/3a4f38ce942a99af4113e53cb8ae4ba8.pdf",
"https://exambazaar.s3.amazonaws.com/3b65bdc59234c060c2a4f3984b50bcf3.pdf",
"https://exambazaar.s3.amazonaws.com/3bafed749737b24402f5271d2307c2a1.pdf",
"https://exambazaar.s3.amazonaws.com/3bf83be3ab01cdd2b933c93f0723c6c3.pdf",
"https://exambazaar.s3.amazonaws.com/3c3f79426c7b4f491ea4b3b04c7ef114.pdf",
"https://exambazaar.s3.amazonaws.com/3cbf3626f6be5664542ff18691abaab3.pdf",
"https://exambazaar.s3.amazonaws.com/3cf980021625da459ef2919362b3777b.pdf",
"https://exambazaar.s3.amazonaws.com/3d28baf5d706394e13c31a88b5b1d67e.pdf",
"https://exambazaar.s3.amazonaws.com/3d31fe5d1d56a75f52d7d50322182211.pdf",
"https://exambazaar.s3.amazonaws.com/3d5ede69e1b54d15edd53b6998c79d30.pdf",
"https://exambazaar.s3.amazonaws.com/3d7f83d21b0f34c9f3dd314e8aec49ea.pdf",
"https://exambazaar.s3.amazonaws.com/3dca4fcc76b5fe494ef1651f3fbe6bfd.pdf",
"https://exambazaar.s3.amazonaws.com/3e3701585d283b46618a14bae2704a23.pdf",
"https://exambazaar.s3.amazonaws.com/3e4e98174a4557e041b505810db96d9b.pdf",
"https://exambazaar.s3.amazonaws.com/3e5f41bd9e91e17158d7938f87960aae.pdf",
"https://exambazaar.s3.amazonaws.com/3e7f7bbb128abea2c28aa6e4cc8dbd8e.pdf",
"https://exambazaar.s3.amazonaws.com/3ed0b1a0df3af5d65e478fa488e3c4b3.pdf",
"https://exambazaar.s3.amazonaws.com/3ee310ca1d5d42c4ef8d1d27c48a0473.pdf",
"https://exambazaar.s3.amazonaws.com/3f0c40a42b351ec31dad0638ca9717b4.pdf",
"https://exambazaar.s3.amazonaws.com/3f1d6787924a916a55127c5445cc3962.pdf",
"https://exambazaar.s3.amazonaws.com/3f7d2239bed96dfb5c06f13a8e02ef69.pdf",
"https://exambazaar.s3.amazonaws.com/3fe2c92c9dde6d985fe292c4936f56e2.pdf",
"https://exambazaar.s3.amazonaws.com/40258e58e7514886b23cbf32ee3fda03.pdf",
"https://exambazaar.s3.amazonaws.com/404824e7e657b74c040788d4ace8b253.pdf",
"https://exambazaar.s3.amazonaws.com/4096f01df57994e2e520ba9bbc8d764e.pdf",
"https://exambazaar.s3.amazonaws.com/41bc99fdef7abf07c8c8e4c5692427b3.pdf",
"https://exambazaar.s3.amazonaws.com/41fa9915eb8850ce12841910ba857c33.pdf",
"https://exambazaar.s3.amazonaws.com/42210c3b37c6b6272df8ef2659e28b39.pdf",
"https://exambazaar.s3.amazonaws.com/42469c092f9e7f3c9569b0ddebe8e5fc.pdf",
"https://exambazaar.s3.amazonaws.com/4253b2b08a4024a516b0d73432c95338.pdf",
"https://exambazaar.s3.amazonaws.com/42ea485fbc7128daf4a2c07b80616a22.pdf",
"https://exambazaar.s3.amazonaws.com/42ebd8277c9b4d18276025ca7897fce9.pdf",
"https://exambazaar.s3.amazonaws.com/42fcbdc5c5c018475b2106639be7624a.pdf",
"https://exambazaar.s3.amazonaws.com/436c9ac28676370311caa4542a02be41.pdf",
"https://exambazaar.s3.amazonaws.com/43a3ba1bc5bbdc209faaed6aa46b11cb.pdf",
"https://exambazaar.s3.amazonaws.com/43c319e577f6d7b56cb914488c046ebe.pdf",
"https://exambazaar.s3.amazonaws.com/440558e9a131831641402253a7741fa8.pdf",
"https://exambazaar.s3.amazonaws.com/4420777d9e516231dbfbe664bfc50ba1.pdf",
"https://exambazaar.s3.amazonaws.com/444233e968bd6055397bd8e11c7bfb14.pdf",
"https://exambazaar.s3.amazonaws.com/44888c6a2504555879e2a3141e0152b9.pdf",
"https://exambazaar.s3.amazonaws.com/4497a6f16487caf9fef3bcd3a9b5f03f.pdf",
"https://exambazaar.s3.amazonaws.com/45069b24405759b49e77b625e980502f.pdf",
"https://exambazaar.s3.amazonaws.com/4556b12828c10bd55a6b6b68e3ae5559.pdf",
"https://exambazaar.s3.amazonaws.com/45bf510c892a056693331c71d93f9379.pdf",
"https://exambazaar.s3.amazonaws.com/45dd3b8f340445d59feffae4b7d09aa6.pdf",
"https://exambazaar.s3.amazonaws.com/45eac5b237c235a19054333d2fe3fa23.pdf",
"https://exambazaar.s3.amazonaws.com/461625eedfe48d9536807011fbc1574c.pdf",
"https://exambazaar.s3.amazonaws.com/465c1621f363bc0dd9c99a2e725af566.pdf",
"https://exambazaar.s3.amazonaws.com/46a44282746b0d17e4b91088afa17f46.pdf",
"https://exambazaar.s3.amazonaws.com/46e03b4217f4e6d56020e79e9c40d269.pdf",
"https://exambazaar.s3.amazonaws.com/46ec75f4cf44b726989616087556f963.pdf",
"https://exambazaar.s3.amazonaws.com/4719efac6924e9dcd010aa2c3c9c5dce.pdf",
"https://exambazaar.s3.amazonaws.com/4766b980f6814a12a94fc960b112a78b.pdf",
"https://exambazaar.s3.amazonaws.com/47effa314b1609a7f1a79e4e705ee35d.pdf",
"https://exambazaar.s3.amazonaws.com/48e02ccb1bcd16c5e29552a1a9bd4735.pdf",
"https://exambazaar.s3.amazonaws.com/49d3682a5453ca79e3f152922820d608.pdf",
"https://exambazaar.s3.amazonaws.com/4a4046ad0dc62bd204c78a46c3bcce58.pdf",
"https://exambazaar.s3.amazonaws.com/4a9e0524e4892fe041f244dad95b69fa.pdf",
"https://exambazaar.s3.amazonaws.com/4aa421fc6a60756bff916d795150e15c.pdf",
"https://exambazaar.s3.amazonaws.com/4abc5b807b737a32bcabddd2744c4689.pdf",
"https://exambazaar.s3.amazonaws.com/4b2b84d622b8864381254e9cb02121aa.pdf",
"https://exambazaar.s3.amazonaws.com/4b73bcce2fb6dcfb5384419bb3ca624e.pdf",
"https://exambazaar.s3.amazonaws.com/4c98f17e3278f48c0d1685bd1966273c.pdf",
"https://exambazaar.s3.amazonaws.com/4ce93e5069e81da9fc211cde14008c91.pdf",
"https://exambazaar.s3.amazonaws.com/4d98590c40f7d7a5312b4913c09e643a.pdf",
"https://exambazaar.s3.amazonaws.com/4de5e63741ad8d930dfa526d336b3c82.pdf",
"https://exambazaar.s3.amazonaws.com/4dfe1f56cf4616824777b09a8e8306e9.pdf",
"https://exambazaar.s3.amazonaws.com/4ecc78a638a02faa65f7e78dbe9b4329.pdf",
"https://exambazaar.s3.amazonaws.com/4f3f6cdea3d32a68795e20b6888f3731.pdf",
"https://exambazaar.s3.amazonaws.com/4f7b8aa995336030733c5cccbec2f261.pdf",
"https://exambazaar.s3.amazonaws.com/4f9bfcf9334f1c78afcdaea6541d17e3.pdf",
"https://exambazaar.s3.amazonaws.com/4f9f1ca9586df1846c534309d47b0ab2.pdf",
"https://exambazaar.s3.amazonaws.com/4fa72aabd4e364ae5681370ffcd4ae6e.pdf",
"https://exambazaar.s3.amazonaws.com/4fbbbc1f64653ae35d84171d8623c41c.pdf",
"https://exambazaar.s3.amazonaws.com/4fe6ff8d6dbbfc8ce85b9266efbb4610.pdf",
"https://exambazaar.s3.amazonaws.com/51dac8a8af28dce7cf761753db1a5468.pdf",
"https://exambazaar.s3.amazonaws.com/527ebbc67385c5cea9b56ff11eb2eebe.pdf",
"https://exambazaar.s3.amazonaws.com/528c06522722e14bef8bccd939ce4677.pdf",
"https://exambazaar.s3.amazonaws.com/52d2a04bc56d94aa32102903546c89ac.pdf",
"https://exambazaar.s3.amazonaws.com/5386f6ea87154950bf7126f0e2abdfa9.pdf",
"https://exambazaar.s3.amazonaws.com/53bc5dd026fb12a173ec84b10f88995a.pdf",
"https://exambazaar.s3.amazonaws.com/544894600c93f97ae925a4eaffb4f94d.pdf",
"https://exambazaar.s3.amazonaws.com/545193103e84ddb8eced25b915141f1e.pdf",
"https://exambazaar.s3.amazonaws.com/5456c774a44e4ea36f53a13eead21fc8.pdf",
"https://exambazaar.s3.amazonaws.com/545b8fd8966272021dfa44340496ad47.pdf",
"https://exambazaar.s3.amazonaws.com/54a14a847ca23549ce24024139660efa.pdf",
"https://exambazaar.s3.amazonaws.com/5598fc370d13d45e61032fa5de9162ef.pdf",
"https://exambazaar.s3.amazonaws.com/55c48b7ca7934fe7b2516971ab9c5a4d.pdf",
"https://exambazaar.s3.amazonaws.com/563ca53e40d5b7c5d9e3553a7eb7f4b0.pdf",
"https://exambazaar.s3.amazonaws.com/569250b301105571d4d701d4ab0269d0.pdf",
"https://exambazaar.s3.amazonaws.com/57da51acbc33e58b59c8651ffbb8ab3e.pdf",
"https://exambazaar.s3.amazonaws.com/582854d3b767e0bb39c0da660dd0915b.pdf",
"https://exambazaar.s3.amazonaws.com/589ae0daf86db946600833ce2ac9dced.pdf",
"https://exambazaar.s3.amazonaws.com/58b1145ecbf0d3f3530c16b476aed7df.pdf",
"https://exambazaar.s3.amazonaws.com/59606cf3a052896d2fe0b2a4a04ee597.pdf",
"https://exambazaar.s3.amazonaws.com/598cd1fe0cc09e49fbbd459e21c40a8c.pdf",
"https://exambazaar.s3.amazonaws.com/5a3a9ea2fa123afa08062a91356f0bb7.pdf",
"https://exambazaar.s3.amazonaws.com/5b9a7f24a7d71fcfbd15be417032f2e4.pdf",
"https://exambazaar.s3.amazonaws.com/5bb108a1c1407091384eafcad2f0cb29.pdf",
"https://exambazaar.s3.amazonaws.com/5c30712d5f4ded60326d91d10162bac3.pdf",
"https://exambazaar.s3.amazonaws.com/5c55a0ebc330381b052b11a1180d012f.pdf",
"https://exambazaar.s3.amazonaws.com/5cd8a1b45795403f5d7d4a494c9bf3b1.pdf",
"https://exambazaar.s3.amazonaws.com/5d1a8facc03afd5055b0cf40bee5f4f4.pdf",
"https://exambazaar.s3.amazonaws.com/5d1fc0febc82df816a18fecd6d5491aa.pdf",
"https://exambazaar.s3.amazonaws.com/5d2251fe058493ac004d09bd6db62bab.pdf",
"https://exambazaar.s3.amazonaws.com/5d8d60477e3fb9454847d2449164c126.pdf",
"https://exambazaar.s3.amazonaws.com/5dcab10e8e34b976bd6c16142c11ab48.pdf",
"https://exambazaar.s3.amazonaws.com/5e1833b07c5067652716befa92408ed2.pdf",
"https://exambazaar.s3.amazonaws.com/5e686dc149b451f39875f55370d8c32d.pdf",
"https://exambazaar.s3.amazonaws.com/5e9cd18f475958dbccfa49c25f8da965.pdf",
"https://exambazaar.s3.amazonaws.com/5ead0f85d0ce30aa72df1df6366f46c4.pdf",
"https://exambazaar.s3.amazonaws.com/5f0231d62886d3f8f21c6f3f7d5e44a2.pdf",
"https://exambazaar.s3.amazonaws.com/5fb2a12fe87dafeec0217a5321a5badc.pdf",
"https://exambazaar.s3.amazonaws.com/5fe6b1685e54350c86ae318e45c83b20.pdf",
"https://exambazaar.s3.amazonaws.com/5fec2bcdfd63d76b51a472a4c1e4bc86.pdf",
"https://exambazaar.s3.amazonaws.com/609b0af26dbfceb86a4f2ee2e5a04444.pdf",
"https://exambazaar.s3.amazonaws.com/6108e70cede849d9dc99c883d9e64a53.pdf",
"https://exambazaar.s3.amazonaws.com/615fa58bbc6470a1f6a068c724fdc2c8.pdf",
"https://exambazaar.s3.amazonaws.com/616e5898be5b523894af83bee06a08d8.pdf",
"https://exambazaar.s3.amazonaws.com/6194867d0e12b325f1aa18bf65d34a1e.pdf",
"https://exambazaar.s3.amazonaws.com/61c6a6debc75824009ac6ffa6c50b661.pdf",
"https://exambazaar.s3.amazonaws.com/6206f8d84d9e115908da159e1f5e24c7.pdf",
"https://exambazaar.s3.amazonaws.com/6215b8e85dd99b3f209b39d21e98fda6.pdf",
"https://exambazaar.s3.amazonaws.com/62a55be83fcf30dcbe57aa5c9c3840d5.pdf",
"https://exambazaar.s3.amazonaws.com/62c3a142a2537f9b566bc4ea52dd2be4.pdf",
"https://exambazaar.s3.amazonaws.com/630623c3c2e28966a73b6194b9be2568.pdf",
"https://exambazaar.s3.amazonaws.com/631755670c5ebdf0036a125bc2bfe855.pdf",
"https://exambazaar.s3.amazonaws.com/6357c7e03c5b34a6bbd2ac75dd7662fd.pdf",
"https://exambazaar.s3.amazonaws.com/635e16111a430195fdc65d15e90eab95.pdf",
"https://exambazaar.s3.amazonaws.com/63ac1933a6ddab7889db88dbba312a01.pdf",
"https://exambazaar.s3.amazonaws.com/63ada3dc1f0b45409f3136f79fe1506f.pdf",
"https://exambazaar.s3.amazonaws.com/63e7b56093ce884ee73575905fff8414.pdf",
"https://exambazaar.s3.amazonaws.com/647365ca6ffa645564ccd152e12f69b6.pdf",
"https://exambazaar.s3.amazonaws.com/6479e499eb3ec1342615d23cb9da5ee6.pdf",
"https://exambazaar.s3.amazonaws.com/64adec1ab8afed7cdb8dcc94df71cbd4.pdf",
"https://exambazaar.s3.amazonaws.com/6517e902cbf894c11b3da347670e2b39.pdf",
"https://exambazaar.s3.amazonaws.com/6570c2a8200a9af2ee022660c62a2330.pdf",
"https://exambazaar.s3.amazonaws.com/660500903d72384bd38b8c91a480f998.pdf",
"https://exambazaar.s3.amazonaws.com/660b6da0236c3e2b6cfdbd562b0469aa.pdf",
"https://exambazaar.s3.amazonaws.com/66b7303bd5d343eef3aa48679ccaa0e3.pdf",
"https://exambazaar.s3.amazonaws.com/66f7004521cecc7837c93c9e8452a3e7.pdf",
"https://exambazaar.s3.amazonaws.com/6717e46d6cedecfbaa9cc774dda42071.pdf",
"https://exambazaar.s3.amazonaws.com/6809b8c5a7fa10cbb1ff00de1c72fad6.pdf",
"https://exambazaar.s3.amazonaws.com/6930940e8d93db0d2cded375d624526d.pdf",
"https://exambazaar.s3.amazonaws.com/6971af4f6fd6d18cb9bca4d73056114b.pdf",
"https://exambazaar.s3.amazonaws.com/69d8d28877117a0c9df7379dd7775e44.pdf",
"https://exambazaar.s3.amazonaws.com/69f3246c2ead3f94e5583c964882f1e6.pdf",
"https://exambazaar.s3.amazonaws.com/6a31b3bf5ceaa482d8620f774abb5f57.pdf",
"https://exambazaar.s3.amazonaws.com/6a3c7544a1fcca875dda32a9970618a1.pdf",
"https://exambazaar.s3.amazonaws.com/6a6ece9cd52b51130e3ec9e9aa3ed9ae.pdf",
"https://exambazaar.s3.amazonaws.com/6a7fc4c3fe51fc61c6f67c775f1908cb.pdf",
"https://exambazaar.s3.amazonaws.com/6a9ecd5d15b11f474640ab756fd4e750.pdf",
"https://exambazaar.s3.amazonaws.com/6b008b1bf657b5f9fdf4e16ea54eb01f.pdf",
"https://exambazaar.s3.amazonaws.com/6b30590b75da31cc7dd7dd04b3b802d1.pdf",
"https://exambazaar.s3.amazonaws.com/6b7d22fee3c96b87040de66f751c5588.pdf",
"https://exambazaar.s3.amazonaws.com/6b90677593f2fdd463fe1d454e2b4db0.pdf",
"https://exambazaar.s3.amazonaws.com/6bf12dc90abc109edf45a2eaf76d5ddc.pdf",
"https://exambazaar.s3.amazonaws.com/6c0f272acb75c0dd9fbe5a164208be25.pdf",
"https://exambazaar.s3.amazonaws.com/6c105fa1e79442df775435f3c425755a.pdf",
"https://exambazaar.s3.amazonaws.com/6c2acd6b92b5c9782f667ebf36755e54.pdf",
"https://exambazaar.s3.amazonaws.com/6c6b92a9b29ccbd3a574ee9b4dbbd3c1.pdf",
"https://exambazaar.s3.amazonaws.com/6d51d02bb02451bdad183986e2e51378.pdf",
"https://exambazaar.s3.amazonaws.com/6dd5e6b482e90b459d03d70438287a6e.pdf",
"https://exambazaar.s3.amazonaws.com/6dda240bb99b2319ace2728a5bdf8186.pdf",
"https://exambazaar.s3.amazonaws.com/6df208455f6673886253f952bf75b9fd.pdf",
"https://exambazaar.s3.amazonaws.com/6e02e0fd4c7fb7b5f7fca6276b103ccf.pdf",
"https://exambazaar.s3.amazonaws.com/6e189ae25ca1e1197dacff2de1112e05.pdf",
"https://exambazaar.s3.amazonaws.com/6e92371d25141ed317d726c0a4110936.pdf",
"https://exambazaar.s3.amazonaws.com/6ed3db5f31974c6f90ccca91f4094200.pdf",
"https://exambazaar.s3.amazonaws.com/6ee1d1260c1c0cc359fa8fe2b5a25311.pdf",
"https://exambazaar.s3.amazonaws.com/6ef89984f4562881bba87b61af351db9.pdf",
"https://exambazaar.s3.amazonaws.com/6f460801cd717f92df46688212e1fcc2.pdf",
"https://exambazaar.s3.amazonaws.com/6fca6456caf16e22988e269fdb64bf52.pdf",
"https://exambazaar.s3.amazonaws.com/6fcf77b0c8f3339b41a7a877fa3150cb.pdf",
"https://exambazaar.s3.amazonaws.com/6fd7e151817ea6164fa0ad28e0d1db8d.pdf",
"https://exambazaar.s3.amazonaws.com/6fdcd42fff74a12a472d7526dff3f825.pdf",
"https://exambazaar.s3.amazonaws.com/7011ae77862218f6e1e3c81f8aa7fdc2.pdf",
"https://exambazaar.s3.amazonaws.com/71371c0604ec34d9bd430d8aaf2469c4.pdf",
"https://exambazaar.s3.amazonaws.com/722dcdec3b0216c8a063308848bd1a9f.pdf",
"https://exambazaar.s3.amazonaws.com/722dd299ad09714188e029290eeb3f1b.pdf",
"https://exambazaar.s3.amazonaws.com/72c3674a5d7ee4ae67a615dee2ab663e.pdf",
"https://exambazaar.s3.amazonaws.com/735b564fc93c07866f32af9832e93c94.pdf",
"https://exambazaar.s3.amazonaws.com/7387d85614dc8058b43efac99dac4582.pdf",
"https://exambazaar.s3.amazonaws.com/73b0f3e800e055c981dfffbce0c470d9.pdf",
"https://exambazaar.s3.amazonaws.com/74751481bb755c5187007f2026d86e5f.pdf",
"https://exambazaar.s3.amazonaws.com/7583b9fd31488f990c394512d02b5adb.pdf",
"https://exambazaar.s3.amazonaws.com/75a2636773cf26a627814a155793c64a.pdf",
"https://exambazaar.s3.amazonaws.com/75a4b229c1136d975bcf9b791709042b.pdf",
"https://exambazaar.s3.amazonaws.com/75e9c76bc9b3a781ec01cc4eced956f8.pdf",
"https://exambazaar.s3.amazonaws.com/76b5d846efb27698b8f2b02427115924.pdf",
"https://exambazaar.s3.amazonaws.com/76c72a39270f1c691fbd04d56351be42.pdf",
"https://exambazaar.s3.amazonaws.com/77049511ac2afeaa9a123a429e2fbfa0.pdf",
"https://exambazaar.s3.amazonaws.com/7710e1639b2c10f2d43999b886fb4cb5.pdf",
"https://exambazaar.s3.amazonaws.com/7725a0fad029c095c296469bdb9d7fa8.pdf",
"https://exambazaar.s3.amazonaws.com/77304f56eae5ed6620e175c1f849de25.pdf",
"https://exambazaar.s3.amazonaws.com/77345548e01d83c7b5d8764e35a87f5b.pdf",
"https://exambazaar.s3.amazonaws.com/778568452f9757c9f9c8ecebd30b32e3.pdf",
"https://exambazaar.s3.amazonaws.com/77b47acf3bf2dafef7bade82dec983dc.pdf",
"https://exambazaar.s3.amazonaws.com/77d59e166631ed1d1ee05d1064a4f30d.pdf",
"https://exambazaar.s3.amazonaws.com/788cad239268b8d85a260d2e61941613.pdf",
"https://exambazaar.s3.amazonaws.com/78d7ab3aee520bc5651ceb629546e6fb.pdf",
"https://exambazaar.s3.amazonaws.com/790928083aaa6af617b184eaa104a9ae.pdf",
"https://exambazaar.s3.amazonaws.com/7926c9a0c186c5707636a93c2997d423.pdf",
"https://exambazaar.s3.amazonaws.com/797ef263acaade2d3170f50d9937f74e.pdf",
"https://exambazaar.s3.amazonaws.com/79c5da15b01395ca2b6d31960d0e9503.pdf",
"https://exambazaar.s3.amazonaws.com/79e1d0a6f0b3a457d74a2522ec95992b.pdf",
"https://exambazaar.s3.amazonaws.com/7a3c507ca7c6a2044d5bd565f2a85a6e.pdf",
"https://exambazaar.s3.amazonaws.com/7a4de529a63a62b6dceafe2e685a8ca9.pdf",
"https://exambazaar.s3.amazonaws.com/7a55f2155ff9b282ce4cc9f8f4b609b7.pdf",
"https://exambazaar.s3.amazonaws.com/7a6b9348af080a8acc9168e95846377f.pdf",
"https://exambazaar.s3.amazonaws.com/7ae4c98242c3bfae5ad4eb17456cfa60.pdf",
"https://exambazaar.s3.amazonaws.com/7aedeb4f6c1b285ea6b52871b2b5272a.pdf",
"https://exambazaar.s3.amazonaws.com/7c04d633bb1f769f16cd0154ecdcc031.pdf",
"https://exambazaar.s3.amazonaws.com/7c0f094ba37b0efb6d767139dd78728d.pdf",
"https://exambazaar.s3.amazonaws.com/7c2842d7525b38854d29c0b86bc04c16.pdf",
"https://exambazaar.s3.amazonaws.com/7c648ae526b772930c8799adfdd6ba02.pdf",
"https://exambazaar.s3.amazonaws.com/7d4194b193c2dfcda62cd3be490173fc.pdf",
"https://exambazaar.s3.amazonaws.com/7d6a010777fc0bf0ba522d78c23b3a33.pdf",
"https://exambazaar.s3.amazonaws.com/7d6f5108236e9ea9643032df1ef7da12.pdf",
"https://exambazaar.s3.amazonaws.com/7db7b147607cec0b8dc4d6aa9bfef7d8.pdf",
"https://exambazaar.s3.amazonaws.com/7e0c1e9a1277101aef2f7d6cafd036c1.pdf",
"https://exambazaar.s3.amazonaws.com/7e4fa35ca0a049c722cc9c04eb8de92d.pdf",
"https://exambazaar.s3.amazonaws.com/7ee6104ae455c4fa141cc2ab1e61e84e.pdf",
"https://exambazaar.s3.amazonaws.com/7f07f817817983220c947d686333784d.pdf",
"https://exambazaar.s3.amazonaws.com/7fb565bec37d586e306b415092e5d22b.pdf",
"https://exambazaar.s3.amazonaws.com/8151cf728f86e8df2c5d81b375b7b6da.pdf",
"https://exambazaar.s3.amazonaws.com/828d3c70f358a953def817d1631f8ea3.pdf",
"https://exambazaar.s3.amazonaws.com/829ded722e9799cd1acb2ce673762dcd.pdf",
"https://exambazaar.s3.amazonaws.com/829f0e9b5c51975692bc6efae49de5e6.pdf",
"https://exambazaar.s3.amazonaws.com/82bd23b005eae9216eeabd37fa5e0db4.pdf",
"https://exambazaar.s3.amazonaws.com/82e2981a35dc0d8e8e89238bedc44a8d.pdf",
"https://exambazaar.s3.amazonaws.com/830babcd7482be1be0c3ddd4ee7de367.pdf",
"https://exambazaar.s3.amazonaws.com/836c08f8ef08541651829aab51c48f15.pdf",
"https://exambazaar.s3.amazonaws.com/83cfc09bc909799f47baaaa96afae874.pdf",
"https://exambazaar.s3.amazonaws.com/84bc51fdfe18ab9b0e6e2edcacb8f1e7.pdf",
"https://exambazaar.s3.amazonaws.com/85178c884412f2b97a63c028297a0fd9.pdf",
"https://exambazaar.s3.amazonaws.com/858132f33a1c0810b776c3a8d9c77c09.pdf",
"https://exambazaar.s3.amazonaws.com/859a595d684437cc7c8e627a5c7f8b55.pdf",
"https://exambazaar.s3.amazonaws.com/85a876099d81aec1aae0f763169a83a8.pdf",
"https://exambazaar.s3.amazonaws.com/85a8956fedae2b7992f2d06895b4fc82.pdf",
"https://exambazaar.s3.amazonaws.com/85d4b6d1f750b9cefd208230b720f51c.pdf",
"https://exambazaar.s3.amazonaws.com/86af1b23525f1ce71f226844e8deadf1.pdf",
"https://exambazaar.s3.amazonaws.com/86c311d91de431d43ed40da27a13afe5.pdf",
"https://exambazaar.s3.amazonaws.com/86f1939db126ea9ee9c1cb75d47e36f5.pdf",
"https://exambazaar.s3.amazonaws.com/87649bc511e251653d9db2be7edcd61d.pdf",
"https://exambazaar.s3.amazonaws.com/877c4e06489d86949a765acc3f8c95fc.pdf",
"https://exambazaar.s3.amazonaws.com/878e35989ca5f5a1a32126ddf15c6767.pdf",
"https://exambazaar.s3.amazonaws.com/8810d947de7027e0a675a98c331dd641.pdf",
"https://exambazaar.s3.amazonaws.com/883e71566c9d03ca0802987cfb338260.pdf",
"https://exambazaar.s3.amazonaws.com/8873899e24721d2f6a615e6715dbab1b.pdf",
"https://exambazaar.s3.amazonaws.com/88c849b5d35b6878f5360e064af7e102.pdf",
"https://exambazaar.s3.amazonaws.com/88e8d217345fd693837fd879cd8637ef.pdf",
"https://exambazaar.s3.amazonaws.com/893d8091db961764aaf96e6d51016bd7.pdf",
"https://exambazaar.s3.amazonaws.com/8955c4cfa35a705b64c26ee172a9af92.pdf",
"https://exambazaar.s3.amazonaws.com/89aa83a5ae2984c0ec9944e03d7f4743.pdf",
"https://exambazaar.s3.amazonaws.com/89bf1a1c9fb9f842480d45000b04e43d.pdf",
"https://exambazaar.s3.amazonaws.com/8a1dd002420d7555e974ed60657cad48.pdf",
"https://exambazaar.s3.amazonaws.com/8a32b7ab1c32d98c5320efd08b168615.pdf",
"https://exambazaar.s3.amazonaws.com/8a61ff89d87d64521b87fb3532c8c728.pdf",
"https://exambazaar.s3.amazonaws.com/8aa56f072b76a612e53a1ed7e3085611.pdf",
"https://exambazaar.s3.amazonaws.com/8aba37ab08dcc8b81636322ee51a9499.pdf",
"https://exambazaar.s3.amazonaws.com/8abbd9556730fd3c76227719b8b93080.pdf",
"https://exambazaar.s3.amazonaws.com/8acf26f3fb695cf6dc216adcf8068343.pdf",
"https://exambazaar.s3.amazonaws.com/8ad4ca6b53bd96160707a05cf2632802.pdf",
"https://exambazaar.s3.amazonaws.com/8b144a405e160fdced00c0182e19d78b.pdf",
"https://exambazaar.s3.amazonaws.com/8b469f9246833f86edcb78be92eabfd9.pdf",
"https://exambazaar.s3.amazonaws.com/8be2b0b36a9e2388af2dd0c48d7d87ad.pdf",
"https://exambazaar.s3.amazonaws.com/8bf5ff293f887d61d96cc93b8a0f73a9.pdf",
"https://exambazaar.s3.amazonaws.com/8c50b22e8df55f6a0f5b3a81a5b8e343.pdf",
"https://exambazaar.s3.amazonaws.com/8c836c419224189a16f18bff370a6edc.pdf",
"https://exambazaar.s3.amazonaws.com/8d31108bf46af70d951516e1f588fa06.pdf",
"https://exambazaar.s3.amazonaws.com/8d6c744e8e138317b391b48b0eb59f31.pdf",
"https://exambazaar.s3.amazonaws.com/8db7ab5ffff5ce0754f8b45503364cc6.pdf",
"https://exambazaar.s3.amazonaws.com/8dba0f7a8b72466d0c2c1cfbdf976e7e.pdf",
"https://exambazaar.s3.amazonaws.com/8dc2087ce470127806b2e6d9aa5b81e5.pdf",
"https://exambazaar.s3.amazonaws.com/8e81da4d57ecb9d01c53c598ba104222.pdf",
"https://exambazaar.s3.amazonaws.com/8ecef56fe34688ba652e071e461c9217.pdf",
"https://exambazaar.s3.amazonaws.com/8f0c14f91619a470ef18af42f586513c.pdf",
"https://exambazaar.s3.amazonaws.com/8f40e829978030ef09dc502e7b1e2966.pdf",
"https://exambazaar.s3.amazonaws.com/8f58ee8dfd3c68c1862fbb6f026fc7ea.pdf",
"https://exambazaar.s3.amazonaws.com/9006e0a3ddc966930e8a86292bdf3832.pdf",
"https://exambazaar.s3.amazonaws.com/900b251c3aaa663d9bddac15db63153a.pdf",
"https://exambazaar.s3.amazonaws.com/9081fed2679dbee6d205b5d97721c8be.pdf",
"https://exambazaar.s3.amazonaws.com/90d33eaf2fb407fceea64c784fa434a8.pdf",
"https://exambazaar.s3.amazonaws.com/9124213f81cab10304818cc84b9c88ad.pdf",
"https://exambazaar.s3.amazonaws.com/91bd4d659953115679f369bde25ed207.pdf",
"https://exambazaar.s3.amazonaws.com/9201602df69e75d8bf63b678522fbda3.pdf",
"https://exambazaar.s3.amazonaws.com/921bcd33940f7ddb032beb5681ecf8f4.pdf",
"https://exambazaar.s3.amazonaws.com/922a7784c5c40d91b8758de4ec00eb9e.pdf",
"https://exambazaar.s3.amazonaws.com/92b51200a7f64519cd467641a8626fe5.pdf",
"https://exambazaar.s3.amazonaws.com/93e90adbf8e1d0dd76706179c78149a3.pdf",
"https://exambazaar.s3.amazonaws.com/947261f765a90bf894df657d6cae565b.pdf",
"https://exambazaar.s3.amazonaws.com/94a46640f1b74d7df6ba1f5bf6c86958.pdf",
"https://exambazaar.s3.amazonaws.com/95203d11362dfe55e5abb4a4ac9755a6.pdf",
"https://exambazaar.s3.amazonaws.com/953334ebfc6e7d8537f08ecc1475a44d.pdf",
"https://exambazaar.s3.amazonaws.com/956176fa12f77d90702cbf0509d27810.pdf",
"https://exambazaar.s3.amazonaws.com/95ba8dac324481187d1eb7e20087cfec.pdf",
"https://exambazaar.s3.amazonaws.com/960cf1b5cda10abd7d8951f4108e55ca.pdf",
"https://exambazaar.s3.amazonaws.com/9615c9dcfbc034b82433e6f028f590b2.pdf",
"https://exambazaar.s3.amazonaws.com/96823ad505ca268c62aaf343d6777d24.pdf",
"https://exambazaar.s3.amazonaws.com/9684b4941e9d8044ed80f7c56e1f50ef.pdf",
"https://exambazaar.s3.amazonaws.com/96a2cdbe6bf7f59392aae1b4363726e8.pdf",
"https://exambazaar.s3.amazonaws.com/96b7e9b207c589887623c26e3e3a5e3d.pdf",
"https://exambazaar.s3.amazonaws.com/9719689407cbdb494530da724fb38e21.pdf",
"https://exambazaar.s3.amazonaws.com/9773a4e03b919443bf6f14e22309f2a7.pdf",
"https://exambazaar.s3.amazonaws.com/97bbe5b0dc40916bc8f1ede979320d2b.pdf",
"https://exambazaar.s3.amazonaws.com/97c8330af9e8f7dcda10951c9a7766c5.pdf",
"https://exambazaar.s3.amazonaws.com/985465fa93c6bcc7be5336ea2a7e4041.pdf",
"https://exambazaar.s3.amazonaws.com/98aba16c5f2e77c61a528409510516fb.pdf",
"https://exambazaar.s3.amazonaws.com/98b471d33baabe3835b4c003191fdbb1.pdf",
"https://exambazaar.s3.amazonaws.com/98c28b379320773d9f74038208406700.pdf",
"https://exambazaar.s3.amazonaws.com/992218e81fe5c365e749124958e1f8e4.pdf",
"https://exambazaar.s3.amazonaws.com/9998d0a28a54747078689ac553d403df.pdf",
"https://exambazaar.s3.amazonaws.com/9a13d6b87b8888ac278b45014d5292f0.pdf",
"https://exambazaar.s3.amazonaws.com/9a4ea054d9ff9c8e782ae6e25df6c89c.pdf",
"https://exambazaar.s3.amazonaws.com/9a798e9e9dc82576c506a45ba451f323.pdf",
"https://exambazaar.s3.amazonaws.com/9b7748c837888f123279b8d676287776.pdf",
"https://exambazaar.s3.amazonaws.com/9bc0e8f2d01333acddde9cf4b6719ae8.pdf",
"https://exambazaar.s3.amazonaws.com/9be1f3727a8956450cf7fcfd2c7afe91.pdf",
"https://exambazaar.s3.amazonaws.com/9c16a0b0e854c119c3455ad6f571dfce.pdf",
"https://exambazaar.s3.amazonaws.com/9c6b1e5c4d0df19682a2c3265ab394a2.pdf",
"https://exambazaar.s3.amazonaws.com/9cfe84abf909b6f2e01211ffc9eb7529.pdf",
"https://exambazaar.s3.amazonaws.com/9d109cb8da21388ca19fb61786fcf4dd.pdf",
"https://exambazaar.s3.amazonaws.com/9d11f2ebf4dcf69a0384f202ce7dbd14.pdf",
"https://exambazaar.s3.amazonaws.com/9d358fff906790189b254651852f77cc.pdf",
"https://exambazaar.s3.amazonaws.com/9d7d43615e9d3222874dc12f94eed120.pdf",
"https://exambazaar.s3.amazonaws.com/9d91a5c7489b9713db1f43f8ac4cc4e3.pdf",
"https://exambazaar.s3.amazonaws.com/9e52ca0d9544aa85491fba9734cf5ede.pdf",
"https://exambazaar.s3.amazonaws.com/9e73c1ea6719c0286c25effbbce7c22f.pdf",
"https://exambazaar.s3.amazonaws.com/9e8d53514d2e04b936568a5e4ebf5820.pdf",
"https://exambazaar.s3.amazonaws.com/9ed49f5e05c4016f510659dc85792bea.pdf",
"https://exambazaar.s3.amazonaws.com/9ed8dc6d5d11dfe3b569418281d54849.pdf",
"https://exambazaar.s3.amazonaws.com/9eeedaa4749aee287a4c32d7514076f1.pdf",
"https://exambazaar.s3.amazonaws.com/9f5597f02b6e70e209ee3e081dc3040f.pdf",
"https://exambazaar.s3.amazonaws.com/9fcf4a732ab4f0c586599e7c09087393.pdf",
"https://exambazaar.s3.amazonaws.com/9fe054d4ecd6e12e04dc9133a7415d38.pdf",
"https://exambazaar.s3.amazonaws.com/a0b13a14895e02a5b931ad73301a125a.pdf",
"https://exambazaar.s3.amazonaws.com/a179b3b527ec88e4c925dca84ef307bd.pdf",
"https://exambazaar.s3.amazonaws.com/a18b5d0a77962c5978737592ee3116b4.pdf",
"https://exambazaar.s3.amazonaws.com/a191a025d9bcbb847dcfd6cb91a583c2.pdf",
"https://exambazaar.s3.amazonaws.com/a19d20a6701351656715253561019ebe.pdf",
"https://exambazaar.s3.amazonaws.com/a1b1891ee1c269d45bb8d7315e59a66d.pdf",
"https://exambazaar.s3.amazonaws.com/a23921dba0cd33d8c7c9707193e8bdc3.pdf",
"https://exambazaar.s3.amazonaws.com/a2b6761fee7cbc8a1df833e3c4bbd88d.pdf",
"https://exambazaar.s3.amazonaws.com/a2c1bea381450041b8700b680d09f7f6.pdf",
"https://exambazaar.s3.amazonaws.com/a416c38e2428a9d535d6bdeacca50b3e.pdf",
"https://exambazaar.s3.amazonaws.com/a4467dd33aa0707c022f69d0de7cb8bd.pdf",
"https://exambazaar.s3.amazonaws.com/a447836bd888360636391ee6d6f03e5a.pdf",
"https://exambazaar.s3.amazonaws.com/a497011298333641a1c38402128741a7.pdf",
"https://exambazaar.s3.amazonaws.com/a49b49150bf8e2df4b98ac649e206f9e.pdf",
"https://exambazaar.s3.amazonaws.com/a5018d4e2f4988c5ee40b6b6fa4737ec.pdf",
"https://exambazaar.s3.amazonaws.com/a51b38dff755fbe6e3b8d56f0a525388.pdf",
"https://exambazaar.s3.amazonaws.com/a5cbd1c1cdfabb61f95b75268e78504c.pdf",
"https://exambazaar.s3.amazonaws.com/a61e4b01eaefb182529c8649845288a0.pdf",
"https://exambazaar.s3.amazonaws.com/a6553167f056e9806f660f51848397e1.pdf",
"https://exambazaar.s3.amazonaws.com/a6d96b3f2dd69bd461458e05ef706e23.pdf",
"https://exambazaar.s3.amazonaws.com/a6ebfbad6f75714bebc68a4f6bbe8d1e.pdf",
"https://exambazaar.s3.amazonaws.com/a764f05fe8f5b27d6dc516763bceecf2.pdf",
"https://exambazaar.s3.amazonaws.com/a780a9154b80b74891a403f68ac59cab.pdf",
"https://exambazaar.s3.amazonaws.com/a7b12dcd59917b4df0606af122d447ea.pdf",
"https://exambazaar.s3.amazonaws.com/a7d8ad5b1e25042a8c591052660baf3a.pdf",
"https://exambazaar.s3.amazonaws.com/a80970e216497836f87898a655d4fc36.pdf",
"https://exambazaar.s3.amazonaws.com/a80abc80840ce8097c22217d5daa6bda.pdf",
"https://exambazaar.s3.amazonaws.com/a8151b01f5e784b472669244619ad84b.pdf",
"https://exambazaar.s3.amazonaws.com/a88a4da84a91b3732e88fb00f8610f43.pdf",
"https://exambazaar.s3.amazonaws.com/a897ef6cdeab238bfcb49147ab9cdd04.pdf",
"https://exambazaar.s3.amazonaws.com/a957d812bd36fdb3f8eeea50082ed46c.pdf",
"https://exambazaar.s3.amazonaws.com/a95f08bb185e483aebdf6a7f234447e9.pdf",
"https://exambazaar.s3.amazonaws.com/a9bb12e1d9f7a7ad12d4c9535abb964d.pdf",
"https://exambazaar.s3.amazonaws.com/a9d76ae149b7929b3473c6a24c35d925.pdf",
"https://exambazaar.s3.amazonaws.com/a9dc269a5e4393b73da76e2b08bc57c9.pdf",
"https://exambazaar.s3.amazonaws.com/a9dd549f5a82a4ddd7a9ef7d6a34e232.pdf",
"https://exambazaar.s3.amazonaws.com/a9fa6d00b7312ac6fcc5f5f9ed167166.pdf",
"https://exambazaar.s3.amazonaws.com/aa1256fa39d4e16f8c03d7018c41cd09.pdf",
"https://exambazaar.s3.amazonaws.com/aa86ead43b251c4d0330bec1d2be0a3d.pdf",
"https://exambazaar.s3.amazonaws.com/aad5de8e5c895db37309f3417056c232.pdf",
"https://exambazaar.s3.amazonaws.com/ab1892f03195e3bb66c6b2889f7345fe.pdf",
"https://exambazaar.s3.amazonaws.com/ab25c6a1b2ff7de4ecfcf6440fe0edd0.pdf",
"https://exambazaar.s3.amazonaws.com/ab4fea5c7e18a12e1bc579037c31c3ea.pdf",
"https://exambazaar.s3.amazonaws.com/ab62f0beab3fc7b806cf68c3c78ec90d.pdf",
"https://exambazaar.s3.amazonaws.com/abbe68e1c9c7dfdfdb83cbd9c803e7ff.pdf",
"https://exambazaar.s3.amazonaws.com/abf12be0fc78bee60460573a121fa26d.pdf",
"https://exambazaar.s3.amazonaws.com/ac79b2e186b68f1cdcb92bbca7b98323.pdf",
"https://exambazaar.s3.amazonaws.com/ad21f00efd2d83801bfe81ff2de71572.pdf",
"https://exambazaar.s3.amazonaws.com/ad7366bbf87745622eb6abcde4f507c8.pdf",
"https://exambazaar.s3.amazonaws.com/ae1a07156c007f40fc99c6785eebf1b0.pdf",
"https://exambazaar.s3.amazonaws.com/ae2cd8b2605890254aec93c02b31aab6.pdf",
"https://exambazaar.s3.amazonaws.com/ae524ba4ca84db42ac12f1591de6be32.pdf",
"https://exambazaar.s3.amazonaws.com/ae7cbfb132379df51d2074204c8278cd.pdf",
"https://exambazaar.s3.amazonaws.com/ae87d1ae2bc2eea0b13be5a1bb09a228.pdf",
"https://exambazaar.s3.amazonaws.com/af861abe8388e1a0b33996fd542595f9.pdf",
"https://exambazaar.s3.amazonaws.com/af924215882ba77a9aba10ded8dc15f8.pdf",
"https://exambazaar.s3.amazonaws.com/afd7703ef87952e31f29625a5414a81e.pdf",
"https://exambazaar.s3.amazonaws.com/afdee8ef2d7e140f7cf5e8ff5879f643.pdf",
"https://exambazaar.s3.amazonaws.com/b092be2350f8a31f125551e3504e4d10.pdf",
"https://exambazaar.s3.amazonaws.com/b0dab091ac935f9b5327e245f8d28a06.pdf",
"https://exambazaar.s3.amazonaws.com/b111d7446c34b7354052030f5ea117e0.pdf",
"https://exambazaar.s3.amazonaws.com/b1a3b5e9ab3cc406be7cb1a52eff02c0.pdf",
"https://exambazaar.s3.amazonaws.com/b20e364f332eb576d25c50305aaabdb4.pdf",
"https://exambazaar.s3.amazonaws.com/b21a6b1886e18bc6948703fb9ff4bd65.pdf",
"https://exambazaar.s3.amazonaws.com/b21d51f714411bf3086124568887c4f6.pdf",
"https://exambazaar.s3.amazonaws.com/b22865a08c9738ce6fa043d340b52b44.pdf",
"https://exambazaar.s3.amazonaws.com/b228ab59034f95f66aeacf2026dcb01f.pdf",
"https://exambazaar.s3.amazonaws.com/b3dd15deeb7adf0d44ac88e51bd90e4f.pdf",
"https://exambazaar.s3.amazonaws.com/b3ef4b5d70a81d14bf2228508b0d3010.pdf",
"https://exambazaar.s3.amazonaws.com/b4955099d4c073f954ce80e579f8f6a2.pdf",
"https://exambazaar.s3.amazonaws.com/b4a9b8e7198f472b58dbe8130c881f22.pdf",
"https://exambazaar.s3.amazonaws.com/b5301dc9abd824c89d34c764ee39093c.pdf",
"https://exambazaar.s3.amazonaws.com/b5321df2d418d5e90d3dcf8e5e80c1c0.pdf",
"https://exambazaar.s3.amazonaws.com/b620aa00ca9a48ec94d81eec8950d441.pdf",
"https://exambazaar.s3.amazonaws.com/b64ae44d97b1026017529255d1d73a4f.pdf",
"https://exambazaar.s3.amazonaws.com/b710bcdd4982e3f5610cce34ac8f4776.pdf",
"https://exambazaar.s3.amazonaws.com/b71ff6683fd0f4f387e165c9e8cd5401.pdf",
"https://exambazaar.s3.amazonaws.com/b7ee2b89a99d2f1bdb65654f4a0f8dc2.pdf",
"https://exambazaar.s3.amazonaws.com/b81abfc45383c871e880ee0511c32d87.pdf",
"https://exambazaar.s3.amazonaws.com/b826f410df879fce8b0cbc9f8e59a985.pdf",
"https://exambazaar.s3.amazonaws.com/b83183aa76440ee1d4b33f365880c23d.pdf",
"https://exambazaar.s3.amazonaws.com/b875402bb2c19e4213fbe1e84c2bd831.pdf",
"https://exambazaar.s3.amazonaws.com/b906166a94d099e0c68fa62d0baeaa3e.pdf",
"https://exambazaar.s3.amazonaws.com/b9502d4a9a01dbcd011dcc138ab4281c.pdf",
"https://exambazaar.s3.amazonaws.com/b9587b0fe37dbc3c81fc8ad2385c84a8.pdf",
"https://exambazaar.s3.amazonaws.com/b96a5160ce0a09af21ace607736fa12d.pdf",
"https://exambazaar.s3.amazonaws.com/b9795c7690637376338724355d1a8965.pdf",
"https://exambazaar.s3.amazonaws.com/b9ba2a508746d53958d23f2f233b9b95.pdf",
"https://exambazaar.s3.amazonaws.com/b9baa7577bb77c57ad7d72a3c61d0ae9.pdf",
"https://exambazaar.s3.amazonaws.com/ba98638884a0c7ac91c5866c67433ca4.pdf",
"https://exambazaar.s3.amazonaws.com/bad6c9170a15208c7bc1a90d61b6e9c9.pdf",
"https://exambazaar.s3.amazonaws.com/bb3b955f1e438e6c831454c1507cb281.pdf",
"https://exambazaar.s3.amazonaws.com/bb7e60debcc35dc4b58a323ad08db35a.pdf",
"https://exambazaar.s3.amazonaws.com/bb8313b8ab0617fc62fc7333292700c5.pdf",
"https://exambazaar.s3.amazonaws.com/bba17c851fe3950e8a66fca6492e58ff.pdf",
"https://exambazaar.s3.amazonaws.com/bbb51ebae7e0d778b691a74d4d9159a8.pdf",
"https://exambazaar.s3.amazonaws.com/bc2c0ceecb91cf4ffeba611109f562d0.pdf",
"https://exambazaar.s3.amazonaws.com/bc3c2924e40857b2d0bd6f9bd2286323.pdf",
"https://exambazaar.s3.amazonaws.com/bc94933e2e32e271cce5401490c8b41a.pdf",
"https://exambazaar.s3.amazonaws.com/bcba3f1086cde06d123bcd635593475e.pdf",
"https://exambazaar.s3.amazonaws.com/bcdc20294f82a70312ed94ed2b928462.pdf",
"https://exambazaar.s3.amazonaws.com/bceec7a0aa641695373f8036ea69795b.pdf",
"https://exambazaar.s3.amazonaws.com/bcf383ef28f7698d348814aa25a0e0a9.pdf",
"https://exambazaar.s3.amazonaws.com/bd0c6860277d339f6526b42229bcb07c.pdf",
"https://exambazaar.s3.amazonaws.com/bd1ab0b6244cbd0d56b85e2d99590d13.pdf",
"https://exambazaar.s3.amazonaws.com/bd5c8cbc2efd7c217e0cfaadf3b479d9.pdf",
"https://exambazaar.s3.amazonaws.com/bd8c2e148ec2fc6badb0d3d60fe07da4.pdf",
"https://exambazaar.s3.amazonaws.com/be5f057b2dd8d1d7048e21d9b6316060.pdf",
"https://exambazaar.s3.amazonaws.com/be8d824eb30b7d663aa5d2e95da28a14.pdf",
"https://exambazaar.s3.amazonaws.com/bfbfca0d0e28e2de415fc0e93f0e2fca.pdf",
"https://exambazaar.s3.amazonaws.com/bffa4196e54560b989c3f0a9e208d655.pdf",
"https://exambazaar.s3.amazonaws.com/c026bdd04e646670c3dbc68c2052d0d7.pdf",
"https://exambazaar.s3.amazonaws.com/c0b64caca70ede144af0fbd35be62f0a.pdf",
"https://exambazaar.s3.amazonaws.com/c128d920aa1ad8170150ec5cd5035c85.pdf",
"https://exambazaar.s3.amazonaws.com/c1bb65bb213efa27228bb0e5900f79dd.pdf",
"https://exambazaar.s3.amazonaws.com/c1f18e75d67dfd780beda5b815145e94.pdf",
"https://exambazaar.s3.amazonaws.com/c2b110e155008262fd451bc116687cb2.pdf",
"https://exambazaar.s3.amazonaws.com/c2dcc4d7159d61172c27a086c1169b1c.pdf",
"https://exambazaar.s3.amazonaws.com/c2e94960fa4304bf2341a1153cb46480.pdf",
"https://exambazaar.s3.amazonaws.com/c2f29c6dcc8b22855c979e698a41a7b5.pdf",
"https://exambazaar.s3.amazonaws.com/c3110a5d46a2e8f169d5348c39f42c36.pdf",
"https://exambazaar.s3.amazonaws.com/c32502532cb79207a7eb9c949fc5339f.pdf",
"https://exambazaar.s3.amazonaws.com/c325ed34d06d098e98c66539644c114b.pdf",
"https://exambazaar.s3.amazonaws.com/c3575df2f0e4e749f90c25e59ec62800.pdf",
"https://exambazaar.s3.amazonaws.com/c37dc09e2e87879b1752b7de06d33fd2.pdf",
"https://exambazaar.s3.amazonaws.com/c3d3eb1ac509c27f4794cdcd90dff9b6.pdf",
"https://exambazaar.s3.amazonaws.com/c420ab3522950a653d842d2f3465bde0.pdf",
"https://exambazaar.s3.amazonaws.com/c4311998b337731c5938ca455e4d1d11.pdf",
"https://exambazaar.s3.amazonaws.com/c43d1d7aba0da8e84c91e2c58b154529.pdf",
"https://exambazaar.s3.amazonaws.com/c471a07d1128efc77c43857d497be359.pdf",
"https://exambazaar.s3.amazonaws.com/c4820e49c0d7ebd7b62d4546514d9918.pdf",
"https://exambazaar.s3.amazonaws.com/c4a14b696eba3bd677bff3ef4ed2d7bd.pdf",
"https://exambazaar.s3.amazonaws.com/c4ded0946c8d33daa6fef9dd465418d0.pdf",
"https://exambazaar.s3.amazonaws.com/c532abedb8b363f8ed806fbcb9caeaa2.pdf",
"https://exambazaar.s3.amazonaws.com/c5428331f141ef5f5f7adb95fe9a60f6.pdf",
"https://exambazaar.s3.amazonaws.com/c5d2dc57f9baa11b8a36bbcadc8a780e.pdf",
"https://exambazaar.s3.amazonaws.com/c5da1169a57220320e968a84e81ec97c.pdf",
"https://exambazaar.s3.amazonaws.com/c5f63fe85fcc325f3f702fa659c8036e.pdf",
"https://exambazaar.s3.amazonaws.com/c67655ea35c81b1f832a96a051552ced.pdf",
"https://exambazaar.s3.amazonaws.com/c69ba09445bb7a5f8a77b21c7ace9fb9.pdf",
"https://exambazaar.s3.amazonaws.com/c7064dbed64badc4920b087647be2612.pdf",
"https://exambazaar.s3.amazonaws.com/c710be74587652dfbf9c714e9596bc0a.pdf",
"https://exambazaar.s3.amazonaws.com/c74775eed16b91ccbf4844ae9d70726e.pdf",
"https://exambazaar.s3.amazonaws.com/c75ddce6b31df8241325e96fbe1ffdd5.pdf",
"https://exambazaar.s3.amazonaws.com/c787c91e83aac880ed73cb4aef7f016a.pdf",
"https://exambazaar.s3.amazonaws.com/c788603b3e09e6fa461bfe44b52e0739.pdf",
"https://exambazaar.s3.amazonaws.com/c82e60f759090e9036d9c31b069a8320.pdf",
"https://exambazaar.s3.amazonaws.com/c83fb8b316f3aa35ce5c4e157875e72a.pdf",
"https://exambazaar.s3.amazonaws.com/c8e36ef596678a81b757ad652832c468.pdf",
"https://exambazaar.s3.amazonaws.com/c947898a4e015ef4d22dc5160eec2669.pdf",
"https://exambazaar.s3.amazonaws.com/c961deaaf95aa33b660ac30d91f9b75e.pdf",
"https://exambazaar.s3.amazonaws.com/c97918a624f9321efcdd3a628aa65fa2.pdf",
"https://exambazaar.s3.amazonaws.com/c9da317ed25cd1373a92dabd9d26512a.pdf",
"https://exambazaar.s3.amazonaws.com/ca31959ce87ef532a0b998007d88796c.pdf",
"https://exambazaar.s3.amazonaws.com/cabb374e9b97c2a15f496f270fa4b829.pdf",
"https://exambazaar.s3.amazonaws.com/caec2fd2ff7ee99d533a0becb13369df.pdf",
"https://exambazaar.s3.amazonaws.com/cb26585624d1a08d9dfdf1180474e4e4.pdf",
"https://exambazaar.s3.amazonaws.com/cb6372bc493f670234361e2a9d5900fc.pdf",
"https://exambazaar.s3.amazonaws.com/cb8a25ee770f5317a5e94d97519efae4.pdf",
"https://exambazaar.s3.amazonaws.com/cbd8f90f4815d0d3d8f09aafe631fdc9.pdf",
"https://exambazaar.s3.amazonaws.com/cbda4ceca76d76b8ca754bd3cbf43575.pdf",
"https://exambazaar.s3.amazonaws.com/cc7104e9ad4098d58488bbe84c267221.pdf",
"https://exambazaar.s3.amazonaws.com/ccbe7e0abf477b3100c571f05c9d7bf4.pdf",
"https://exambazaar.s3.amazonaws.com/cd0e9cfc35c0188b6458d894c538ebbe.pdf",
"https://exambazaar.s3.amazonaws.com/cd30dcfc70fbd886bc04131023f56597.pdf",
"https://exambazaar.s3.amazonaws.com/cd49c3a4c9ef5757352b772a3b031350.pdf",
"https://exambazaar.s3.amazonaws.com/cda62ee6580e74f4a06d1c7e33d342b2.pdf",
"https://exambazaar.s3.amazonaws.com/cebce59318e605a9abeb6fb7351a8427.pdf",
"https://exambazaar.s3.amazonaws.com/cecc8cb8a3674015a9975a62db03af25.pdf",
"https://exambazaar.s3.amazonaws.com/cf3636d1fb8f0930cde5b2a425de9e96.pdf",
"https://exambazaar.s3.amazonaws.com/cf468fdf1132be85c7354e5c83dd8889.pdf",
"https://exambazaar.s3.amazonaws.com/cf4ff15e197081fba3d1f43b1ce6e6f2.pdf",
"https://exambazaar.s3.amazonaws.com/cf70352c4ca45fb5e74ad1fbb6c93b51.pdf",
"https://exambazaar.s3.amazonaws.com/cff80109e0f801435e60138f6559e40f.pdf",
"https://exambazaar.s3.amazonaws.com/d0acf150785d56dda6d2648904f6bbd2.pdf",
"https://exambazaar.s3.amazonaws.com/d15b5727a9fd3d599727b1d6f97bba79.pdf",
"https://exambazaar.s3.amazonaws.com/d169adfc2970ed79250aee15e818ae5e.pdf",
"https://exambazaar.s3.amazonaws.com/d1f12630333054134515bb6c3c811ead.pdf",
"https://exambazaar.s3.amazonaws.com/d1fa670b34b3b6d87a08b32a340c2334.pdf",
"https://exambazaar.s3.amazonaws.com/d210952a78b86d40d08ecf5a0e0e4efd.pdf",
"https://exambazaar.s3.amazonaws.com/d216cd68b9514feaa67992a89ce884d1.pdf",
"https://exambazaar.s3.amazonaws.com/d254ba83ac448958a94fc3a32a6fadc3.pdf",
"https://exambazaar.s3.amazonaws.com/d263e183efcf71a4a6896ab6e50a84a4.pdf",
"https://exambazaar.s3.amazonaws.com/d2a4d2d5e21706d0490e1318aa9ad9b4.pdf",
"https://exambazaar.s3.amazonaws.com/d2b82891aebbccad0b4b8d7bd1091317.pdf",
"https://exambazaar.s3.amazonaws.com/d2cd752f62a595ba3ccc1abdb24db734.pdf",
"https://exambazaar.s3.amazonaws.com/d2ef95827995986a48a729e4c11a73fb.pdf",
"https://exambazaar.s3.amazonaws.com/d2f2d4eba640128c9e39fc3901e35f4b.pdf",
"https://exambazaar.s3.amazonaws.com/d3366d57f399279772fdd615ca83e185.pdf",
"https://exambazaar.s3.amazonaws.com/d36abc26b4db50bc195362e32e62665b.pdf",
"https://exambazaar.s3.amazonaws.com/d3ca44627ef6d21c0890bbcfc1b3fba6.pdf",
"https://exambazaar.s3.amazonaws.com/d3e12207f3570c4676652aca0393ecfc.pdf",
"https://exambazaar.s3.amazonaws.com/d40a513278cd32eeed26075e28ead482.pdf",
"https://exambazaar.s3.amazonaws.com/d4447e521d3049597d6e596617c87ed6.pdf",
"https://exambazaar.s3.amazonaws.com/d44f88c4a9ce154311a435a0b7e7a120.pdf",
"https://exambazaar.s3.amazonaws.com/d45bafd23407394fec5950deed00c2c4.pdf",
"https://exambazaar.s3.amazonaws.com/d4758d32c3a70718ddefacc0934a6191.pdf",
"https://exambazaar.s3.amazonaws.com/d4b0997513949d174c6240777a2e4207.pdf",
"https://exambazaar.s3.amazonaws.com/d4be5648b29e97de042594834d2cce7b.pdf",
"https://exambazaar.s3.amazonaws.com/d53699d68fd21ef425f923a2797d198d.pdf",
"https://exambazaar.s3.amazonaws.com/d73b37074918a798fc265b2ee3330be3.pdf",
"https://exambazaar.s3.amazonaws.com/d783d9808fee2e1786e3209aade6d812.pdf",
"https://exambazaar.s3.amazonaws.com/d80dc6a9076091416e5c49947ccd4a66.pdf",
"https://exambazaar.s3.amazonaws.com/d842242affcfcb00765cd9c818730112.pdf",
"https://exambazaar.s3.amazonaws.com/d88f7fa02ba8a256b711045229c38a5f.pdf",
"https://exambazaar.s3.amazonaws.com/d8a1654fedb2aca46cecb55554a83b09.pdf",
"https://exambazaar.s3.amazonaws.com/d8a9f7a6aefb93e3bad9332b5fc7aad5.pdf",
"https://exambazaar.s3.amazonaws.com/d932c936f7e402f5bd4e25486ad8e434.pdf",
"https://exambazaar.s3.amazonaws.com/da58df4342f5a1712774a74ab9e24643.pdf",
"https://exambazaar.s3.amazonaws.com/da60ea0339a5cca2efe12308199aa5b7.pdf",
"https://exambazaar.s3.amazonaws.com/da9ee1f3ce436ca829ded2652192ee5e.pdf",
"https://exambazaar.s3.amazonaws.com/dac44c6e38a379529b70fc4b8b05920c.pdf",
"https://exambazaar.s3.amazonaws.com/db5dd64eec3fcf477f2cb82c201bcc59.pdf",
"https://exambazaar.s3.amazonaws.com/db97576e1703131bb9ad39cd67caa6e8.pdf",
"https://exambazaar.s3.amazonaws.com/dc483d5aef73feeead27c93be2664424.pdf",
"https://exambazaar.s3.amazonaws.com/dd116a4aeac96a813dd1470582ba9747.pdf",
"https://exambazaar.s3.amazonaws.com/dd2725928ce98423917c8d6eede3aa04.pdf",
"https://exambazaar.s3.amazonaws.com/de11b3d52a98ffc93a2ffb8735b15c99.pdf",
"https://exambazaar.s3.amazonaws.com/df65801f76907d2f9535cba17178b662.pdf",
"https://exambazaar.s3.amazonaws.com/e01a1179e03823a2ec8bdd23d73ec122.pdf",
"https://exambazaar.s3.amazonaws.com/e0818fca9ca94d179c09774686017b2c.pdf",
"https://exambazaar.s3.amazonaws.com/e128c49083b660a0b951df633dd21a25.pdf",
"https://exambazaar.s3.amazonaws.com/e17f962cf07e3fe52dc72af634e1306a.pdf",
"https://exambazaar.s3.amazonaws.com/e196c1975d0e94f42a56407b1b5a7bf8.pdf",
"https://exambazaar.s3.amazonaws.com/e1dd3c0918ade1979ed167db800a47ae.pdf",
"https://exambazaar.s3.amazonaws.com/e1e62099a7cdb0a40dfe3274f0d13fc0.pdf",
"https://exambazaar.s3.amazonaws.com/e1f32852668a6d0f709409fc7873d6ff.pdf",
"https://exambazaar.s3.amazonaws.com/e285a7e0e4548c5cba07d36db99c04ea.pdf",
"https://exambazaar.s3.amazonaws.com/e2c4551252c32513b82b998f0d44898c.pdf",
"https://exambazaar.s3.amazonaws.com/e36b594f245782312b584daf7aff1a50.pdf",
"https://exambazaar.s3.amazonaws.com/e3778e0b95d360be2804ce15013223b6.pdf",
"https://exambazaar.s3.amazonaws.com/e37cb5f27eec81fef695157f0a7128ae.pdf",
"https://exambazaar.s3.amazonaws.com/e3cb201daf5ff6069e4fc8d29e2bfa8e.pdf",
"https://exambazaar.s3.amazonaws.com/e47dc5a496ad868bde1861377d0cdd2a.pdf",
"https://exambazaar.s3.amazonaws.com/e4891481c914048ccc2ba0a98d3fb2e4.pdf",
"https://exambazaar.s3.amazonaws.com/e4a817e137ea6012b9963f4752b2fc2f.pdf",
"https://exambazaar.s3.amazonaws.com/e4d5f6d387692687156769196dae588e.pdf",
"https://exambazaar.s3.amazonaws.com/e4f1ae9231beb5ab4cf5783d8cf402ea.pdf",
"https://exambazaar.s3.amazonaws.com/e52dce72b4c6a4b12911db04f2099a48.pdf",
"https://exambazaar.s3.amazonaws.com/e60c7998529400b059cc4028fdb721a4.pdf",
"https://exambazaar.s3.amazonaws.com/e657984922604be61670089e6dda64d1.pdf",
"https://exambazaar.s3.amazonaws.com/e7ec1849e87908d7173e4e90741ee14f.pdf",
"https://exambazaar.s3.amazonaws.com/e7ee5af0bb19a617607205763a516697.pdf",
"https://exambazaar.s3.amazonaws.com/e81c1850069fad3b2a3e7c2f05e76751.pdf",
"https://exambazaar.s3.amazonaws.com/e81eb49a46757998354e8bd66200fc07.pdf",
"https://exambazaar.s3.amazonaws.com/e8c301536cf25fae51c2b6f958068f5c.pdf",
"https://exambazaar.s3.amazonaws.com/e9005ccebae952dedabf05ac5d8a7376.pdf",
"https://exambazaar.s3.amazonaws.com/e92dc79a8290090b3d42bbd86744e0c1.pdf",
"https://exambazaar.s3.amazonaws.com/e9616103a170b9d229fb048dd214be26.pdf",
"https://exambazaar.s3.amazonaws.com/e9de4115fa4e8278c670d2630e570d24.pdf",
"https://exambazaar.s3.amazonaws.com/e9e9f5f9c5f831b1426f533411401aad.pdf",
"https://exambazaar.s3.amazonaws.com/e9f7295fcf023ded4ad00a95dffca554.pdf",
"https://exambazaar.s3.amazonaws.com/ea164943f6dd5762bd495e4bb90f369c.pdf",
"https://exambazaar.s3.amazonaws.com/ea82e2588b5202a0f4bc510b8c3aa1bb.pdf",
"https://exambazaar.s3.amazonaws.com/ea93877bf78136dddf9ed80a120baeb0.pdf",
"https://exambazaar.s3.amazonaws.com/ead4f7fab582db0bec47ba3d53b3bdb9.pdf",
"https://exambazaar.s3.amazonaws.com/eba66d8950048089ad479ef08af15879.pdf",
"https://exambazaar.s3.amazonaws.com/ebbc5a0c8330073dd310aaf537c3d415.pdf",
"https://exambazaar.s3.amazonaws.com/ec7c02ba615e5b163abadaa1b77ccd60.pdf",
"https://exambazaar.s3.amazonaws.com/ece5d4e6a6ecd81e6938fbfe63aea23e.pdf",
"https://exambazaar.s3.amazonaws.com/ed1e49ec0eb819ec0c89d8b52b909799.pdf",
"https://exambazaar.s3.amazonaws.com/edb70b6738962ddeef8c2c28e69f782c.pdf",
"https://exambazaar.s3.amazonaws.com/ee2e51b7232c596d1801f104b48bfa8d.pdf",
"https://exambazaar.s3.amazonaws.com/ee5e645466f257277242607cdcbc3697.pdf",
"https://exambazaar.s3.amazonaws.com/ef2a35dea084988ecdba1260f07815bb.pdf",
"https://exambazaar.s3.amazonaws.com/ef392e137461151f5bf685f69c07bd52.pdf",
"https://exambazaar.s3.amazonaws.com/ef40d91b14d62aa0b487abc7a991382b.pdf",
"https://exambazaar.s3.amazonaws.com/ef473031cc24200ab46c0f5921c10787.pdf",
"https://exambazaar.s3.amazonaws.com/ef91431c8550e0c9477b19ebe4a93e06.pdf",
"https://exambazaar.s3.amazonaws.com/efc3d1c9604c7c1a1b256836f81d49ee.pdf",
"https://exambazaar.s3.amazonaws.com/efd604a2b8f76cbf46aff49b327a043b.pdf",
"https://exambazaar.s3.amazonaws.com/efe979233e69a84a300503af75ad530b.pdf",
"https://exambazaar.s3.amazonaws.com/effc59e1aa4315db10e48dfe745a6a13.pdf",
"https://exambazaar.s3.amazonaws.com/f090ef2f5f36846c85244922dfe86d1e.pdf",
"https://exambazaar.s3.amazonaws.com/f0ac4b86711b4fbba9c94635bd3af1bf.pdf",
"https://exambazaar.s3.amazonaws.com/f1223b9bea9eee0fd6b1c2fa927dbdbb.pdf",
"https://exambazaar.s3.amazonaws.com/f126afc41ac7c6715a4ce4bf16ea8f2a.pdf",
"https://exambazaar.s3.amazonaws.com/f18ea89346cd7693ae0dc5bc43e92d5e.pdf",
"https://exambazaar.s3.amazonaws.com/f231d3b5c9e927ccea3a77ed01c752b2.pdf",
"https://exambazaar.s3.amazonaws.com/f26cd324125f82466f88316a45e3ff8f.pdf",
"https://exambazaar.s3.amazonaws.com/f28f10debb47b661354524e11ee0d164.pdf",
"https://exambazaar.s3.amazonaws.com/f30419892b4b7f5828e2e09e099beb9a.pdf",
"https://exambazaar.s3.amazonaws.com/f3865030f2c3594a2bb60509cf00319f.pdf",
"https://exambazaar.s3.amazonaws.com/f3b2fd38dda57160c243e209f7710ede.pdf",
"https://exambazaar.s3.amazonaws.com/f3c30a687748218b1350fba237ad7252.pdf",
"https://exambazaar.s3.amazonaws.com/f46da76d7b2286b239cf5f8b064f90f7.pdf",
"https://exambazaar.s3.amazonaws.com/f4b1dee12babb548702a7aceb39ec279.pdf",
"https://exambazaar.s3.amazonaws.com/f4be41abb206062df938ac2afec9153d.pdf",
"https://exambazaar.s3.amazonaws.com/f57f778251b976dc67bd396f35a197d2.pdf",
"https://exambazaar.s3.amazonaws.com/f5b89d15ce7014991a22aed020b04f2b.pdf",
"https://exambazaar.s3.amazonaws.com/f5cbb2ee40ea00b6d5d260f9f7058f27.pdf",
"https://exambazaar.s3.amazonaws.com/f5d4a40dd3d677424d8455c8241f563f.pdf",
"https://exambazaar.s3.amazonaws.com/f5e4b237bcb1b11e3c9c1106a413218f.pdf",
"https://exambazaar.s3.amazonaws.com/f6a6d2de35d5d90c174e3f92cbd480c8.pdf",
"https://exambazaar.s3.amazonaws.com/f6c96822c52494a33f05e78a205345de.pdf",
"https://exambazaar.s3.amazonaws.com/f6d8bf825a94a811c81c6e4677fb3424.pdf",
"https://exambazaar.s3.amazonaws.com/f72420cb3c18ba2a73f969cd91088c06.pdf",
"https://exambazaar.s3.amazonaws.com/f809d72c889e8d4a199e4c20334d9302.pdf",
"https://exambazaar.s3.amazonaws.com/f86b3d9866850002c753b8488397a0c6.pdf",
"https://exambazaar.s3.amazonaws.com/f88d326fc105c2f09c78b462265f13ef.pdf",
"https://exambazaar.s3.amazonaws.com/f8b54f12b729f34fdb09434afdced7e5.pdf",
"https://exambazaar.s3.amazonaws.com/f8bf9f618b1a4d7cb3d8342d58c29313.pdf",
"https://exambazaar.s3.amazonaws.com/f8d5f1d8da80732158370e83481a1180.pdf",
"https://exambazaar.s3.amazonaws.com/f8df21de65ecee66b02ec43d196f20c0.pdf",
"https://exambazaar.s3.amazonaws.com/fa020160e442504304c6bb2e4f436d77.pdf",
"https://exambazaar.s3.amazonaws.com/fa2082a8dcfbbd9d9d27bf6dd499ee3d.pdf",
"https://exambazaar.s3.amazonaws.com/fa9beb748286b59ea18da8b7ac5bd2b9.pdf",
"https://exambazaar.s3.amazonaws.com/fb4aabb12a890ffa2403670d4b91ca6c.pdf",
"https://exambazaar.s3.amazonaws.com/fb5dac45f383a9af76ee696a9ce9dd5d.pdf",
"https://exambazaar.s3.amazonaws.com/fb7047984b5441760a2418db28d2a817.pdf",
"https://exambazaar.s3.amazonaws.com/fc1741fed9e7509cdadf14a22f2fc23a.pdf",
"https://exambazaar.s3.amazonaws.com/fc1f665ce447d8aba8117eea63a51d63.pdf",
"https://exambazaar.s3.amazonaws.com/fc3a1d6ceb292df23e2e5f5894bcc602.pdf",
"https://exambazaar.s3.amazonaws.com/fc40c711e5a4e67849f8b3956229f0e4.pdf",
"https://exambazaar.s3.amazonaws.com/fc977afa777232d1463f7d135cd566e8.pdf",
"https://exambazaar.s3.amazonaws.com/fcc3bad0fe56bc2cb7b715edaa167fba.pdf",
"https://exambazaar.s3.amazonaws.com/fd08520d997ac166de783f6f501fdc6c.pdf",
"https://exambazaar.s3.amazonaws.com/fd1c12ec28679a88664f2ca808978fd1.pdf",
"https://exambazaar.s3.amazonaws.com/fd708df69bbdeacba35c47c0fae31e9e.pdf",
"https://exambazaar.s3.amazonaws.com/fd90ce4290f342c3a5a073d854af4f28.pdf",
"https://exambazaar.s3.amazonaws.com/fe058d566d31451c19517b7c47575d12.pdf",
"https://exambazaar.s3.amazonaws.com/feb496f1daca108d6f7f5763c460d7c5.pdf",
"https://exambazaar.s3.amazonaws.com/fed1371990ed5265788890ed10f01422.pdf",
"https://exambazaar.s3.amazonaws.com/ff0e5363b681c989bcac23043c08bdde.pdf",
"https://exambazaar.s3.amazonaws.com/ffda7abff27f7868bd2f805b84bcf434.pdf",
"https://exambazaar.s3.amazonaws.com/ffe6d7d4254c3ad312e4b6501afbe8e4.pdf",

    ];
    res.json(true);
    var allTests = test
        .find({'url.answer': {$in: urls}}, {watermarked: 1, url: 1})
        //.deepPopulate('exam')
        .exec(function (err, allTests) {
        if (!err){
            console.log("There are: " + allTests.length + " tests!");
            
            allTests.forEach(function(existingTest, index){
                existingTest.watermarked = true;
                existingTest.save(function(err, existingTest) {
                    if (err) return console.error(err);
                    console.log(existingTest._id + " saved!");
                });
                
            });
        } else {throw err;}
    });
    
});

router.get('/flipwatermarked/:testId', function(req, res) {
    var testId = req.params.testId;
    var thisTest = test
        .findOne({'_id': testId}, {watermarked: 1})
        .exec(function (err, thisTest) {
        if (!err){
            if(thisTest){
                if(!thisTest.watermarked){
                    thisTest.watermarked = true;
                }else{
                    thisTest.watermarked = false;
                }
                
                thisTest.save(function(err, thisTest) {
                    if (err) return console.error(err);
                    console.log(thisTest._id + " saved! " + "Watermarked set to " + thisTest.watermarked);
                });
                
                res.json(thisTest.watermarked);
            }else{
                res.json(null);
            }
            //console.log(thisTest);
            
        } else {throw err;}
    });
    
});

module.exports = router;