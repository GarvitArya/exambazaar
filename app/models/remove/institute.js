var mongoose = require('mongoose');
var Moment = require('moment');
//require('mongoose-moment')(mongoose);
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(mongoose.connection);




var addressSchema = mongoose.Schema({
    street: {type: String,required: true},
    city: {type: String,required: true},
    pincode: {type: String,required: true},
    tel: {type: String,required: false}
});

var batchSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    name: {type: String,required: true},
    grade: {type: String,required: true},
    section: {type: String,required: true},
    batchTeacher: String
});
var transportVehicleSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    type : { type: String},
    registration : { type: String},
    driver: {
        name: { type: String,required: true},   
        mobile: {type: String,required: true},
        address : addressSchema
    },
    owner: {
        name: { type: String,required: true},   
        mobile: {type: String,required: true},
        address : addressSchema
    },
    _created: { type: Date, default: Date.now }
});

//fee module
var installmentSchema = mongoose.Schema({
    sNo: {type: String},
    type: {type: String,required: true},
    name: {type: String,required: true},
    startDate: {type: Date},
    dueDate: {type: Date,required: true}
});
var feeStructureSchema = mongoose.Schema({
    _institute: { type: Schema.ObjectId, required: true,ref: 'institute' },
    feeItems: [{ type: Schema.ObjectId, required: true,ref: 'globalFeeItem' }],
    installments: [installmentSchema]
});


var instituteSchema = mongoose.Schema({
    //_id: {type: Number,required: true,default: 1,unique:true},
    basic: {
        type: {type: String,required: true},
        affiliation: {type: String},
        name: {type: String,required: true},
        website: String,
        email: String,
        about: String
    },
    address : addressSchema,
    batches: [{type: Schema.ObjectId, ref: 'batch'}],
    teachers: [{type: Schema.ObjectId, ref: 'teacher'}],
    students: [{type: Schema.ObjectId, ref: 'student'}],
    admins: [{type: Schema.ObjectId, ref: 'admin'}],
    transportVehicles: [{type: Schema.ObjectId, ref: 'transportVehicle'}],
    feeStructure: feeStructureSchema,
    transactions: [{type: Schema.ObjectId, ref: 'transaction'}],
    updated: { type: Date, default: Date.now },
    calendar: {type: Schema.ObjectId, ref: 'calendar'},
    _created: { type: Date, default: Date.now }
});
//instituteSchema.plugin(autoIncrement.plugin,'institute');
// create the model for users and expose it to our app

instituteSchema.plugin(deepPopulate);
var institute = mongoose.model('institute', instituteSchema);

module.exports = institute;
