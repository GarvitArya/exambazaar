var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var blogpostSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, required: true, ref: 'User' },
    /*upvotes: [{ type: Schema.ObjectId, ref: 'upvote' }],*/
    readingTime:{
        text: String,    
        minutes: String,    
        time: String,    
        words: String,    
    },
    coverPhoto: String,
    infographic: String,
    urlslug: { type: String, unique: true },
    title: String,
    subtitle:String,
    content: String,
    blogTags:[{ type: Schema.ObjectId, ref: 'blogTag' }],
    blogSeries: String,
    
    exams: [{ type: Schema.ObjectId, ref: 'exam' }],
    coachingGroups: [String],
    active: { type: Boolean, default: false },
    _created: { type: Date, default: Date.now },
    _published: { type: Date },
    _saved: [{
        autosave: { type: Boolean, default: false },
        user: { type: Schema.ObjectId, ref: 'User' }, //required: true, 
        title: String,
        content: String,
        coverPhoto: String,
        blogTags:[{ type: Schema.ObjectId, ref: 'blogTag' }],
        blogSeries: String,
        exams: [{ type: Schema.ObjectId, ref: 'exam' }],
        coachingGroups: [String],
        active: { type: Boolean, default: false },
        _date:{ type: Date, default: Date.now },
    }],
    _autosaved: {
        autosave: { type: Boolean, default: false },
        user: { type: Schema.ObjectId, ref: 'User' }, //required: true,
        title: String,
        content: String,
        coverPhoto: String,
        blogTags:[{ type: Schema.ObjectId, ref: 'blogTag' }],
        blogSeries: String,
        exams: [{ type: Schema.ObjectId, ref: 'exam' }],
        coachingGroups: [String],
        active: { type: Boolean, default: false },
        _date:{ type: Date, default: Date.now },
    },
    flipboard:{
        published: { type: Boolean, default: false },
        _date:{ type: Date },
    },
    seoKeywords: String,
    seoDescription: String,
    
});
blogpostSchema.plugin(deepPopulate);
module.exports = mongoose.model('blogpost', blogpostSchema);
