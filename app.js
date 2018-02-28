const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const urlencodedParser = bodyParser.urlencoded({ extended: false }); //middleware


require('dotenv').config();
const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);



var path = require('path');
var serverUser = os.userInfo();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'supersecret'
}));


// ====================================================================
//          SET VIEW ENGINE
// ====================================================================
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// =====================================================================
//          PASSPORT INIT
// =====================================================================
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



// ==========================================================================
//         PROCESS FACEBOOK LOGIN
// ==========================================================================


app.get('/', (req, res) => {
    res.render('signup');
});
console.log(process.env.FACEBOOK_ID);

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile.id);
        
        let query = knex.select("username", "facebook_id").from('users').where('facebook_id', profile.id);
        query.then(rows => {
            if (rows.length < 1) {
                knex.insert({ username: profile.displayName, facebook_id: profile.id }).into('users')
                    .then(function (id) {
                        cb(null, { profile: profile, accessToken: accessToken });
                    });
            }
            else {
                cb(null, { profile: profile, accessToken: accessToken });
            }
        })
    }));

// send to facebook to do the authentication
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/canvas');
    });

app.get('/canvas', (req, res) => {
    res.render('canvas');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('/canvas');
}
// =======================================================================
//               TO SAVE IMAGE
// =======================================================================


app.post('/uploads', urlencodedParser, function (req, res) {
    
    //return knex.insert({ canvas_content: req.body.imgBase64, facebook_id: profile.id}).into('canvas');
    
    console.log(req.body.imgBase64);
});

        

// =========================================================================


//to todo
app.get('/todo', (req, res) => {
    res.render('todo');
});


// =========================================================================

app.get('/error', (req, res) => {
    res.send('You are not logged in!');
});

console.log(`Hello ${serverUser.username}!`)

app.listen(8000);
console.log('You are listening to port 8000');