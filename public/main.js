var input = document.getElementById("textinput");
input.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {searchSubmit();}
});
function searchSubmit(){
  fetch("https://itunes.apple.com/search?term=" + "knife")
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error: ", err);
    });
}