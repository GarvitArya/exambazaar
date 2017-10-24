var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var contactSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    about: {type: String, required: true},
    message: {type: String, required: true},
       
});
contactSchema.plugin(deepPopulate);
module.exports = mongoose.model('contact', contactSchema);