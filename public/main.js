var input = document.getElementById("textinput");
input.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {searchSubmit();}
});

window.addEventListener('scroll', function(){
  console.log(window.pageYOffset);
  var searchitems = document.getElementById("searchelements");
  if (window.pageYOffset < 250){
    searchelements.classList.remove('topbarfixed');
  } else if (window.pageYOffset >= 250){
    searchelements.classList.add('topbarfixed');
  }
}, false);

function playThisSong(text, song){
  var currentlyplayin = document.getElementById("currentlyplaying");
  currentlyplayin.innerHTML = text;
  var source = document.querySelector("source");
  source.setAttribute("src", song);
  var audio = document.getElementById('audio');
  audio.load();
  audio.play();
}
function searchSubmit(){
  fetch("https://itunes.apple.com/search?term=" + input.value)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          let parentbody = document.querySelector('#searchappender');
          parentbody.innerHTML = "";
          if (data.resultCount === 0){
            parentbody.innerHTML = "<br>No Results. :-(";
          }
          let resultsArray = data.results;
          resultsArray.map((i) =>{
            let parentDiv = document.createElement('div');
              parentDiv.setAttribute("class", "songdiv");
              parentbody.appendChild(parentDiv);
            let backgroundimg = document.createElement('img');
              backgroundimg.setAttribute("src", i.artworkUrl100);
              var quotedsongname = "'" + i.trackName + "<br>Artist: " + i.artistName + "'";
              var preview = "'" + i.previewUrl + "'";
              backgroundimg.setAttribute("onclick", "playThisSong("+quotedsongname+", "+preview+")");
            let artistname = document.createElement('a');
              artistname.innerHTML = "<br><strong>Artist:</strong> " + i.artistName;
              artistname.setAttribute("href", i.artistViewUrl);
              artistname.setAttribute("target", "_blank");
            let songname = document.createElement('a');
              songname.innerHTML = "<br><strong>Track Name:</strong> " + i.trackName;
              songname.setAttribute("href", i.trackViewUrl);
              songname.setAttribute("target", "_blank");
            let albumname = document.createElement('a');
              albumname.innerHTML = "<br><strong>Album:</strong> " + i.collectionName;
              albumname.setAttribute("href", i.collectionViewUrl);
              albumname.setAttribute("target", "_blank");
            parentDiv.appendChild(backgroundimg);
            parentDiv.appendChild(artistname);
            parentDiv.appendChild(songname);
            parentDiv.appendChild(albumname);
          })
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error: ", err);
    });
}
