var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var daySchema= mongoose.Schema({
    _calendar: {type: mongoose.Schema.Types.ObjectId,ref: 'calendar', required: true},
    date: {type: 'Moment',required: true},
    academicHoliday: Boolean,
    academicHolidayDesc: {type: String},
    eventDay: Boolean,
    eventDayDesc: {type: String},
    _attendance: {
        present:[{type: mongoose.Schema.Types.ObjectId,ref: '_student'}],
        absent:[{type: mongoose.Schema.Types.ObjectId,ref: '_student'}]
    }
});

var day = mongoose.model('day', daySchema);
module.exports = day;