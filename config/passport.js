// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// load up the user model
var User       = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: '1236747093103286',
        clientSecret: 'c8137e970cc6dc5cfb1416695670c418',
        callbackURL: "https://www.exambazaar.com/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with mobile
        usernameField : 'mobile',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, mobile, password, done) {
        /*if (mobile)
            mobile = mobile.toLowerCase(); */
        // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'mobile' :  mobile, _merged: {$ne: true} }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user){
                    console.log('No such user exist');
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                    

                if (!user.validPassword(password)){
                    console.log('Incorrect Password');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                    

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    


};
