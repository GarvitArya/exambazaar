var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var assessmentSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    userRating: { type: Number },
    userRatingFeedback: {
        category: {type: String},
        feedback: {type: String},
    },
    test: { type: Schema.ObjectId, ref: 'test'},
    _start: { type: Date, default: Date.now },
    _end: { type: Date },
    _endwithbreak: { type: Date },
    submitted: { type: Boolean, default: false },
    _submit: { type: Date },
    
    info:{
        name: {type: String},
        mobile: {type: String},
        email: {type: String},
        address: {type: String},
        degree: {type: String},
        otherdegree: {type: String},
        stream: {type: String},
        otherstream: {type: String},
        agree: {type: Boolean, default: false },
    },
    evaluation: {
        questions:{
            attemped: {type: String},
            unattemped: {type: String},
            correct: {type: String},
            incorrect: {type: String},
            total: {type: String},
            attemptedPercentage: {type: String},
        },
        marked:{
            correct: [Schema.Types.Mixed],    
            incorrect: [Schema.Types.Mixed],    
            partiallycorrect: [Schema.Types.Mixed],    
        },
        score: {type: String},
        percentageScore: {type: String},
        accuracy: {type: String},
        _created: { type: Date, default: Date.now },
    },
    pbc:{
        coupon: {type: String},
        discountPercent: {type: String},
        _created: { type: Date, default: Date.now },
    }
});
assessmentSchema.plugin(deepPopulate);
module.exports = mongoose.model('assessment', assessmentSchema);
