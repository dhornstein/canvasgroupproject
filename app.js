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


// View Engine ============================================================
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');





/*app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/canvas',
    failureRedirect: '/error'
}));*/


// =========================================================================
//      PROCESS SIGN UP PAGE
// =========================================================================

function signUp(req, res, next){
    console.log('Function signUp is called');
    console.log('contents of req.value.body, req.value.body');
}



app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup',signUp, (req, res) => {
    res.render('signup');
});


// ==========================================================================
//         PROCESS FACEBOOK LOGIN
// ==========================================================================

// send to facebook to do the authentication
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
/*app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect :  '/canvas',
        failureRedirect : '/error',
        
    })); */

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

    app.get('/', (req, res) => {
       res.render('canvas');
      });

    /*function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
    
        res.render('canvas');
    }*/

    
    app.post('/', (req, res) => {
        res.render('canvas');
    });       


// =========================================================================


app.get('/error', (req, res) => {
    res.send('You are not logged in!');
});

console.log(`Hello ${serverUser.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');