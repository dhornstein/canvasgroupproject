// app.js

// Set up ==============================================================

const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;



var path = require('path');
var user = os.userInfo();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// View Engine ============================================================
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Normal routes ============================================================

    // show home page which also have the login links
    app.get('/', function(req, res){
        res.render('login');
    });

    // canvas page 
    app.get('/canvas', function(req, res){
        res.render('canvas');
    });

    // logout
    app.get('/logout', function(req, res){
        res.render('logout');
    });


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
        passport.authenticate('facebook', {
            successRedirect: '/canvas',
            failureRedirect:'/error',
        }));
    

console.log(`Hello ${user.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');