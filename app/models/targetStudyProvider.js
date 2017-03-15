var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var targetStudyProviderSchema = mongoose.Schema({
    type: {type: String, default:'Coaching'},
    name: {type: String,required: true},
    targetStudyWebsite: String,
    website: String,
    email: [String],
    address: String,
    area: String,
    location: { type: Schema.ObjectId, ref: 'location' },
    city: String,
    state: String,
    pincode: String,
    logo: String,
    oldlogo: String,
    mobile: [String],
    phone: [String],
    results:[{
        exam: {type: Schema.ObjectId, ref: 'exam'},
        year: {type: String},
        name: {type: String},
        category: {type: String},
        rank: {type: String},
        percentile: {type: String},
        percentage: {type: String},
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
        entranceCriteria: {type: String},
        fees: {type: String, required: true},
        mode: {type: String,required: true},
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
    coursesOffered: [String],
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    rank: {type: Number,default: 0},
    ebNote: [{
        note: String,
        _added: { type: Date, default: Date.now }
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
