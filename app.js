// app.js

// Set up ==============================================================

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
const urlencodedParser = bodyParser.urlencoded({extended:false}); //middleware



//const redis = require('redis');

require('dotenv').config();
const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);

/*let client = redis.createClient();
client.on('connect', function(){
    console.log('Connected to redis....');
}); */


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


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



// =========================================================================
//      PROCESS SIGN UP PAGE
// =========================================================================

function signUp(req, res, next) {
    console.log('Function signUp is called');
    console.log('req.value.body');
};

app.get('/signup', (req, res, next) => {
    res.render('signup');
});

app.post('/signup', function (req, res, next) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;

});






// ==========================================================================
//         PROCESS FACEBOOK LOGIN
// ==========================================================================

app.use(passport.initialize());
app.use(passport.session());

console.log(process.env.FACEBOOK_ID);

passport.use(new FacebookStrategy(
    {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `/auth/facebook/callback`
}, 
(accessToken, refreshToken, profile, cb) => 
{
    console.log(profile.id);
    knex.insert({ username: profile.displayName, facebook_id: profile.id }).into('facebook_signin_users')
    .then(function (ids){
        cb(null, { profile: profile, accessToken: accessToken });
    })
}
));
/*.then((user) => {
    //facebook user exists in database
    if (user.length) {
        return done(null, {user: user[0], accessToken: accessToken});
    }
    //new fb user
    return knex('facebook_signin_users')
    .returning('id')
    .insert({
        facebook_id: facebook_id,
        username: username,
    }).then((id) =>{
        console.log(id[0]);
        return knex('facebook_signin_users').select().where('id', id[0])
        .then((user) => {
            return done(null, {user: user[0], accessToken: accessToken});
        })
    }).catch((err) => {
        console.log(err);
    });
})
} 
));*/

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

// to logout
app.get('/logout', (req, res) => {
    res.render('logout');
});

// to save image

app.post('/uploads', urlencodedParser, function(req,res){
    console.log(req.body.imgBase64);
    });


// =========================================================================

app.get('/error', (req, res) => {
    res.send('You are not logged in!');
});

console.log(`Hello ${serverUser.username}!`)

app.listen(8000);
console.log('You are listening to port 8000');