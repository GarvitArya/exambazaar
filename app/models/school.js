var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schoolSchema = mongoose.Schema({
    board: { type: String, default: 'CBSE' },
    affilationNo: { type: String, required: true, unique: true },
    url: { type: String },
    data: Schema.Types.Mixed
    
    
});
module.exports = mongoose.model('school', schoolSchema);
