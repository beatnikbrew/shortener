//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//Config
mongoose.connect('mongodb://heroku_2kflwrv5:48drmchcg35kuord0f95h4ikr0@ds061506.mlab.com:61506/heroku_2kflwrv5' || 'mongodb://localhost:27017/test');


//Start app
app.listen(process.env.PORT || 8080);

//Model
var urlEntry = mongoose.model('urlEntry', {
  URL : String,
  shortURL : String
});

//URL encoding algorithm

var alphabet = "123456789qwertyupasdfghjklzxcvbnmQWERTYUPASDFGHJKLZXCVBNM";
var base = alphabet.length;



//Routes
//
//shorten URL at /shorten
app.get('/shorten/:url', (req, res) => {
  //create entry for url
  var newurl = urlEntry.create({
    URL : req.params.url
  });
  console.log(newurl._id);
  newurl.shortURL = encode(newurl._id);
  res.json(newurl.shortURL);
  console.log(newurl);
});

//reroute url at /
app.get('/:url', (req, res) => {
  res.send("This is a URL shortener. Append the URL to /shorten");
  //get appropriate url
  var redirect = urlEntry.findOne( {'shortURL' : req.params.url}, (err, entry) => {
    if(err) res.send(err);
    res.redirect(redirect.URL);
  });
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