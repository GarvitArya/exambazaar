var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    user: { type: Schema.ObjectId, ref: 'user' },
    emailSent: [Date],
    smsSent: [Date],
    _created: { type: Date, default: Date.now },
    invalidMobile: { type: Boolean, default: false },
});

subscriberSchema.plugin(deepPopulate);
module.exports = mongoose.model('subscriber', subscriberSchema);
