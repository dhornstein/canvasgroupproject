// app.js

// Set up ==============================================================

const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');
const session = require('express-session');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const knexFile = require('./knexfile').development;
const knex = require('knex)')(knexFile);


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


console.log(`Hello ${serverUser.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');