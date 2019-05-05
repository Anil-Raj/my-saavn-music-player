export const GET_SONGS = 'GET_SONGS'
export const SEARCH_SONG = 'SEARCH_SONG'
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING'



export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const RESUME_SONG = 'RESUME_SONG'
export const UPDATE_SONG_STATUS = 'UPDATE_SONG_STATUS'
export const REQUEST_SONG = 'REQUEST_SONG'
export const RECEIVE_SONG = 'RECEIVE_SONG'
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM'
export const SELECT_ALBUM = 'SELECT_ALBUM'
export const UPDATE_QUEUE = 'UPDATE_QUEUE'
export const PLAY_QUEUE = 'PLAY_QUEUE'


const songs = [
  { id: 0, url: '/assets/music/blue.mp3', name: "song0", image: "https://c.saavncdn.com/147/Closer-English-2016-80x80.jpg", album: 1 ,duration:27000},
  { id: 1, url: '/assets/music/green.mp3', name: "song1", image: "https://c.saavncdn.com/273/Encore-English-2016-20190419221937-80x80.jpg", album: 1 ,duration:10396},
  { id: 2, url: '/assets/music/red.mp3', name: "song2", image: "https://c.saavncdn.com/171/Synthesis-English-2017-20171031130332-80x80.jpg", album: 2 ,duration:26845},
  { id: 3, url: '/assets/music/pink.mp3', name: "song3", image: "https://c.saavncdn.com/136/13-Reasons-Why-A-Netflix-Original-Series-Score--English-2017-80x80.jpg", album: 2,duration:103960 },
  { id: 4, url: '/assets/music/magenta.mp3', name: "song4", image: "https://c.saavncdn.com/048/13-Reasons-Why-Season-2--English-2018-20190419234519-80x80.jpg", album: 2 ,duration:27000},
  { id: 5, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song5", image: "https://c.saavncdn.com/940/Badlapur-Hindi-2014-50x50.jpg", album: 3 ,duration:27000},
  { id: 6, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song6", image: "https://c.saavncdn.com/095/Gold-Hindi-2018-20181101-50x50.jpg", album: 4 ,duration:27000},
  { id: 7, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "Bawara Mann", image: "https://c.saavncdn.com/736/JOLLY-LLB-2-Full-Hindi-2017-50x50.jpg", album: 5 ,duration:27000}

];

const albums = [
  { id: 1, name: "Album1" },
  { id: 2, name: "Album1" },
  { id: 3, name: "Album1" },
  { id: 4, name: "Akshay Kumar" },
];


export const getSongs = payload => ({ type: GET_SONGS, payload })
export const playSong = payload => ({ type: PLAY_SONG, payload })
export const playQueue = payload => ({ type: PLAY_QUEUE, payload })
export const pauseSong = payload => ({ type: PAUSE_SONG, payload })
export const resumeSong = payload => ({ type: RESUME_SONG, payload })
export const updateSongStatus = payload => ({ type: UPDATE_SONG_STATUS, payload })
export const searchSong = payload => ({ type: SEARCH_SONG, payload })
export const updateSearchString = (payload) => ({ type: UPDATE_SEARCH_STRING, payload })



const receiveSongs = json => ({ type: RECEIVE_SONG, json: json })
const receiveAlbum = json => ({ type: RECEIVE_ALBUM, json: json })
export const selectAlbum = payload => {console.log(payload);
return ({ type: SELECT_ALBUM, payload })}

let requestSongs = () => ({ type: REQUEST_SONG })

let songsAsPromises = () => new Promise(resolve => resolve(songs));

let songsByAlbumAsPromises = (album) => new Promise(resolve =>  resolve(songs.filter(song => song.album == parseInt(album.id))));
let albumsAsPromises = () => new Promise(resolve => resolve(albums));
let albumAsPromises = (al) => new Promise(resolve => resolve(albums.filter(album=>album.id === parseInt(al.id))));

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
// export const fetchAllAlbums = (dispatch) =>{
//   dispatch(requestSongs())
//   albumsAsPromises()
//   .then(response =>{console.log(response); dispatch(receiveAlbums(response)); return response;})
//   .then(json  => dispatch(receiveAlbums(json)))
// }

export const fetchAlbum = (id,dispatch) =>
{
  dispatch(requestSongs())
  albumAsPromises(id)
  .then(response => response)
    .then(response =>{dispatch(receiveAlbum(response));dispatch(selectAlbum(id));fetchSongs(response[0],dispatch);})
    // .then(()=>dispatch(selectAlbum(id)))
    // .then((response)=>fetchSongs())

}


export const addSongsToQueue = payload => ({type:UPDATE_QUEUE,payload:payload})