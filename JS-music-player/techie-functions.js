// The functions in this file are used to get the songs from the iTunes
// webservice and to deal with the response it sends. They also create
// and run the music player.

// These functions are more complex than thos in functions.js 
// and don't always do things exactly the "right" way, 
// sometimes picking an approach that's simpler to use but not the best way.

var retrievedSongs

var songListReceiver = function (response) {
  retrievedSongs = response
}

function loadSongList(searchQuery, songCount) {
  var baseURL = 'https://itunes.apple.com/search'
  var requestURL = baseURL + '?term=' + encodeURIComponent(searchQuery) + '&limit=' + encodeURIComponent(songCount) + '&callback=songListReceiver'
  var list = document.createElement('script')
  list.src = requestURL
  list.id = 'iTunes Results'
  document.head.appendChild(list)
}

// Get song names for the songs we've retreived
function getSongTitlesAndArtists() {
  var songs = retrievedSongs['results']
  var songTitlesAndArtists = []
  for (var step = 0; step < songs.length; step = step + 1) {
    var song = songs[step]
    var songTitleAndArtist = getSongDetails(song['trackId'])
    songTitlesAndArtists.push(songTitleAndArtist)
  }
  return songTitlesAndArtists
}

// Get song details
function getSongDetails(songId) {
  songId = parseInt(songId)
  var songs = retrievedSongs['results']
  var song = songs.filter(function (obj) {
    return obj.trackId === songId
  })
  song = song[0]
  var outputSong = {
    'id': song['trackId'],
    'title': song['trackName'],
    'artist': song['artistName'],
    'genre': song['primaryGenreName'],
    'releaseDate': song['releaseDate'],
    'length': song['trackTimeMillis'],
    'sample': song['previewUrl']
  }
  return outputSong
}

// Attach player and listen for clicks
function buildPlayer() {
  var wrapper = document.getElementById('jsSpace')
  var songPlayer = document.createElement('audio')
  songPlayer.id = 'musicPlayer'
  wrapper.appendChild(songPlayer)
}

function listenForSongsToPlay() {
  var listedSongs = document.getElementsByClassName('songListItem')
  for (var step = 0; step < listedSongs.length; step = step + 1) {
    listedSongs[step].addEventListener('click', playSong)
  }
}

function setupPlayer(){
  buildPlayer()
  listenForSongsToPlay()
}

function playSong() {
  var songId = event.currentTarget.dataset.songId
  var player = document.getElementById('musicPlayer')
  var song = getSongDetails(songId)
  player.src = song.sample
  player.play()
}

var songsDisplayed = false

function whenSongsReadyDo(action) {
  if (!(retrievedSongs === null || retrievedSongs === undefined)) {
    //just avoid any possible issues of this code running twice
    if (!songsDisplayed) {
      action()
      songsDisplayed = true
    }
  } else {
    setTimeout(function () {
      whenSongsReadyDo(action)
    }, 250)
  }
}
