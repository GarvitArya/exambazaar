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
var session      = require('express-session');
var cors = require('cors');
var unirest = require('unirest');
app.use(cors());

var favicon = require('serve-favicon');
app.use(favicon('./public/images/logo/favicon.ico'));

var configDB = require('./config/mydatabase.js');

mongoose.connect(configDB.url);
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
var institutes = require('./app/institutes.js',institutes); 
var providers = require('./app/providers.js',providers); 
var targetStudyProviders = require('./app/targetStudyProviders.js',targetStudyProviders); 
var teachers = require('./app/teachers.js',teachers); 
var admins = require('./app/admins.js',admins); 
var masters = require('./app/masters.js',masters); 
var batches = require('./app/batches.js',batches); 
var students = require('./app/students.js',students); 
var parents = require('./app/parents.js',parents); 
var subjects = require('./app/subjects.js',subjects); 
var exams = require('./app/exams.js',exams); 
var evals = require('./app/evals.js',evals); 
var users = require('./app/users.js',users); 
var calendars = require('./app/users.js',calendars); 
var days = require('./app/users.js',days); 
var notifications = require('./app/notifications.js',days); 
var transportVehicles = require('./app/transportVehicles.js',transportVehicles); 
var emails = require('./app/emails.js',emails); 
var smss = require('./app/smss.js',smss); 
var profilePics = require('./app/profilePics.js',profilePics); 
var otps = require('./app/otps.js',otps); 
var globalSubjects = require('./app/globalSubjects.js',globalSubjects); 
var globalFeeItems = require('./app/globalFeeItems.js',globalFeeItems); 

app.use('/api/institutes', institutes);
app.use('/api/providers', providers);
app.use('/api/targetStudyProviders', targetStudyProviders);
app.use('/api/teachers', teachers);
app.use('/api/admins', admins);
app.use('/api/masters', masters);
app.use('/api/batches', batches);
app.use('/api/students', students);
app.use('/api/parents', parents);
app.use('/api/subjects', subjects);
app.use('/api/exams', exams);
app.use('/api/evals', evals);
app.use('/api/users', users);
app.use('/api/calendars', calendars);
app.use('/api/days', days);
app.use('/api/notifications', notifications);
app.use('/api/transportVehicles', transportVehicles);
app.use('/api/emails', emails);
app.use('/api/smss', smss);
app.use('/api/profilePics', profilePics);
app.use('/api/otps', otps);
app.use('/api/globalSubjects', globalSubjects);
app.use('/api/globalFeeItems', globalFeeItems);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //console.log(req);
    err.status = 404;
    next(err);
});
app.listen(port);
console.log('The magic happens on port ' + port);
