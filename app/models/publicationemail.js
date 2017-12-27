var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

//Emails sent to PR
var publicationemailSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    templateId : {type: String},
    publication: {type: String},
    contact : {
        name: {type: String},
        mobile: {type: String},
    },
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
publicationemailSchema.plugin(deepPopulate);
module.exports = mongoose.model('publicationemail', publicationemailSchema);
