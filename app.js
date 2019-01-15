var express = require('express');
var path = require('path');
var app = express();
const PORT = 3000

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/hello', (req, res) => res.send('Hello World!'))

app.listen(PORT,function () {
  console.log('Example app listening on port '+ PORT);
});