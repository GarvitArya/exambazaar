var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var path = require('path');

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
var providers = require('./app/providers.js',providers); 
var coachings = require('./app/coachings.js',coachings); 
var groups = require('./app/groups.js',groups); 
var logourls = require('./app/logourls.js',logourls); 
var masters = require('./app/masters.js',masters);
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
var addContactInfos = require('./app/addContactInfos.js',addContactInfos); 
var images = require('./app/images.js',images); 
var awsCredentials = require('./app/awsCredentials.js',awsCredentials); 
var sendGridCredentials = require('./app/sendGridCredentials.js',sendGridCredentials); 


app.use('/api/providers', providers);
app.use('/api/coachings', coachings);
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
app.use('/api/addContactInfos', addContactInfos);
app.use('/api/images', images);
app.use('/api/awsCredentials', awsCredentials);
app.use('/api/sendGridCredentials', sendGridCredentials);



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //console.log(req);
    err.status = 404;
    
    next(err);
});




//var server = app.listen(port);

console.log('The magic happens on port ' + port);

