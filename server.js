//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//Config
mongoose.connect('mongodb://localhost:27017/test');


//Start app
app.listen(8080);
console.log("App listening on port 8080");

//URL encoding algorithm

var alphabet = "123456789qwertyupasdfghjklzxcvbnmQWERTYUPASDFGHJKLZXCVBNM";
var base = alphabet.length();

app.get('/', (req, res) => {
  app.send("This is a URL shortener. Append the URL to /shorten");
});

app.get('/shorten/:url', (req, res) => {
  db.collection('urls').insertOne( { //Just a test. Next step is to verify this makes something when put on Heroku
    "url" : {
      "target"  : req.params,
      "short"   : "shortened"
    }
  });
  //take :url and save it to db. (If not already present)
  //Take index of saved url, set it to base 58, return that and save that to db
  //if url is already present, then if it matches a base 58 entry, redirect to corresponding url
});



// utility function to convert base 10 integer to base 58 string
function encode(num){
  var encoded = '';
  while (num){
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

// utility function to convert a base 58 string to base 10 integer
function decode(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}