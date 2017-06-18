const express = require('express');

let app = express();

app.listen(port, () => {
  console.log("listening on " + port);
});

const alphabet = "123456789qwertyupasdfghjklzxcvbnmQWERTYUPASDFGHJKLZXCVBNM";
const base = alphabet.length();