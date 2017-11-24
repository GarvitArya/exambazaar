var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var questionresponseSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    question: { type: Schema.ObjectId, ref: 'question'},
    subquestion: { type: String},
    option: { type: String},
    _created: { type: Date, default: Date.now },
});
questionresponseSchema.plugin(deepPopulate);
module.exports = mongoose.model('questionresponse', questionresponseSchema);
