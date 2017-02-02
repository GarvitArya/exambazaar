// load the things we need
var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var batchSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    name: {type: String,required: true},
    grade: {type: String,required: true},
    section: {type: String,required: true},
    batchTeacher: { type: Schema.ObjectId, ref: 'teacher' },
    students: [{ type: Schema.ObjectId, ref: 'student' }],
    subjects: [{ type: Schema.ObjectId, ref: 'subject' }],
    batchCalendar: {type: Schema.ObjectId, ref: 'batchCalendar'},
});

batchSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('batch', batchSchema);
