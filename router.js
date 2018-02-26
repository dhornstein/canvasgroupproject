/*const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }


    router.get('/secret',  isLoggedIn, (req, res) => {
        res.send('Here you go, a secret');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/canvas',
        failureRedirect: '/error'
    }));

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/canvas', (req, res) => {
        res.render('canvas');
    });

    return router;
};
*/