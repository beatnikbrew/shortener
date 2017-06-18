const express = require('express');

let app = express();

app.listen(port, () => {
  console.log("listening on " + port);
});