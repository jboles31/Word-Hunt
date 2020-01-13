require('dotenv').config();
var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});



