//router.js

const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }


// ============================================================================
// AUTHENTICATE (FIRST LOGIN)
// ============================================================================

    // locally ----------------
        // LOGIN ==================
        app.get('/', function(req, res){
            res.render('login');
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/canvas',
            failureRedirect: '/error',
        }));

        // SIGNUP ===================
        app.get('/', function(req, res){
            res.render('login');
        });

        // process the signup form
        app.post('/login', passport.authenticate('local-signup', {
            successRedirect: '/canvas',
            failureRedirect: '/error',
        }));

    // facebook ----------------
        //send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/error'}),
        function(req, res) {
            //Successfull authentication, redirect to canvas.
            res.redirect('canvas');
        });
          
    