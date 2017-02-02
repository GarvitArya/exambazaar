var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var installmentSchema = mongoose.Schema({
    sNo: {type: String},
    type: {type: String,required: true},
    name: {type: String,required: true},
    startDate: {type: Date},
    dueDate: {type: Date,required: true}
});
module.exports = mongoose.model('installment', installmentSchema);
