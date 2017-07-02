//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//Config
mongoose.connect('mongodb://localhost:27017/test');


//Start app
app.listen(8080);
console.log("App listening on port 8080");

//Model
var urlEntry = mongoose.model('urlEntry', {
  URL : string,
  shortURL : string
});

//URL encoding algorithm

var alphabet = "123456789qwertyupasdfghjklzxcvbnmQWERTYUPASDFGHJKLZXCVBNM";
var base = alphabet.length();

app.get('/', (req, res) => {
  app.send("This is a URL shortener. Append the URL to /shorten");
});


//Routes
//
//shorten URL at /shorten
app.get('/shorten/:url', (req, res) => {
  //create entry for url
  var newurl = urlEntry.create({
    URL : req.params.url,
    shortURL : encode(req.params.url)
  }, (err, url) => {
    if(err)
      res.send(err);

    //return shortened url
    res.json(newurl.shortURL);
  });
});

//reroute url at /
app.get('/:url', (req, res) => {

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