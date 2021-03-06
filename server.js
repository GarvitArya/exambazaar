var express  = require('express');
var compression = require('compression');
var port     = process.env.PORT || 8000;
var path = require('path');
var mongoose = require('mongoose');
var Moment = require('moment');
require('mongoose-moment')(mongoose);
var passport = require('passport');
var flash   = require('req-flash');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var unirest = require('unirest');
var favicon = require('serve-favicon');
var configDB = require('./config/mydatabase.js');

var app = express();
app.use(compression({threshold : 0}));
app.use(cors());
app.use(favicon('./public/images/logo/favicon.ico'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

mongoose.connect(configDB.url,  { server: { socketOptions: { connectTimeoutMS: 10000 }}}, function(err) {
    if(err){
        console.log('Mongo DB Error: ' + err);
    }
});
require('./config/passport')(passport);
var prerender = require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'iVgzdEtOLriSvmSTfKFm').blacklisted(['^/ebinternal','^/availDiscount', '^/claim', '^/verifyClaim']);
prerender.crawlerUserAgents.push('dotbot');
prerender.crawlerUserAgents.push('ia_archiver');
app.use(prerender);


app.get('/*', function (req, res, next) {
    /*req.url.indexOf("/images/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("https://exambazaar.s3.amazonaws.com/") === 0 || req.url.indexOf('.js') != -1 ||*/
    
    if ( req.url.indexOf('.css') != -1 || req.url.indexOf('.ttf') != -1 || req.url.indexOf('.jpg') != -1 || req.url.indexOf('.png') != -1 || req.url.indexOf('.jpeg') != -1 || req.url.indexOf('.js') != -1 && req.url.indexOf('app.js') == -1 ) 
    {
        
        if(req.url.indexOf('exambazaar.s3.amazonaws.com')){
            //console.log('-------- Request is: ' + req.url);   
        }
       res.setHeader("Cache-Control", "max-age=691200000, public");
       res.setHeader("Expires", new Date(Date.now() + 691200000).toUTCString());
    }
   next();
});

var productionMode = true;

if(productionMode){
    app.get('*', function(req, res, next) {
        var host = req.get('host');
        if (req.get('x-forwarded-proto') != "https") {
            if(host.match(/^www\..*/i)){
                res.set('x-forwarded-proto', 'https');
                res.redirect(301, 'https://' + req.get('host') + req.url);
            }else{
                res.set('x-forwarded-proto', 'https');
                res.redirect(301, 'https://www.' + req.get('host') + req.url);
            }
        }else{
            if(host.match(/^www\..*/i)) {
                next();
            }else{
                res.set('x-forwarded-proto', 'https');
                res.redirect(301, 'https://www.' + req.get('host') + req.url);
            }
        }
    });
}



app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

var payment = require('./app/models/payment');
var instamojoCredential = require('./app/models/instamojoCredential');

/*app.get('/webhook/instamojo',function(req, res) {
    //console.log(req);
    console.log(req.body);
    var newPayment = new payment({});
    
    var newInstamojoCredential = new instamojoCredential({});
    newInstamojoCredential.xapikey = "23e3f27fe193706d864f99ba1cec0e86";
    newInstamojoCredential.xauthtoken = "367c4b36630a5a2a8807294abdf6e7cb";
    newInstamojoCredential.save(function(err, newPayment) {
        if (err) return console.error(err);
        console.log('New Instamojo Credentials saved: ' + newInstamojoCredential._id);
    });
    
    newPayment.details = {
        body: req.body,
        source: 'Instamojo',
    };
    newPayment.save(function(err, newPayment) {
        if (err) return console.error(err);
        console.log('New Payment Request saved: ' + newPayment._id);
    }); 
});*/


app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'exambazaar 2017',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./app/routes.js')(app, passport);
var providers = require('./app/providers.js',providers); 
var coachings = require('./app/coachings.js',coachings); 
var admissions = require('./app/admissions.js',admissions); 
var admissionInterests = require('./app/admissionInterests.js',admissionInterests); 
var cities = require('./app/cities.js',cities); 
var cbses = require('./app/cbses.js',cbses); 
var colleges = require('./app/colleges.js',colleges); 
var results = require('./app/results.js',results); 
var offers = require('./app/offers.js',offers); 
var coupons = require('./app/coupons.js',coupons); 
var reviews = require('./app/reviews.js',reviews); 
var upvotes = require('./app/upvotes.js',upvotes); 
var blogposts = require('./app/blogposts.js',blogposts); 
var blogTags = require('./app/blogTags.js',blogTags); 
var comments = require('./app/comments.js',comments); 
var contacts = require('./app/contacts.js',contacts); 
var groups = require('./app/groups.js',groups); 
var logourls = require('./app/logourls.js',logourls); 
var masters = require('./app/masters.js',masters);
var users = require('./app/users.js',users); 
var procmons = require('./app/procmons.js',procmons); 
var subscribers = require('./app/subscribers.js',subscribers); 
var notifications = require('./app/notifications.js',notifications); 
var publicationemails = require('./app/publicationemails.js',publicationemails); 
var emails = require('./app/emails.js',emails); 
var smss = require('./app/smss.js',smss);
var sitemaps = require('./app/sitemaps.js',sitemaps);
var otps = require('./app/otps.js',otps); 
var exams = require('./app/exams.js',exams); 
var tests = require('./app/tests.js',tests); 
var availDiscounts = require('./app/availDiscounts.js',availDiscounts); 

var questions = require('./app/questions.js',questions); 
var questionresponses = require('./app/questionresponses.js',questionresponses); 
var questionreporterrors = require('./app/questionreporterrors.js',questionreporterrors); 
var qmarkforreviews = require('./app/qmarkforreviews.js',qmarkforreviews); 
var qviews = require('./app/qviews.js',qviews); 
var cirffactors = require('./app/cirffactors.js',cirffactors); 
var assessments = require('./app/assessments.js',assessments); 
var eligibilitys = require('./app/eligibilitys.js',eligibilitys); 
var streams = require('./app/streams.js',streams); 
var urlslugs = require('./app/urlslugs.js',urlslugs); 
var locations = require('./app/locations.js',locations); 
var mediaTags = require('./app/mediaTags.js',mediaTags); 
var cisaveds = require('./app/cisaveds.js',cisaveds); 
var views = require('./app/views.js',views); 
var tofillcis = require('./app/tofillcis.js',tofillcis); 
var tofillcolleges = require('./app/tofillcolleges.js',tofillcolleges); 
var rateInstitutes = require('./app/rateInstitutes.js',rateInstitutes); 
var toverifycis = require('./app/toverifycis.js',toverifycis); 
var suggestCoachings = require('./app/suggestCoachings.js',suggestCoachings); 
var addContactInfos = require('./app/addContactInfos.js',addContactInfos); 
var images = require('./app/images.js',images); 
var awsCredentials = require('./app/awsCredentials.js',awsCredentials); 
var s3Utils = require('./app/s3Utils.js',s3Utils); 
var socialMediaCredentials = require('./app/socialMediaCredentials.js',socialMediaCredentials); 
var sendGridCredentials = require('./app/sendGridCredentials.js',sendGridCredentials); var bookAppointments = require('./app/bookAppointments.js',bookAppointments); 


app.use('/api/providers', providers);
app.use('/api/coachings', coachings);
app.use('/api/admissions', admissions);
app.use('/api/admissionInterests', admissionInterests);
app.use('/api/cities', cities);
app.use('/api/cbses', cbses);
app.use('/api/colleges', colleges);
app.use('/api/results', results);
app.use('/api/offers', offers);
app.use('/api/coupons', coupons);
app.use('/api/reviews', reviews);
app.use('/api/upvotes', upvotes);
app.use('/api/blogposts', blogposts);
app.use('/api/blogTags', blogTags);
app.use('/api/comments', comments);
app.use('/api/contacts', contacts);
app.use('/api/groups', groups);
app.use('/api/logourls', logourls);
app.use('/api/masters', masters);
app.use('/api/users', users);
app.use('/api/procmons', procmons);
app.use('/api/subscribers', subscribers);
app.use('/api/notifications', notifications);
app.use('/api/emails', emails);
app.use('/api/publicationemails', publicationemails);
app.use('/api/smss', smss);
app.use('/api/sitemaps', sitemaps);
app.use('/api/otps', otps);
app.use('/api/exams', exams);
app.use('/api/tests', tests);
app.use('/api/questions', questions);
app.use('/api/questionresponses', questionresponses);
app.use('/api/questionreporterrors', questionreporterrors);
app.use('/api/qmarkforreviews', qmarkforreviews);
app.use('/api/qviews', qviews);
app.use('/api/cirffactors', cirffactors);
app.use('/api/assessments', assessments);
app.use('/api/availDiscounts', availDiscounts);

app.use('/api/eligibilitys', eligibilitys);
app.use('/api/streams', streams);
app.use('/api/urlslugs', urlslugs);
app.use('/api/locations', locations);
app.use('/api/mediaTags', mediaTags);
app.use('/api/cisaveds', cisaveds);
app.use('/api/views', views);
app.use('/api/tofillcis', tofillcis);
app.use('/api/tofillcolleges', tofillcolleges);
app.use('/api/rateInstitutes', rateInstitutes);
app.use('/api/toverifycis', toverifycis);
app.use('/api/suggestCoachings', suggestCoachings);
app.use('/api/addContactInfos', addContactInfos);
app.use('/api/images', images);
app.use('/api/awsCredentials', awsCredentials);
app.use('/api/s3Utils', s3Utils);
app.use('/api/socialMediaCredentials', socialMediaCredentials);
app.use('/api/sendGridCredentials', sendGridCredentials);
app.use('/api/bookAppointments', bookAppointments);

var allStates = [
'/',
'/aroundme',
'/blog',
'/blogpost/:blogpostSlug',
'/claim/:coachingId',
'/about',
'/contact',
'/ebinternal/c/:nameslug/:areaslug',
'/ebinternal/analytics',
'/ebinternal/activeUsers/:userId',
'/ebinternal/addAwsCredential',
'/ebinternal/addEligibility',
'/ebinternal/addExam',
'/ebinternal/addGroup',
'/ebinternal/addLocation',
'/ebinternal/addMediaTag',
'/ebinternal/addOffer',
'/ebinternal/addQuestion/:testId',
'/ebinternal/:testId/q/:questionId',
'/ebinternal/addSendGridCredential',
'/ebinternal/addStream',
'/ebinternal/addSubscriber',
'/ebinternal/allOffers',
'/ebinternal/manageAppointment/:appointmentId',
'/ebinternal/appointments',
'/ebinternal/allreviews',
'/ebinternal/p4Explainer',
'/ebinternal/allblogtags',
'/ebinternal/allTests',
'/ebinternal/calendar',
'/ebinternal/charting',
'/ebinternal/coaching/database1/:city',
'/ebinternal/coaching/database2/:city',
'/ebinternal/coaching/providersWithAreas',
'/ebinternal/coachingGroupSummary',
'/ebinternal/colleges',
'/ebinternal/editcollege/:collegeId',
'/ebinternal/contacts',
'/ebinternal/edit/database1/:coachingId',
'/ebinternal/editblog/:blogpostId',
'/ebinternal/editExam/:examId',
/*'/ebinternal/error',*/
'/exam/:examName',
'/ebinternal/e/:examUrlSlug',
'/questionpapers',
'/qp',
'/previous-year-question-papers-for-competitive-exams',
'/questionpapers/:examName',
'/qp/:question_papers_urlslug',
'/ebinternal/extractEmails',
'/ebinternal/master/:masterId/addMaster',
'/ebinternal/master/:masterId/dashboard',
'/ebinternal/master/:masterId/manageUsers',
'/ebinternal/master/:masterId/sandbox2/:cityName',
'/ebinternal/master/:userId/addInstitute',
'/ebinternal/master/:userId/bulkDisable',
'/ebinternal/partner/:coachingId/offers',
'/ebinternal/partner/:userId/dashboard',
'/ebinternal/postBlog',
'/ebinternal/scheduleQAD/:userId',
'/ebinternal/search',
'/ebinternal/sitemap',
'/ebinternal/blogsitemap',
'/ebinternal/socialLogin',
'/ebinternal/user/:userId/:reviewId/availoffer',
'/ebinternal/user/:userId/addedInstitutes',
'/ebinternal/user/:userId/addedQuestions',
'/ebinternal/questionReportError',
'/ebinternal/user/:userId/filledColleges',
'/ebinternal/user/:userId/addIntern',
'/ebinternal/fci',
'/ebinternal/rci',
'/ebinternal/user/:userId/assignedToAddContactInfo',
'/ebinternal/user/:userId/assignedToRate',
'/ebinternal/user/:userId/assignedToVerify',
'/ebinternal/user/:userId/checkLogo/:pageNumber/',
'/ebinternal/user/:userId/coachingGroup',
'/exam-eligibility',
'/ebinternal/user/:userId/filled',
'/ebinternal/user/:userId/filledAll',
'/ebinternal/user/:userId/group',
'/ebinternal/profile',
'/ebinternal/cirf',
'/ebinternal/reviewed',
'/ebinternal/userAppointments',
'/ebinternal/userTests',
'/ebinternal/userInstitutes',
'/ebinternal/academics',
'/ebinternal/eqad/:examName/:eqadDate',
'/ebinternal/eqadSummary',
//'/career/aptitude',
'/career/:domainName',
'/assessment/:testId',
'/mobileassessment/:testId',
'/reportassessment/:testId',
'/mobilereportassessment/:testId',
'/ebinternal/testAssessment',
'/ebinternal/emailToPublications',
'/ebinternal/user/:userId/sendEmail',
'/ebinternal/user/:userId/shortlisted',
'/ebinternal/user/:userId/suggestCoaching',
'/ebinternal/userMarketing',
'/ebinternal/user/:userId/userSurvey',
'/ebinternal/user/:userId/viewed',
'/ebinternal/verify/:userId/',
'/ebinternal/why',
'/group/:categoryName/:subCategoryName/:cityName/:groupName',
'/ebinternal/availDiscount/:categoryName/:subCategoryName/:cityName/:groupName',
'/ebinternal/bookAppointment/:categoryName/:subCategoryName/:cityName/:groupName',
'/login',
'/privacy',
'/rankerswall/:examName/:year',
'/review',
'/signup',
'/stream',
'/stream/:categoryName',
'/stream/:categoryName/:subCategoryName',
'/topCoaching/:categoryName/:subCategoryName',
'/reviews/:top_coaching_urlslug',
'/stream/:categoryName/:subCategoryName/:cityName',
/*'/:topURLSlug',*/
'/:examslug/:cityslug',
'/ebinternal/school',
'/stream/:categoryName/:subCategoryName/:cityName/:coachingId',
'/thankyou',
'/verifyClaim/:coachingId',
'/verifyEmail/:userId',
'/pbcAdmission',    
'/pooja-bansal-classes-jaipur-admission-2018',
'/pbc',
'/iit-jee-pre-test',
'/2018',
    
];

var errorStates =['/ebinternal/error'];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

allStates.forEach(function(thisState) {
  app.get(thisState, function(req, res){
    res.sendFile(__dirname + '/views/index.html');
    });
});

errorStates.forEach(function(thisState) {
    app.get(thisState, function(req, res){
        console.log('State is: ' + thisState);
        res.status(404);
        // respond with html page
        if (req.accepts('html')) {
            res.render('error', { url: req.url });
            return;
        }
        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }
        // default to plain-text. send()
        res.type('txt').send('Not found');
    });
});
app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
      //console.log("req is " + req);
    res.render('error', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

var now = new Date();

var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 05, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000;
}
setTimeout(function(){
    procmons.helper();
    //procmons.procmon();
    console.log("It's time to send procmon email:");
}, millisTill10);

