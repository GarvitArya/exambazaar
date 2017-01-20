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
      res.send(req.isAuthenticated() ? req.user : '0');
    });

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
