var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var internSchema = mongoose.Schema({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String, required: true},
    resume: {type: String, required: true},
    _created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('intern', internSchema);
