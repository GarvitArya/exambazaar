// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our otp model
var otpSchema = mongoose.Schema({
    _user: { type: Schema.ObjectId, ref: 'user' },
    mobile : { type: String,required: true},
    otp : { type: Number,required: true},
    reason : { type: String,required: true},
    generated_time: { type: Date, default: Date.now },
    expiry_time: { type: Date, default: Date.now }
});
module.exports = mongoose.model('OTP', otpSchema);
