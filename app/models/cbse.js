var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var cbseSchema = mongoose.Schema({
    affilationNo: { type: String, required: true, unique: true },
    _createdBy: { type: Schema.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('cbse', cbseSchema);
