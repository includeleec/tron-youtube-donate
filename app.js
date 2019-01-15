var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/hello', (req, res) => res.send('Hello World!'));

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'))