// These lines are comments—notes for the programmer. They start with //
// The web browser just skips over them, but you can read them
// They'll help you understand what's happening in the code

// This function creates the HTML that is used to display a song
// but it doesn't actually add it to the page, it just returns it
function buildSongDisplay (song) {
  var songDisplay = document.createElement ('li')
  var   songInfo = '<strong>' + song.title + ' </strong> by ' + song.artist + ' &#9658;'
  songDisplay.innerHTML = songInfo
  songDisplay.classList.add ('songListItem')
  songDisplay.dataset.songId = song.id
  return songDisplay
}

// Take a list of songs and display it on the page
function displaySongsList (songsList) {
  
  // Create a variable and make it equal to the element (a div, in this case)
  // with the id of 'jsSpace' on the html page
  var wrapper = document.getElementById ('jsSpace')
  
  // Make an unorderd list (ul) element and store it in a variable for now
  var songsListDisplay = document.createElement ('ul')
  var songsDisplayed = 0
  var songsToDisplay = songsList.length
  
  while(songsDisplayed < songsToDisplay) {
    // Get next song
    var song = songsList[songsDisplayed]
    songsDisplayed = songsDisplayed + 1
    // Create the display HTML of that song and add it inside the ul tag
    songsListDisplay.appendChild(buildSongDisplay(song))
  }

  // Add songListDisplay (our unordered list) as the child of (i.e. inside)
  // the wrapper (the element with the id of 'jsSpace')
  wrapper.appendChild(songsListDisplay)
}

// Get some songs from the web and load them, but don't display them yet
function getSongs (searchQuery, songCount) {
  
  // Check if a search query has been given. If not, use 'yesterday'
  if (searchQuery === undefined){
    searchQuery = 'yesterday'
  }

  // Check if a number of songs to retreive has been given. If not, use 5
  if (songCount === undefined){
    songCount = 5
  }
  
  // Call the loadSongList function, in techie-functions.js
  return loadSongList (searchQuery, songCount)

}
