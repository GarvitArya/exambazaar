var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var targetStudyProviderSchema = mongoose.Schema({
    type: {type: String, default:'Coaching'},
    name: {type: String,required: true},
    group: { type: Schema.ObjectId, ref: 'group' },
    groupName: {type: String},
    groupChecked: {type: Boolean,default: false},
    targetStudyWebsite: String,
    website: String,
    facebookPage: String,
    youtubeChannel: String,
    fbpage: String,
    email: [String],
    address: String,
    mapAddress: String,
    latlng: {
        lat: String,
        lng: String
    },
    latlngna: Boolean,
    area: String,
    location: { type: Schema.ObjectId, ref: 'location' },
    city: String,
    state: String,
    pincode: String,
    logoChecked:{type: Boolean,default: false},
    logo: String,
    newlogo: String,
    logoBackup: String,
    oldlogo: String,
    mobile: [String],
    phone: [String],
    listingSnapshot: String,
    results:[{
        exam: {type: Schema.ObjectId, ref: 'exam'},
        year: {type: String},
        name: {type: String},
        category: {type: String},
        rank: {type: String},
        percentile: {type: String},
        percentage: {type: String},
        marks: {type: String},
        passFail: {type: String},
        active: {type: Boolean,default: true},
        course: {type: Schema.ObjectId, ref: 'course'},
        image: {type: String},
        _added: { type: Date, default: Date.now }
    }],
    course:[{
        exam: {type: Schema.ObjectId, ref: 'exam'},
        duration: {type: String},
        name: {type: String,required: true},
        nSeats: {type: String},
        hoursPerWeek: {type: String},
        entranceCriteria: {type: String},
        fees: {type: String},
        feeType: {type: String},
        mode: {type: String},
        idealFor: {type: String, default:''},
        eligibility: {type: String, default:''},
        _added: { type: Date, default: Date.now }
    }],
    photo:[{
        image: {type: String,unique: true},
        title: {type: String,default:''},
        description: {type: String,default:''},
        active: {type: Boolean,default: true},
        tags: [{ type: Schema.ObjectId, ref: 'mediaTag' }],
        _added: { type: Date, default: Date.now }
    }],
    video:[{
        link: {type: String,unique: true},
        description: String,
        active: {type: Boolean,default: true},
        tags: [{ type: Schema.ObjectId, ref: 'mediaTag' }],
        _added: { type: Date, default: Date.now }
    }],
    faculty:[{
        name: String,
        image: {type: String,unique: true},
        active: {type: Boolean,default: true},
        subject: String,
        yearsExperience: String,
        qualification: String,
        description: String,
        exams: [{ type: Schema.ObjectId, ref: 'exam' }],
        tags: [{ type: Schema.ObjectId, ref: 'mediaTag' }],
        _added: { type: Date, default: Date.now }
        /* 
        number seats
        eligibility
          class
          cleared exam
        */
    }],
    primaryManagement:{
        name: {type: String},
        role: {type: String},
        mobile: {type: String},
        email: {type: String},
    },
    management:[{
        name: {type: String,required: true},
        role: {type: String},
        mobile: {type: String,required: true,unique: true},
        email: {type: String},
    }],
    coursesOffered: [String],
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    disabled: {type: Boolean,default: false},
    ebVerifyState: {type: String},
    ebVerify: [{
        state: String,
        user: { type: Schema.ObjectId, ref: 'User' },
        _added: { type: Date, default: Date.now }
    }],
    rank: {type: Number,default: 0},
    ebNote: [{
        note: String,
        user: { type: Schema.ObjectId, ref: 'User' },
        _added: { type: Date, default: Date.now }
    }],
    interested: [{
        user: { type: Schema.ObjectId, ref: 'User' },
        active: {type: Boolean,default: true},
        _date: { type: Date, default: Date.now }
    }],
    _saved:[{
        user: { type: Schema.ObjectId, ref: 'user' },
        _time: { type: Date, default: Date.now }
    }],
    _created: { type: Date, default: Date.now }
});


targetStudyProviderSchema.plugin(deepPopulate);
var targetStudyProvider = mongoose.model('targetStudyProvider', targetStudyProviderSchema);

module.exports = targetStudyProvider;
