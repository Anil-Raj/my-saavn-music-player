export const GET_SONGS = 'GET_SONGS'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const RESUME_SONG = 'RESUME_SONG'
export const SELECT_ALBUM = 'SELECT_ALBUM'
export const UPDATE_SONG_STATUS = 'UPDATE_SONG_STATUS'
export const SEARCH_SONG = 'SEARCH_SONG'
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING'
export const REQUEST_SONG = 'REQUEST_SONG'



export const RECEIVE_SONG = 'RECEIVE_SONG'
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM'


const songs = [
  { id: 0, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song0", image: "https://c.saavncdn.com/147/Closer-English-2016-80x80.jpg", album: 1 },
  { id: 1, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song1", image: "https://c.saavncdn.com/273/Encore-English-2016-20190419221937-80x80.jpg", album: 1 },
  { id: 2, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song2", image: "https://c.saavncdn.com/171/Synthesis-English-2017-20171031130332-80x80.jpg", album: 2 },
  { id: 3, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song3", image: "https://c.saavncdn.com/136/13-Reasons-Why-A-Netflix-Original-Series-Score--English-2017-80x80.jpg", album: 2 },
  { id: 4, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song4", image: "https://c.saavncdn.com/048/13-Reasons-Why-Season-2--English-2018-20190419234519-80x80.jpg", album: 3 },
  { id: 5, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song5", image: "https://c.saavncdn.com/940/Badlapur-Hindi-2014-50x50.jpg", album: 3 },
  { id: 6, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song6", image: "https://c.saavncdn.com/095/Gold-Hindi-2018-20181101-50x50.jpg", album: 4 },
  { id: 7, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "Bawara Mann", image: "https://c.saavncdn.com/736/JOLLY-LLB-2-Full-Hindi-2017-50x50.jpg", album: 5 }

];

const albums = [
  { id: 1, name: "Album1" },
  { id: 2, name: "Album1" },
  { id: 3, name: "Album1" },
  { id: 4, name: "Akshay Kumar" },
];


export const getSongs = payload => ({ type: GET_SONGS, payload })
export const playSong = payload => ({ type: PLAY_SONG, payload })
export const pauseSong = payload => ({ type: PAUSE_SONG, payload })
export const resumeSong = payload => ({ type: RESUME_SONG, payload })
export const selectAlbum = payload => ({ type: SELECT_ALBUM, payload })
export const updateSongStatus = payload => ({ type: UPDATE_SONG_STATUS, payload })
export const searchSong = payload => ({ type: SEARCH_SONG, payload })
export const updateSearchString = (payload) => ({ type: UPDATE_SEARCH_STRING, payload })



const receiveSongs = json => ({ type: RECEIVE_SONG, json: json })
const receiveAlbums = json => ({ type: RECEIVE_ALBUM, json: json })

let requestSongs = () => ({ type: REQUEST_SONG })

let songsAsPromises = () => new Promise(resolve => resolve(songs));

let songsByAlbumAsPromises = (album) => new Promise(resolve =>  resolve(songs.filter(song => song.album == album.id)));
let albumsAsPromises = () => new Promise(resolve => resolve(albums));

let searchSongsAsPromises = (search) => new Promise(resolve => resolve(songs.filter(song => song.name.indexOf(search) !== -1)))

export const fetchSongs = (album,dispatch) =>
{
  dispatch(requestSongs())
  songsByAlbumAsPromises(album)
    .then(response =>{console.log(response); dispatch(receiveSongs(response)); return response;})
    .then(json  => dispatch(receiveSongs(json)))

}
export const fetchAllSongs = (dispatch) =>
{
  dispatch(requestSongs())
  songsAsPromises()
    .then(response =>{console.log(response); dispatch(receiveSongs(response)); return response;})
    .then(json  => dispatch(receiveSongs(json)))

}
export const fetchAllAlbums = (dispatch) =>{
  dispatch(requestSongs())
  albumsAsPromises()
  .then(response =>{console.log(response); dispatch(receiveAlbums(response)); return response;})
  .then(json  => dispatch(receiveAlbums(json)))
}