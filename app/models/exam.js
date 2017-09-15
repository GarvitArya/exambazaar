var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var examSchema = mongoose.Schema({
    name: {type: String,required: true,unique:true},
    displayname: {type: String},
    frequency: {type: String},
    logo: String,
    briefDescription: {type: String},
    active: {type: Boolean, default:'false'},
    rank: {type: Number},
    stream: { type: Schema.ObjectId, ref: 'stream' },
    resultFormat: {type: String},
    website: {type: String},
    
    registration:{
        website: {type: String},
        mode: {type: String},
        fee:{
            general_obc: {type: String},
            sc_st_ph: {type: String},
            females: {type: String},
            paymentModes: [{type: String}],
        },
        otherInformation:{type: String},
    },
    /*what: {type: String},
    brochure: {type: String},
    appear: {type: String},
    registration: {type: String},
    dates: {type: String},
    syllabus: {type: String},
    pattern: {type: String},
    preparation: {type: String},
    studysource: {type: String},
    previouspapers: {type: String},
    qualify: {type: String},
    colleges: {type: String},
    doubts: {type: String},*/
    
    links:[{
        url: {type: String},
        description: {type: String},
    }],
    cycle: [{
        name: {type: String, required: true},
        description: {type: String},
        year: {type: String, required: true},
        cycleNumber: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String},
        active: {type: Boolean, default:'false'},
        studentsAppearing: {type: String},
        studentSeats: {type: String},
        brochure: [{
            name: {type: String},
            description: {type: String},
            url: {type: String, required: true},
        }],
        syllabus: [{
            name: {type: String},
            description: {type: String},
            url: {type: String, required: true},
        }],
        docs: [{
            name: {type: String},
            description: {type: String},
            url: {type: String, required: true},
        }],
        
        
        examMode: {type: Boolean, default:'false'}, //true means online only, false means other than online also.
        examMode2: {type: String},
        
        examSteps:[{
            name: {type: String},
            otherName: {type: String},
            description: {type: String},
            stepType: {type: String}, //Written, Counselling, Interview
            registration:{
                dateRangeBool: {type: Boolean, default:'false'},
                timeRangeBool: {type: Boolean, default:'false'}, //true is full day
                dateRange:{
                    startDate: { type: Date },
                    endDate: { type: Date },
                },
                dateArray:[{ type: Date }],
                allDates:[{ type: Date }],
                timeRange:[{
                    startTime: { type: String },
                    endTime: { type: String },
                }],
                dates:[{
                    start: { type: Date },
                    end: { type: Date },
                    name: { type: String },
                }],
            },
            stepDate:{
                dateRangeBool: {type: Boolean, default:'false'},
                timeRangeBool: {type: Boolean, default:'false'}, //true is full day
                dateRange:{
                    startDate: { type: Date },
                    endDate: { type: Date },
                },
                dateArray:[{ type: Date }],
                allDates:[{ type: Date }],
                timeRange:[{
                    startTime: { type: String },
                    endTime: { type: String },
                }],
                dates:[{
                    start: { type: Date },
                    end: { type: Date },
                    name: { type: String },
                }],
            },
        }],
        examStepInstructions: { type: String },
        steps: {
            registration: {type: Boolean},
            admitCard: {type: Boolean},
            examDate: {type: Boolean},
            writtenResultDate: {type: Boolean},
            counselling: {type: Boolean},
            interview: {type: Boolean},
            finalResultDate: {type: Boolean},
            text: {type: String}
        },
        examdates:{
            registration:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                endwithlatefees: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            admitCard:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            examDate:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            writtenResultDate:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            counselling:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            interview:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
            finalResultDate:{
                start: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                end: {
                    _date: { type: Date },
                    tentative: {type: Boolean, default:'false'},
                    applicable: {type: Boolean, default:'false'},
                },
                text: {type: String},
            },
        },
        
        
    }],
});
examSchema.plugin(deepPopulate);
module.exports = mongoose.model('exam', examSchema);