var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var installmentSchema = mongoose.Schema({
    sNo: {type: String},
    type: {type: String,required: true},
    name: {type: String,required: true},
    startDate: {type: Date},
    dueDate: {type: Date,required: true}
});
var feeStructureSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    feeItems: [{ type: Schema.ObjectId, required: true,ref: 'globalFeeItem' }],
    installments: [installmentSchema]
});
module.exports = mongoose.model('feeStructure', feeStructureSchema);
