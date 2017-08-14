var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sourceUrlSchema = mongoose.Schema({
    url: {type: String, unique: true},
    added: {type: Boolean, default: false}
});

module.exports = mongoose.model('sourceUrl', sourceUrlSchema);
