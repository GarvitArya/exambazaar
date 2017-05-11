var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var eligibilitySchema = mongoose.Schema({
    exam: { type: Schema.ObjectId, ref: 'exam', required: true },
    courseLevel: { type: String},
    recommendedFor: { type: String},
    ageRelaxationApplicable: { type: String},
    active: { type: Boolean, default: true},
    category:{
        applicable: { type: Boolean, default: false},
        general: { type: Boolean, default: false},
        sc: { type: Boolean, default: false},
        st: { type: Boolean, default: false},
        obc: { type: Boolean, default: false},
        pwd: { type: Boolean, default: false}
    },
    age:{
        applicable: { type: Boolean, default: false},
        minage: { type: Number, default: 0},
        maxage: { type: Number, default: 99}
    },
    class12Subjects:{
        applicable: { type: Boolean, default: false},
        biology: { type: Boolean, default: false},
        chemistry: { type: Boolean, default: false},
        biotechnology: { type: Boolean, default: false},
        physics: { type: Boolean, default: false},
        mathematics: { type: Boolean, default: false},
        english: { type: Boolean, default: false}
    },
    class12Percentage:{
        applicable: { type: Boolean, default: false},
        passRequired: { type: Boolean},
        minPercentage: { type: Number}
    },
    undergradMajor:{
        applicable: { type: Boolean, default: false},
        mbbs: {type: Boolean, default: false},
        bds: { type: Boolean, default: false},
        bsc: { type: Boolean, default: false},
        bftech: { type: Boolean, default: false},
        be: { type: Boolean, default: false},
        btech: { type: Boolean, default: false},
        bcom: { type: Boolean, default: false},
        ba: { type: Boolean, default: false},
        barch: { type: Boolean, default: false},
        llb: { type: Boolean, default: false},
        fiveyearintegratedllb: { type: Boolean, default: false},
        fiveyearballb: { type: Boolean, default: false},
        lawdegreeequivalenttollb: { type: Boolean, default: false},
        professionalcourseequivalenttobtech: { type: Boolean, default: false},
    },
    undergradQualifications:{
        cacpt: {type: Boolean, default: false},
        caipcc: {type: Boolean, default: false},
        icwai: {type: Boolean, default: false},
        csfoundation: {type: Boolean, default: false},
        csexecutive: {type: Boolean, default: false},
    },
    undergradPercentage:{
        applicable: { type: Boolean, default: false},
        passRequired: { type: Boolean},
        minPercentage: { type: Number}
    },
    postgradMajor:{
        applicable: { type: Boolean, default: false},
        mcom: {type: Boolean, default: false},
        msc: {type: Boolean, default: false},
        ma: {type: Boolean, default: false},
        mca: {type: Boolean, default: false},
        mtech: {type: Boolean, default: false},
        mba: {type: Boolean, default: false},
        ms: {type: Boolean, default: false},
        llm: {type: Boolean, default: false},
    },
    postgradQualifications:{
        sectiona: {type: Boolean, default: false},
        sectionab: {type: Boolean, default: false},
        graduatemembership: {type: Boolean, default: false},
        intermediateexamination: {type: Boolean, default: false},
        cafinal: {type: Boolean, default: false},
        csprofessional: {type: Boolean, default: false},
    },
    postgradPercentage:{
        applicable: { type: Boolean, default: false},
        passRequired: { type: Boolean},
        minPercentage: { type: Number}
    },
    level: { type: Number},
    notes: { type: String},
    fulltext: { type: String},
    qualifications: { type: String},
    finalyear: {type: Boolean, default: false},
    nationality: {type: Boolean, default: false},
    nri: {type: Boolean, default: false},
});
eligibilitySchema.plugin(deepPopulate);
module.exports = mongoose.model('eligibility', eligibilitySchema);
