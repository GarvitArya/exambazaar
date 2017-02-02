var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var batchCalendarSchema = mongoose.Schema({
    _instituteCalendar: {type: mongoose.Schema.Types.ObjectId,ref: 'calendar'},
    _batch: {type: mongoose.Schema.Types.ObjectId,ref: 'batch'},
    extraHolidays: [date: {type: 'Moment',required: true}],
    extraWorkingdays: [date: {type: 'Moment',required: true}],
    name: {type: String,required: true}
});

var batchCalendar = mongoose.model('batchCalendar', batchCalendarSchema);
module.exports = batchCalendar;