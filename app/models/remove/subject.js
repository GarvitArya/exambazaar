var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var subjectSchema = mongoose.Schema({
    _batch: { type: Schema.ObjectId, required: true,ref: 'batch' },
    _teacher: { type: Schema.ObjectId, required: true,ref: 'teacher' },
    _secondTeacher: { type: Schema.ObjectId,ref: 'teacher' },
    _globalSubject: { type: Schema.ObjectId, required: true,ref: 'globalSubject' },
    _exams: [{ type: Schema.ObjectId,ref: 'exam' }]
});

// create the model for users and expose it to our app
subjectSchema.plugin(deepPopulate);
module.exports = mongoose.model('subject', subjectSchema);
