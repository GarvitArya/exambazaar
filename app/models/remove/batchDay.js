var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var batchDaySchema= mongoose.Schema({
    _day: {type: mongoose.Schema.Types.ObjectId,ref: 'day', required: true},
    present:[{type: mongoose.Schema.Types.ObjectId,ref: '_student'}],
    absent:[{type: mongoose.Schema.Types.ObjectId,ref: '_student'}]
    
});

var batchDay = mongoose.model('batchDay', batchDaySchema);
module.exports = batchDay;