const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');

var path = require('path');
var user = os.userInfo();

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'canvas.html'));
});

app.use(express.static('public'));

console.log(`Hello ${user.username}!`)

app.listen(8080);
console.log('You are listening to port 8080');