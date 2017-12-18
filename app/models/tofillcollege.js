var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var tofillcollegeSchema = mongoose.Schema({
    college: { type: Schema.ObjectId, ref: 'college', required: true, unique: true },
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    active: { type: Boolean, default: true },
    _created: { type: Date, default: Date.now },
    _deadline: { type: Date},
    _finished: { type: Date}
});

tofillcollegeSchema.plugin(deepPopulate);
module.exports = mongoose.model('tofillcollege', tofillcollegeSchema);
