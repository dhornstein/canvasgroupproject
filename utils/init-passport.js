const passport = require('passport')

module.exports = (app) => {
    app.use(passport.initialize()); //using passport as authentication middleware
    app.use(passport.session()); // express session middleware


    //using email and password to authenticate the user
    passport.use('local-login', new LocalStrategy(
        (email, password, done) => {
            let user = users.find((user)=> user.email == email);
            if (user == null) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            if (user.password === password) {
                return done(null, user);
            }

            return done(null, false, { message: 'Incorrect credentials.' });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    
    require('./strategies/facebook-strategy')(passport);
}