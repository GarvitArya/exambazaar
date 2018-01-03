var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var questionSchema = mongoose.Schema({
    _groupOfQuestions: { type: Boolean, default: false},
    _startnumber: {type: String}, //starting question number in the pdf
    _endnumber: {type: String}, //ending question number in the pdf
    _hascontext: { type: Boolean, default: false},
    //_multipleCorrect: { type: Boolean, default: false}, //if MCQ has more than 1 correct options
    
    context: {type: String},
    images: [{type: String}],
    questions: [{
        type: {type: String}, //mcq or numerical
        numericalAnswers: [{type: String}], //all answers are correct
        numericalAnswerType: {type: String, default: 'Exact'}, //Exact for exact match, Range for within the range
        numericalAnswerRange:{
            min: {type: Number},
            max: {type: Number},
            
        },
        question: {type: String},
        options: [{
            option: {type: String},
            _onlyImage: { type: Boolean, default: false},
            _correct: { type: Boolean, default: false},
            image: {type: String},
        }],
        solution: {
            solution: {type: String},
            images: [{type: String}],
        },
        marking: {
            correct: {type: String},
            incorrect: {type: String},
        },
        //answer: {type: String},
        images: [{type: String}],
    }],
    test: { type: Schema.ObjectId, ref: 'test'},
    exam: { type: Schema.ObjectId, ref: 'exam'},
    
    active : { type: Boolean, default: true},
    _answerExists : { type: Boolean, default: false},
    _readyToPublish : { type: Boolean, default: false},
    _created: { type: Date, default: Date.now },
    _createdBy: { type: Schema.ObjectId, ref: 'user' },
});
questionSchema.plugin(deepPopulate);
module.exports = mongoose.model('question', questionSchema);
