var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/hello', (req, res) => res.send('Hello World!'))

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});