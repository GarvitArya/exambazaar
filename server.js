var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var path = require('path');

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
var session      = require('express-session');
var cors = require('cors');
var unirest = require('unirest');
app.use(cors());

var favicon = require('serve-favicon');
app.use(favicon('./public/images/logo/favicon.ico'));

var configDB = require('./config/mydatabase.js');

//mongoose.connect(configDB.url);
mongoose.connect(configDB.url,  { server: { socketOptions: { connectTimeoutMS: 10000 }}}, function(err) { 
    console.log('Mongo DB Error: ' + err);
});
require('./config/passport')(passport);

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
var streams = require('./app/streams.js',streams); 
var locations = require('./app/locations.js',locations); 
var mediaTags = require('./app/mediaTags.js',mediaTags); 
var cisaveds = require('./app/cisaveds.js',cisaveds); 
var views = require('./app/views.js',views); 
var tofillcis = require('./app/tofillcis.js',tofillcis); 
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
app.use('/api/streams', streams);
app.use('/api/locations', locations);
app.use('/api/mediaTags', mediaTags);
app.use('/api/cisaveds', cisaveds);
app.use('/api/views', views);
app.use('/api/tofillcis', tofillcis);
app.use('/api/images', images);
app.use('/api/awsCredentials', awsCredentials);
app.use('/api/sendGridCredentials', sendGridCredentials);



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //console.log(req);
    err.status = 404;
    next(err);
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
 
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

var server = app.listen(port);

server.timeout = 30000000;
console.log('The magic happens on port ' + port);


var SitemapGenerator = require('sitemap-generator');

/*var generator = new SitemapGenerator('http://www.exambazaar.com/#!/getStarted', {
  restrictToBasepath: false,
  stripQuerystring: true,
});

generator.on('done', function (sitemap) {
  console.log(sitemap); // => prints xml sitemap
});
generator.start();*/