const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');
const hb = require('express-handlebars');

var path = require('path');
var user = os.userInfo();

/*app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'canvas.html'));
});*/

app.use(express.static('public'));

//view Engine
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    res.render('login');
});

console.log(`Hello ${user.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');