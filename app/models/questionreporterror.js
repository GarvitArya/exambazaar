var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var questionreporterrorSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    test: { type: Schema.ObjectId, ref: 'test'},
    question: { type: Schema.ObjectId, ref: 'question'},
    subquestion: { type: String},
    reasons: { type: String },
    comment: { type: String},
    _created: { type: Date, default: Date.now },
    reviewed: { type: Boolean, default: false},
});
questionreporterrorSchema.plugin(deepPopulate);
module.exports = mongoose.model('questionreporterror', questionreporterrorSchema);
