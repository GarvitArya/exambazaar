var express  = require('express');
//var redirect = require("express-redirect");
var compression = require('compression');

var port     = process.env.PORT || 8000;
var path = require('path');


//redirect(app); 
/*
var childProcess = require( "child_process" );
var phantomjs = require( "phantomjs" );
var binPath = phantomjs.path;
*/
var app      = express();


var mongoose = require('mongoose');
var Moment = require('moment');
require('mongoose-moment')(mongoose);
var passport = require('passport');
var flash        = require('req-flash');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');



var session      = require('express-session');
var cors = require('cors');
var unirest = require('unirest');
app.use(cors());

var favicon = require('serve-favicon');
app.use(favicon('./public/images/logo/favicon.ico'));

var configDB = require('./config/mydatabase.js');



/*var Tesseract = require('tesseract.js')
var filename = 'pic.png'

Tesseract.recognize(filename)
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
    console.log(result.text);
    process.exit(0);
});*/

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));


//mongoose.connect(configDB.url);
mongoose.connect(configDB.url,  { server: { socketOptions: { connectTimeoutMS: 10000 }}}, function(err) {
    if(err){
        console.log('Mongo DB Error: ' + err);
    }
    
});
require('./config/passport')(passport);

app.use(require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'iVgzdEtOLriSvmSTfKFm').blacklisted('^/claim'));

