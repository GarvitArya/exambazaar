var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var paymentSchema = mongoose.Schema({
    details: Schema.Types.Mixed,
    _created: { type: Date, default: Date.now },
});

paymentSchema.plugin(deepPopulate);
var payment = mongoose.model('payment', paymentSchema);


module.exports = payment;
