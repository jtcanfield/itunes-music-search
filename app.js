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



// var input = document.getElementById("textinput");
// input.addEventListener('keypress', function(e) {
//   if (e.keyCode === 13) {searchSubmit();}
// });
function searchSubmit(){
  fetch("https://itunes.apple.com/search?term=" + "knife")
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          app.get('/index/', function (req, res) {
            res.render('index', data);
          });
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error: ", err);
    });
}
searchSubmit()



app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
