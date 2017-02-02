// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;
var addressSchema = mongoose.Schema({
    street: {type: String,required: true},
    city: {type: String},
    pincode: {type: String},
    tel: {type: String}
});

var teacherSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    basic: {
        salutation: {type: String},
        firstName: {type: String,required: true},
        lastName: {type: String},
        middleName: {type: String},
        gender: {type: String},
        dob: { type: Date}
    },
    contact: {
        mobile: {type: String,required: true},
        email: {type: String}
    },
    imageUrl: {type: String},
    lastLogin: { type: Date, default: Date.now },
    teaching: {
        primarySubject: {type: Schema.ObjectId, ref: 'globalSubject'},
        otherSubjects: [{type: Schema.ObjectId, ref: 'globalSubject'}]
    },
    address : addressSchema,
    batches: [{type: Schema.ObjectId, ref: 'batch'}],
    subjects: [{type: Schema.ObjectId, ref: 'subject'}],
    logins:[{type: 'Moment',required: true}],
    _created: { type: Date, default: Date.now }
    //to add education
});
teacherSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('teacher', teacherSchema);
