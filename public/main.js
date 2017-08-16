var input = document.getElementById("textinput");
input.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {searchSubmit();}
});
function searchSubmit(){
  fetch("https://itunes.apple.com/search?term=" + input.value)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          let resultsArray = data.results;
          let parentbody = document.querySelector('#searchappender');
          parentbody.innerHTML = "";
          resultsArray.map((i) =>{
            let parentDiv = document.createElement('div');
            parentbody.appendChild(parentDiv);
            let backgroundimg = document.createElement('img');
            backgroundimg.setAttribute("style", "background-image: url("+i.artworkUrl100+"); height: 100px; width: 100px;");
            let artistname = document.createElement('a');
            artistname.innerHTML = "<br>Artist: " + i.artistName;
            artistname.setAttribute("href", i.artistViewUrl);
            let songname = document.createElement('a');
            songname.innerHTML = "<br>Track Name: " + i.trackName;
            songname.setAttribute("href", i.trackViewUrl);
            let albumname = document.createElement('a');
            albumname.innerHTML = "<br>Album: " + i.collectionName;
            albumname.setAttribute("href", i.collectionViewUrl);
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
