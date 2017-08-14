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
    what: {type: String},
    brochure: {type: String},
    website: {type: String},
    appear: {type: String},
    registration: {type: String},
    dates: {type: String},
    syllabus: {type: String},
    pattern: {type: String},
    preparation: {type: String},
    studysource: {type: String},
    previouspapers: {type: String},
    resultFormat: {type: String},
    qualify: {type: String},
    colleges: {type: String},
    doubts: {type: String},
    
    
    
    
    cycle: [{
        name: {type: String, required: true},
        description: {type: String},
        year: {type: String, required: true},
        cycleNumber: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String},
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
        active: {type: Boolean, default:'false'},

        examMode: {type: Boolean, default:'false'}, //true means online only, false means other than online also.
        
    }],
});
examSchema.plugin(deepPopulate);
module.exports = mongoose.model('exam', examSchema);