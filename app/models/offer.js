var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var offerSchema = mongoose.Schema({
    provider: { 
        name: String,
        website: String,
        logo: String,
        description: String,
    },
    manager:{
        name: String,
        mobile: String,
        email: String,
    },
    coupons: {
        couponType: String, //flat/percentage
        discount:{
            flat: String,
            percentage: String,
        },
        _created: { type: Date, default: Date.now },
        code: String,
        delivered: {
            state: { type: Boolean, default: false },
            _created: { type: Date, default: Date.now },
            _deliverDate: { type: Date },
            user: { type: Schema.ObjectId, ref: 'user' }
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
    },
    active: { type: Boolean, default: true },
    expiry: { type: Date },
    _created: { type: Date, default: Date.now },
});
offerSchema.plugin(deepPopulate);
module.exports = mongoose.model('offer', offerSchema);
