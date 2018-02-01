var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var emailSchema = mongoose.Schema({
    institute: { type: Schema.ObjectId, ref: 'coaching', required: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    templateId : {type: String},
    fromEmail :{
        email: String,
        name: String
    },
    to : {type: String},
    response: {
        status: String,
        xMessageId: String,
        _date: { type: Date }
    },
    _date: { type: Date, default: Date.now }
});
emailSchema.plugin(deepPopulate);
module.exports = mongoose.model('email', emailSchema);
