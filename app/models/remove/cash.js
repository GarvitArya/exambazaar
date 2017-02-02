// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var cashSchema = mongoose.Schema({
    amount: {type: String,required: true},
    date: {type: Date},
});

cashSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('cash', cashSchema);
