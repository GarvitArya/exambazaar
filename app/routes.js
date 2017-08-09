// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
      res.send(401);
  else
      next();
};

module.exports = function(app, passport) {
    // route to test if the user is logged in or not
    app.get('/loggedin', function(req, res) {
        //console.log(req);
      res.send(req.isAuthenticated() ? req.user : '0');
    });
    
    
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    
    app.get('/auth/facebook', function(req, res) {
        //console.log(req);
      passport.authenticate('facebook', { scope : 'email' });
    });
   
    // handle the callback after facebook has authenticated the user
    
    app.get('/auth/facebook/callback', function(req, res) {
        console.log(req);
        passport.authenticate('facebook');
        /*, {
            successRedirect : '/profile',
            failureRedirect : '/'
        }*/
    });
    
    
    app.get('/auth/google', function(req, res) {
        console.log(req);
      passport.authenticate('google', { scope : ['profile', 'email'] });
    });
    
    /*app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));*/

    
    app.get('/auth/google/callback', function(req, res) {
        console.log(req);
        passport.authenticate('google');
        /*, {
            successRedirect : '/profile',
            failureRedirect : '/'
        }*/
    });
    /*// the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/'
    }));*/
    
    // route to log in
    app.post('/login', passport.authenticate('local-login'), function(req, res) {
      res.send(req.user);
    });
    
    

    // route to log out
    app.post('/logout', function(req, res,next){
        req.logout();
        res.send('200');
    });
    
    
};
