var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var questionSchema = mongoose.Schema({
    text: {type: String},
    image: {type: String},
    otherimages: [{type: String}],
    options: [{type: String}],
    test: { type: Schema.ObjectId, ref: 'test'},
    exam: { type: Schema.ObjectId, ref: 'exam'},
    explanation: {type: String},
    answer: {type: String},
    active : { type: Boolean, default: true},
    _created: { type: Date, default: Date.now },
});
questionSchema.plugin(deepPopulate);
module.exports = mongoose.model('question', questionSchema);
