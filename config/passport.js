// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

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
        if (mobile)
            mobile = mobile.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'mobile' :  mobile, _merged: {$ne: true} }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with mobile
        usernameField : 'mobile',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, mobile, password, done) {
        if (mobile)
            mobile = mobile.toLowerCase();
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'mobile' :  mobile }, function(err, user) {
                   if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Mobile is already taken. Please check!'));
                    } else {
                        var newUser            = new User();
                        
                        newUser.mobile    = mobile;
                        newUser.fullName    = req.body.fullName;
                        newUser.userType    =req.body.userType;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.mobile ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the mobile used to connect a local account is being used by another user
                User.findOne({ 'mobile' :  mobile }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That mobile is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.mobile = mobile;
                        newUser.userType    =req.body.userType;
                        newUser.fullName    = req.body.fullName;
                        user.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));


};
