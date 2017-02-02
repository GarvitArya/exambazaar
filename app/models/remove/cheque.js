// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var chequeSchema = mongoose.Schema({
    bankName: {type: String,required: true},
    number: {type: String,required: true},
    date: {type: Date},
    amount: {type: String,required: true}
});

chequeSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('cheque', chequeSchema);
