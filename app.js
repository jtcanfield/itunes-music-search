const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const port = 3000;
const Promise = require('es6-promise').Promise;
const es6 = require('es6-promise').polyfill();
const isomorphic = require('isomorphic-fetch');
app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/index/', function (req, res) {
  res.render('index');
});

app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
