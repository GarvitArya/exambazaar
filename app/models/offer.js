var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var offerSchema = mongoose.Schema({
    provider: { type: Schema.ObjectId, ref: 'coaching' },
    name: String,
    tooltip: String,
    primaryContact: {
        name: String,       
        email: String,       
        mobile: String,       
    },
    otheremails: [String],
    othermobiles: [String],
    _start: { type: Date },
    _end: { type: Date },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
    
    coupons: [{ type: Schema.ObjectId, ref: 'coupon' }],
    
    
    
});
offerSchema.plugin(deepPopulate);
module.exports = mongoose.model('offer', offerSchema);
