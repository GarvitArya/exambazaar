// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var instituteFeeItemsSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    items: [{ type: Schema.ObjectId, required: true,ref: 'feeItem' }],
    type: {type: String}
});

instituteFeeItemsSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('instituteFeeItems', instituteFeeItemsSchema);
