var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var questionreporterrorSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    question: { type: Schema.ObjectId, ref: 'question'},
    subquestion: { type: String},
    _created: { type: Date, default: Date.now },
});
questionreporterrorSchema.plugin(deepPopulate);
module.exports = mongoose.model('questionreporterror', questionreporterrorSchema);
