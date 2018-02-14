const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: asd,
        clientSecret: asdd,
        callbackURL: ''
    }, (accessToken, refreshToken, profile, cb) = > {
            return cb(null{ profile: profile, accessToken: accessToken });
        }
    ));
}