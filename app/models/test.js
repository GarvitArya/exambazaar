var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var testSchema = mongoose.Schema({
    name: {type: String},
    _actualdate: { type: Date },
    description: {type: String},
    year: {type: String},
    nQuestions: {type: String},
    duration: {type: String}, //in minutes
    maxScore: {type: String},
    instructions: [{type: String}],
    url: {
        question: {type: String, required:true},
        answer: {type: String},
    },
    screenshots: [{type: String}],
    exam: { type: Schema.ObjectId, ref: 'exam' },
    institute: { type: Schema.ObjectId, ref: 'coaching' },
    official: {type: Boolean},
    mockPaper: {type: Boolean},
    solved: {type: Boolean},
    questionWithAnswer: {type: Boolean},
    simulationrank: {type: Number},
    analyzeable : { type: Boolean, default: true},
    downloadable : { type: Boolean, default: false},
    verified : { type: Boolean, default: false},
    active : { type: Boolean, default: true},
    watermarked : { type: Boolean, default: false},
    simulate: {
        ready: { type: Boolean, default: false},
        comments: [{type: String}],
        sections:[Schema.Types.Mixed],
        _date: { type: Date, default: Date.now },
        
    },
    resettable: { type: Boolean, default: false},
    simulationactive: { type: Boolean, default: false},
    _created: { type: Date, default: Date.now },
});
testSchema.plugin(deepPopulate);
module.exports = mongoose.model('test', testSchema);
