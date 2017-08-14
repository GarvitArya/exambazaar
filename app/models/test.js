var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var testSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    year: {type: String},
    url: {
        question: {type: String, required:true},
        answer: {type: String},
    },
    screenshots: [{type: String}],
    exam: { type: Schema.ObjectId, ref: 'exam' },
    institute: { type: Schema.ObjectId, ref: 'targetStudyProvider' },
    official: {type: Boolean},
    mockPaper: {type: Boolean},
    solved: {type: Boolean},
    questionWithAnswer: {type: Boolean},
    
    verified : { type: Boolean, default: false},
    active : { type: Boolean, default: true},
    _created: { type: Date, default: Date.now },
});
testSchema.plugin(deepPopulate);
module.exports = mongoose.model('test', testSchema);