var milltillGroupRanking = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 01, 0, 0) - now;
if (milltillGroupRanking < 0) {
     milltillGroupRanking += 86400000;
}
setTimeout(function(){
    procmons.groupRanking();
}, milltillGroupRanking);

var milltillCityRanking = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 11, 0, 0) - now;
if (milltillCityRanking < 0) {
     milltillCityRanking += 86400000;
}
setTimeout(function(){
    procmons.cityRanking();
}, milltillCityRanking);

var milltillSponsoredRanking = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 21, 0, 0) - now;
if (milltillSponsoredRanking < 0) {
     milltillSponsoredRanking += 86400000;
}
setTimeout(function(){
    procmons.sponsoredRanking();
}, milltillSponsoredRanking);

var milltillTotalWithoutSponsorRanking = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 31, 0, 0) - now;
if (milltillTotalWithoutSponsorRanking < 0) {
     milltillTotalWithoutSponsorRanking += 86400000;
}
setTimeout(function(){
    procmons.totalWithoutSponsorRanking();
}, milltillTotalWithoutSponsorRanking);

var milltillTotalRanking = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 41, 0, 0) - now;
if (milltillTotalRanking < 0) {
     milltillTotalRanking += 86400000;
}
setTimeout(function(){
    procmons.totalRanking();
}, milltillTotalRanking);


var milltillCityPosition = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 01, 51, 0, 0) - now;
if (milltillCityPosition < 0) {
     milltillCityPosition += 86400000;
}
setTimeout(function(){
    procmons.cityPosition();
}, milltillCityPosition);

function doSomething()
{
    procmons.assessmentshelper();
}
setInterval(doSomething, 60*60*1000);


var server = app.listen(port);

console.log('Exambazaar loaded on port ' + port);