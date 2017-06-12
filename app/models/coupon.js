var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var couponSchema = mongoose.Schema({
    provider: { type: Schema.ObjectId, ref: 'targetStudyProvider' },
    offer: { type: Schema.ObjectId, ref: 'offer' },
    name: String,
    validfor: String,
    validityType: String,//Fixed End Date
    discountType: String, //flat/percentage
    validtyDuration: String, //in days
    fixedExpiryDate: String, //in months
    flatDiscount: String,
    percentageDiscount: String,
    generationType: String,
    code: String,
    delivered: {
        state: { type: Boolean, default: false },
        _created: { type: Date, default: Date.now },
        _deliverDate: { type: Date },
        user: { type: Schema.ObjectId, ref: 'user' },
        expiry: { type: Date },
    },
    attemped: {
        state: { type: Boolean, default: false },
        _created: { type: Date, default: Date.now },
        _attemptDate: { type: Date },
    },
    redeemed: {
        state: { type: Boolean, default: false },
        _created: { type: Date, default: Date.now },
        _redeemDate: { type: Date },
    }
    _created: { type: Date, default: Date.now },
    
    
});
couponSchema.plugin(deepPopulate);
module.exports = mongoose.model('coupon', couponSchema);
