// load the things we need
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var Schema = mongoose.Schema;
var addressSchema = mongoose.Schema({
    street: {type: String},
    city: {type: String},
    pincode: {type: String},
    tel: {type: String}
});

var studentSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    enrollmentNo: {type: String},
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
    finance:{
        fee: {type: Schema.ObjectId, ref: 'fee'}
    },
    parents: [{type: Schema.ObjectId, ref: 'parent'}],
    address : addressSchema,
    permanentAddress : addressSchema,
    transportVehicle: {type: Schema.ObjectId, ref: 'transportVehicle'},
    batch: {type: Schema.ObjectId, ref: 'batch'},
    logins:[{type: 'Moment',required: true}],
    _created: { type: Date, default: Date.now }
    //to add education
});

studentSchema.plugin(deepPopulate);
// create the model for users and expose it to our app
module.exports = mongoose.model('student', studentSchema);
