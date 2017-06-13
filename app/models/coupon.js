var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var couponSchema = mongoose.Schema({
    provider: { type: Schema.ObjectId, ref: 'targetStudyProvider' },
    offer: { type: Schema.ObjectId, ref: 'offer' },
    name: String,
    validfor: String,
    validityType: String,//'From date of issue by Exambazaar','Fixed Expiry Date'
    discountType: String, //'Percentage Discount','Flat Discount'
    validtyDuration: String, //in days
    fixedExpiryDate: String, //in months
    flatDiscount: String,
    flatSocialShareBenefit: String,
    percentageDiscount: String,
    percentageSocialShareBenefit: String,
    generationType: String,
    code: String,
    socialShareCode: String,
    
    user: { type: Schema.ObjectId, ref: 'user' },
    delivered: {
        state: { type: Boolean, default: false },
        _created: { type: Date, default: Date.now },
        _deliverDate: { type: Date },
        expiryDate: { type: Date },
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
    },
    _created: { type: Date, default: Date.now },
    
    
});
couponSchema.plugin(deepPopulate);
module.exports = mongoose.model('coupon', couponSchema);
