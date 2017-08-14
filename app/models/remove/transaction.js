// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate')(mongoose);

// define the schema for our transaction model
var transactionSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, ref: 'institute' },
    _from: { type: Schema.ObjectId, ref: 'student' },
    _to: { type: Schema.ObjectId, ref: 'teacher' },
    name : String,
    type : String,
    description : String,
    amount : { type: String},
    date: { type: Date, required: true},
    status: { type: String, default: 'Active' },
    _created: { type: Date, default: Date.now }
});

transactionSchema.plugin(deepPopulate);
// create the model for transactions and expose it to our app
module.exports = mongoose.model('transaction', transactionSchema);
