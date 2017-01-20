var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var calendarSchema = mongoose.Schema({
    _institute: {type: mongoose.Schema.Types.ObjectId,ref: 'institute'},
    days: [{type: mongoose.Schema.Types.ObjectId,ref: 'day'}],
    name: {type: String,required: true}
});

var calendar = mongoose.model('calendar', calendarSchema);
module.exports = calendar;