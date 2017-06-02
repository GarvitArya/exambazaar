var express  = require('express');
//var redirect = require("express-redirect");
var app      = express();
var port     = process.env.PORT || 8000;
var path = require('path');
//redirect(app); 
/*
var childProcess = require( "child_process" );
var phantomjs = require( "phantomjs" );
var binPath = phantomjs.path;
*/

var mongoose = require('mongoose');
var Moment = require('moment');
require('mongoose-moment')(mongoose);
var passport = require('passport');
var flash        = require('req-flash');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var session      = require('express-session');
var cors = require('cors');
var unirest = require('unirest');
app.use(cors());

var favicon = require('serve-favicon');
app.use(favicon('./public/images/logo/favicon.ico'));

var configDB = require('./config/mydatabase.js');

//mongoose.connect(configDB.url);
mongoose.connect(configDB.url,  { server: { socketOptions: { connectTimeoutMS: 10000 }}}, function(err) {
    if(err){
        console.log('Mongo DB Error: ' + err);
    }
    
});
require('./config/passport')(passport);

app.use(require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'iVgzdEtOLriSvmSTfKFm').blacklisted('^/claim'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
var groups = require('./app/groups.js',groups); 
var logourls = require('./app/logourls.js',logourls); 
var masters = require('./app/masters.js',masters); 
//var admins = require('./app/admins.js',admins); 
//var students = require('./app/students.js',students); 

var users = require('./app/users.js',users); 

var notifications = require('./app/notifications.js',notifications); 
var emails = require('./app/emails.js',emails); 
var smss = require('./app/smss.js',smss);
var otps = require('./app/otps.js',otps); 
var exams = require('./app/exams.js',exams); 
var eligibilitys = require('./app/eligibilitys.js',eligibilitys); 
var streams = require('./app/streams.js',streams); 
var locations = require('./app/locations.js',locations); 
var mediaTags = require('./app/mediaTags.js',mediaTags); 
var cisaveds = require('./app/cisaveds.js',cisaveds); 
var views = require('./app/views.js',views); 
var tofillcis = require('./app/tofillcis.js',tofillcis); 
var toverifycis = require('./app/toverifycis.js',toverifycis); 
var suggestCoachings = require('./app/suggestCoachings.js',suggestCoachings); 
var addContactInfos = require('./app/addContactInfos.js',addContactInfos); 
var images = require('./app/images.js',images); 
var awsCredentials = require('./app/awsCredentials.js',awsCredentials); 
var sendGridCredentials = require('./app/sendGridCredentials.js',sendGridCredentials); 


app.use('/api/providers', providers);
app.use('/api/targetStudyProviders', targetStudyProviders);
app.use('/api/groups', groups);
app.use('/api/logourls', logourls);
//app.use('/api/admins', admins);
app.use('/api/masters', masters);
//app.use('/api/students', students);
app.use('/api/users', users);
app.use('/api/notifications', notifications);
app.use('/api/emails', emails);
app.use('/api/smss', smss);
app.use('/api/otps', otps);
app.use('/api/exams', exams);
app.use('/api/eligibilitys', eligibilitys);
app.use('/api/streams', streams);
app.use('/api/locations', locations);
app.use('/api/mediaTags', mediaTags);
app.use('/api/cisaveds', cisaveds);
app.use('/api/views', views);
app.use('/api/tofillcis', tofillcis);
app.use('/api/toverifycis', toverifycis);
app.use('/api/suggestCoachings', suggestCoachings);
app.use('/api/addContactInfos', addContactInfos);
app.use('/api/images', images);
app.use('/api/awsCredentials', awsCredentials);
app.use('/api/sendGridCredentials', sendGridCredentials);


var allStates = ['/','/login','/review','/reviewed','/search','/socialLogin','/reviewcenter/:coachingId','/stream','/stream/:categoryName','/stream/:categoryName/:subCategoryName/','/stream/:categoryName/:subCategoryName/:cityName','/stream/:categoryName/:subCategoryName/:cityName/:coachingId','/group/:categoryName/:subCategoryName/:cityName/:groupName','/oldclaim/:coachingId','/claim/:coachingId','/verifyClaim/:coachingId','/user/:userId/sandbox','/user/:userId/coachingGroup','/user/:userId/suggestCoaching','/master/:masterId/sandbox2/:cityName','/user/:userId/eligibility','/privacy','/about','/calendar','/:instituteId/bulkAddStudents','/:instituteId/bulkAddTeachers','/:instituteId/bulkAddBatches','/:instituteId/instituteCalendar','/:batchId/batchCalendar','/admin/:adminId/main','/user/:userId/sendEmail','/master/:masterId/main','/coaching/database2/:city','/internship','/account','/edit/database1/:coachingId','/coaching/providersWithAreas','/coaching/database1/:city','/master/:masterId/analytics','/master/:masterId/institutes','/master/:masterId/dashboard','/master/:masterId/tofill','/partner/:userId/dashboard','/master/:masterId/manageBatchStudents','/master/:masterId/manageInstituteStudents','/master/:masterId/addGlobalSubject','/master/:masterId/invalidusers','/master/:masterId/addGlobalFeeItem','/master/:masterId/mergeUsers','/master/:masterId/invalidParents','/master/:masterId/invalidTeachers','/institute/:instituteId','/institute-batches/:instituteId','/institute-teachers/:instituteId','/institute-students/:instituteId','/student/:studentId/main','/student/:studentId/attendance','/student/:studentId/class','/user/:userId/shortlisted','/user/:userId/viewed','/user/:userId/filled','/user/:userId/assigned','/user/:userId/assignedToVerify','/user/:userId/assignedToAddContactInfo','/user/:userId/filledAll','/user/:userId/group','/user/:userId/profile','/user/:userId/checkLogo/:pageNumber/','/student/:studentId/subjects','/:instituteId/addTeacher','/:instituteId/addAdmin','/addStream','/addLocation','/addMediaTag','/addGroup','/addAwsCredential','/addAwsCredential','/addExam','/addEligibility','/master/:masterId/addMaster','/master/:userId/addInstitute','/master/:userId/bulkDisable','/user/:userId/addIntern','/sitemap','/:instituteId/addStudent','/:instituteId/addTransportVehicle','/:instituteId/addBatch','/:instituteId/feeStructure','/verify/:userId/','/chooselogin/:userId/','/subject/:subjectId','/eval/:evalId','/exam/:examId','/batch/:batchId','/batch/:batchId/attendance'
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

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //console.log(req);
    err.status = 404;
    
    next(err);
});

//app.use(require('prerender-node').set('prerenderToken', 'iVgzdEtOLriSvmSTfKFm'));



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