app.use(compression({threshold : 0}));
app.get('/*', function (req, res, next) {
    /*req.url.indexOf("/images/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("https://exambazaar.s3.amazonaws.com/") === 0 || req.url.indexOf('.js') != -1 ||*/
    if ( req.url.indexOf('.css') != -1 || req.url.indexOf('.ttf') != -1 || req.url.indexOf('.jpg') != -1 || req.url.indexOf('.png') != -1 || req.url.indexOf('.jpeg') != -1) {
        //console.log('Request is: ' + req.url);
        res.setHeader("Cache-Control", "max-age=2592000, public");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
        next();
});


/*app.get('*', function(req, res, next) {
    if (req.get('x-forwarded-proto') != "https") {
        res.set('x-forwarded-proto', 'https');
        res.redirect('https://' + req.get('host') + req.url);
    } else {
        next();     
    }
});*/



app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


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
//var institutes = require('./app/institutes.js',institutes); 
var providers = require('./app/providers.js',providers); 
var targetStudyProviders = require('./app/targetStudyProviders.js',targetStudyProviders); 
var results = require('./app/results.js',results); 
var offers = require('./app/offers.js',offers); 
var coupons = require('./app/coupons.js',coupons); 
var reviews = require('./app/reviews.js',reviews); 
var upvotes = require('./app/upvotes.js',upvotes); 
var blogposts = require('./app/blogposts.js',blogposts); 
var blogTags = require('./app/blogTags.js',blogTags); 
var comments = require('./app/comments.js',comments); 
var groups = require('./app/groups.js',groups); 
var logourls = require('./app/logourls.js',logourls); 
var masters = require('./app/masters.js',masters); 
//var admins = require('./app/admins.js',admins); 
//var students = require('./app/students.js',students); 

var users = require('./app/users.js',users); 
var procmons = require('./app/procmons.js',procmons); 
var subscribers = require('./app/subscribers.js',subscribers); 

var notifications = require('./app/notifications.js',notifications); 
var emails = require('./app/emails.js',emails); 
var smss = require('./app/smss.js',smss);
var otps = require('./app/otps.js',otps); 
var exams = require('./app/exams.js',exams); 
var tests = require('./app/tests.js',tests); 
var questions = require('./app/questions.js',questions); 
var eligibilitys = require('./app/eligibilitys.js',eligibilitys); 
var streams = require('./app/streams.js',streams); 
var locations = require('./app/locations.js',locations); 
var mediaTags = require('./app/mediaTags.js',mediaTags); 
var cisaveds = require('./app/cisaveds.js',cisaveds); 
var views = require('./app/views.js',views); 
var tofillcis = require('./app/tofillcis.js',tofillcis); 
var rateInstitutes = require('./app/rateInstitutes.js',rateInstitutes); 
var toverifycis = require('./app/toverifycis.js',toverifycis); 
var suggestCoachings = require('./app/suggestCoachings.js',suggestCoachings); 
var addContactInfos = require('./app/addContactInfos.js',addContactInfos); 
var images = require('./app/images.js',images); 
var awsCredentials = require('./app/awsCredentials.js',awsCredentials); 
var socialMediaCredentials = require('./app/socialMediaCredentials.js',socialMediaCredentials); 
var sendGridCredentials = require('./app/sendGridCredentials.js',sendGridCredentials); 


app.use('/api/providers', providers);
app.use('/api/targetStudyProviders', targetStudyProviders);
app.use('/api/results', results);
app.use('/api/offers', offers);
app.use('/api/coupons', coupons);
app.use('/api/reviews', reviews);
app.use('/api/upvotes', upvotes);
app.use('/api/blogposts', blogposts);
app.use('/api/blogTags', blogTags);
app.use('/api/comments', comments);
app.use('/api/groups', groups);
app.use('/api/logourls', logourls);
//app.use('/api/admins', admins);
app.use('/api/masters', masters);
//app.use('/api/students', students);
app.use('/api/users', users);
app.use('/api/procmons', procmons);
app.use('/api/subscribers', subscribers);
app.use('/api/notifications', notifications);
app.use('/api/emails', emails);
app.use('/api/smss', smss);
app.use('/api/otps', otps);
app.use('/api/exams', exams);
app.use('/api/tests', tests);
app.use('/api/questions', questions);
app.use('/api/eligibilitys', eligibilitys);
app.use('/api/streams', streams);
app.use('/api/locations', locations);
app.use('/api/mediaTags', mediaTags);
app.use('/api/cisaveds', cisaveds);
app.use('/api/views', views);
app.use('/api/tofillcis', tofillcis);
app.use('/api/rateInstitutes', rateInstitutes);
app.use('/api/toverifycis', toverifycis);
app.use('/api/suggestCoachings', suggestCoachings);
app.use('/api/addContactInfos', addContactInfos);
app.use('/api/images', images);
app.use('/api/awsCredentials', awsCredentials);
app.use('/api/socialMediaCredentials', socialMediaCredentials);
app.use('/api/sendGridCredentials', sendGridCredentials);


var allStates = ['/','/login','/signup','/review','/search','/allreviews','/allOffers','/rankerswall/:examName/:year','/socialLogin','/contacts', '/extractEmails','/coachingGroupSummary','/rentvsbuy','/charting','/aroundme','/blog','/:userId/postBlog', '/:userId/activeUsers','/:userId/scheduleQAD','/:userId/allTests','/reviewcenter/:coachingId','/blogpost/:blogpostid','/editblog/:blogpostid','/stream','/stream/:categoryName','/stream/:categoryName/:subCategoryName/','/stream/:categoryName/:subCategoryName/:cityName','/stream/:categoryName/:subCategoryName/:cityName/:coachingId','/group/:categoryName/:subCategoryName/:cityName/:groupName','/oldclaim/:coachingId','/claim/:coachingId','/verifyClaim/:coachingId','/user/:userId/sandbox','/user/:userId/coachingGroup','/user/:userId/suggestCoaching','/master/:masterId/sandbox2/:cityName','/user/:userId/eligibility','/privacy','/why','/about','/calendar','/:instituteId/bulkAddStudents','/:instituteId/bulkAddTeachers','/:instituteId/bulkAddBatches','/:instituteId/instituteCalendar','/:batchId/batchCalendar','/admin/:adminId/main','/user/:userId/sendEmail','/user/:userId/userMarketing','/user/:userId/userSurvey','/master/:masterId/main','/coaching/database2/:city','/internship','/account','/edit/database1/:coachingId','/coaching/providersWithAreas','/coaching/database1/:city','/master/:masterId/analytics','/master/:masterId/institutes','/master/:masterId/dashboard','/master/:masterId/tofill','/partner/:userId/dashboard', '/partner/:userId/offers','/master/:masterId/manageBatchStudents','/master/:masterId/manageInstituteStudents','/master/:masterId/addGlobalSubject','/master/:masterId/invalidusers','/master/:masterId/addGlobalFeeItem','/master/:masterId/mergeUsers','/master/:masterId/invalidParents','/master/:masterId/invalidTeachers','/institute/:instituteId','/institute-batches/:instituteId','/institute-teachers/:instituteId','/institute-students/:instituteId','/student/:studentId/main','/student/:studentId/attendance','/student/:studentId/class','/user/:userId/shortlisted','/user/:userId/viewed','/user/:userId/reviewed','/user/:userId/:reviewId/availoffer','/thankyou','/user/:userId/filled','/user/:userId/assigned','/user/:userId/assignedToVerify','/user/:userId/addedInstitutes','/user/:userId/addedQuestions','/user/:userId/assignedToAddContactInfo','/user/:userId/assignedToRate','/user/:userId/filledAll','/user/:userId/group','/user/:userId/profile','/user/:userId/checkLogo/:pageNumber/','/student/:studentId/subjects','/:instituteId/addTeacher','/:instituteId/addAdmin','/addStream','/addOffer','/addLocation','/addMediaTag','/addGroup','/addAwsCredential','/addSendGridCredential','/addSubscriber','/addExam','/:examId/editExam','/:testId/addQuestion','/addEligibility','/master/:masterId/addMaster','/master/:masterId/manageUsers','/master/:userId/addInstitute','/master/:userId/bulkDisable','/user/:userId/addIntern','/sitemap','/:instituteId/addStudent','/:instituteId/addTransportVehicle','/:instituteId/addBatch','/:instituteId/feeStructure','/verify/:userId/','/chooselogin/:userId/','/subject/:subjectId','/eval/:evalId','/exam/:examId','/batch/:batchId','/batch/:batchId/attendance'
];


//app.redirect("/?_escaped_fragment_=", "/start?_escaped_fragment_=", 301);
//app.redirect("/?_escaped_fragment_=", "/stream", 301);
//app.redirect("/start", "/stream", 301);



app.use(function(req, res, next) {
    //console.log("Req is: " + req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//https://ebprerender.herokuapp.com/
//https://service.prerender.io/
allStates.forEach(function(thisState) {
  app.get(thisState, function(req, res){
      res.sendFile(__dirname + '/views/index.html');
    });
});
/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/getStarted', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});*/


/*app.use(function(err, req, res, next) {
  if (req.accepts('html')) {
        // Respond with html page.
        fs.readFile(__dirname + '/views/landing.html', 'utf-8', function(err, page) {
            console.log(res);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        });
    }
    else if (req.accepts('json')) {
        // Respond with json.
        res.status(404).send({ error: 'Not found' });
    }
    else {
        // Default to plain-text. send()
        res.status(404).type('txt').send('Not found');
    }
});*/

app.use(function(req, res, next) {
    //var err = new Error('Not Found');
    //console.log(req);
    //err.status = 404;
    //console.log('I am here');
    
    res.render(__dirname + '/views/error.html', { locals: { 
      title : '404 - Not Found'
     ,description: ''
     ,author: 'Gaurav Parashar'
    },status: 404 });
    
    //next(err);
});

//app.use(require('prerender-node').set('prerenderToken', 'iVgzdEtOLriSvmSTfKFm'));


/*function fn60sec() {
    // runs every 60 sec and runs on init.
    console.log(Moment().format('LLLL'));
    procmons.helper();
    //console.log('Process');
}
fn60sec();
setInterval(fn60sec, 60*1000);*/




var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 05, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function(){
    procmons.helper();
    //procmons.procmon();
    console.log("It's time to send procmon email:");
}, millisTill10);


var server = app.listen(port);

console.log('The magic happens on port ' + port);




/*
var SitemapGenerator = require('sitemap-generator');
var generator = new SitemapGenerator('http://www.exambazaar.com/', {
  restrictToBasepath: false,
  stripQuerystring: true,
});
var generator = new SitemapGenerator('http://www.exambazaar.com');

generator.on('done', function (sitemap) {
  console.log(sitemap); // => prints xml sitemap
});
generator.start();*/