getSongs('The Tallest Man on Earth', 10)

function loadSongsToPage() {
  var mySongs = getSongTitlesAndArtists()
  displaySongsList(mySongs)
  setupPlayer()
}

function putMusicOnThePage (query, songCount){
  getSongs(query, songCount)
  whenSongsReadyDo(loadSongsToPage)
}

putMusicOnThePage('The Tallest Man on Earth', 10)