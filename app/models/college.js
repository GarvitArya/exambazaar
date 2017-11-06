var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var collegeSchema = mongoose.Schema({
    insti_id: {type: String, unique: true},
    inst_name: {type: String},
    Institute: Schema.Types.Mixed,
    Faculty: Schema.Types.Mixed,
    /*Course: Schema.Types.Mixed,
    Laboratory: Schema.Types.Mixed,
    Faculty: Schema.Types.Mixed,
    Library: Schema.Types.Mixed,
    Hostel: Schema.Types.Mixed,
    Ombudsman: Schema.Types.Mixed,
    
    Institute
    Course
    Laboratory
    Faculty
    Library
    Hostel
    Ombudsman
    Anti Ragging
    Student Count*/

    _created: { type: Date, default: Date.now }
});
collegeSchema.plugin(deepPopulate);
module.exports = mongoose.model('college', collegeSchema);
