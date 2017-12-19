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
    websitenotworking: {type: Boolean, default: false},
    
    studentbody:{
        placement: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        training_internship: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        academic_council: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        class_representative: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        student_council: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        student_welfare: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        alumni_association: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        hostel_affairs: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        cultural: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        sports: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        others: [{
            title: {type: String},
            name: {type: String},
            email: [{type: String}],
            mobile: [{type: String}],
            landline: [{type: String}],
        }],
        ebNote: [{
            note: String,
            user: { type: Schema.ObjectId, ref: 'User' },
            _added: { type: Date, default: Date.now }
        }],
    },
    website2: {type: String},
    _created: { type: Date, default: Date.now },
    
    
    
});
collegeSchema.plugin(deepPopulate);
module.exports = mongoose.model('college', collegeSchema);
