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
const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);



var path = require('path');
var serverUser = os.userInfo();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'supersecret'
}));


// View Engine ============================================================
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/canvas',
    failureRedirect: '/error'
}));

// =========================================================================
//      PROCESS SIGN UP PAGE
// =========================================================================

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', passport.authenticate('local-login', {
    successRedirect: '/canvas',
    failureRedirect: '/error'
}));



app.get('/error', (req, res) => {
    res.send('You are not logged in!');
});

app.get('/canvas', (req, res) => {
    res.render('canvas');
});



console.log(`Hello ${serverUser.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');