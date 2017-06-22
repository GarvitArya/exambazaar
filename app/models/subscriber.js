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
});

subscriberSchema.plugin(deepPopulate);
module.exports = mongoose.model('subscriber', subscriberSchema);
