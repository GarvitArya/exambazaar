// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our notification model
var notificationSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, ref: 'institute' },
    _batch: { type: Schema.ObjectId, ref: 'batch' },
    _student: { type: Schema.ObjectId, ref: 'student' },
    _teacher: { type: Schema.ObjectId, ref: 'teacher' },
    forDate: {type: 'Moment'},
    actionDate: {type: 'Moment'},
    creationDate: {type: 'Moment'},
    type : { type: String},
    text : { type: String},
    redirectState : { type: String},
    studentRead: [{ type: Schema.ObjectId, ref: 'student' }],
    teacherRead: [{ type: Schema.ObjectId, ref: 'teacher' }]
});
module.exports = mongoose.model('notification', notificationSchema);
