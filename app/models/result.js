var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var resultSchema = mongoose.Schema({
    provider: { type: Schema.ObjectId, ref: 'coaching'},
    exam: {type: Schema.ObjectId, ref: 'exam', required: true },
    year: {type: String},
    name: {type: String, required: true },
    category: {type: String},
    rank: {type: String},
    subgroup: {type: String},
    percentile: {type: String},
    percentage: {type: String},
    marks: {type: String},
    passFail: {type: String},
    active: {type: Boolean,default: true},
    course: {type: Schema.ObjectId, ref: 'course'},
    image: {type: String},
    _added: { type: Date, default: Date.now }
});
resultSchema.plugin(deepPopulate);
module.exports = mongoose.model('result', resultSchema);
