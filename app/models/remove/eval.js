var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var evalSchema = mongoose.Schema({
    _exam: { type: Schema.ObjectId, required: true,ref: 'exam' },
    _student: { type: Schema.ObjectId,required: true,unique:false,ref: 'student' },
    score: {type: String},
    feedback: {type: String},
    absent: {type: Boolean}
});

evalSchema.plugin(deepPopulate);
module.exports = mongoose.model('eval', evalSchema);
