var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var bookAppointmentSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true  },
    institute: { type: Schema.ObjectId, ref: 'coaching' },
    exam: { type: Schema.ObjectId, ref: 'exam', required: true},
    _requestDate: { type: Date },
    _status: { type: String, default: 'Requested' }, //Request, Confirmed, Rescheduled
    _confirmation: [
        { 
            _date: { type: Date },
            _createdBy: { type: Schema.ObjectId, ref: 'User' },
            _created: { type: Date, default: Date.now },
        }
    ],
    course: {
        targetYear: { type: 'String' },
        groupname: { type: 'String' },
        name: { type: 'String' },
        city: { type: 'String' },
        duration: { type: 'String' },
    },
    _created: { type: Date, default: Date.now },
});
bookAppointmentSchema.plugin(deepPopulate);
var bookAppointment = mongoose.model('bookAppointment', bookAppointmentSchema);
module.exports = bookAppointment;