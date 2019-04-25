import {
  GET_SONGS, PLAY_SONG, PAUSE_SONG, RESUME_SONG, SELECT_ALBUM, UPDATE_SONG_STATUS, SEARCH_SONG, UPDATE_SEARCH_STRING,
  RECEIVE_SONG,
  RECEIVE_ALBUM,
  REQUEST_SONG
} from '../actions/index';
import Sound from 'react-sound';

const songs = [
  { id: 0, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song0", image: "https://c.saavncdn.com/147/Closer-English-2016-80x80.jpg", album: 1 },
  { id: 1, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song1", image: "https://c.saavncdn.com/273/Encore-English-2016-20190419221937-80x80.jpg", album: 1 },
  { id: 2, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song2", image: "https://c.saavncdn.com/171/Synthesis-English-2017-20171031130332-80x80.jpg", album: 2 },
  { id: 3, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song3", image: "https://c.saavncdn.com/136/13-Reasons-Why-A-Netflix-Original-Series-Score--English-2017-80x80.jpg", album: 2 },
  { id: 4, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song4", image: "https://c.saavncdn.com/048/13-Reasons-Why-Season-2--English-2018-20190419234519-80x80.jpg", album: 3 },
  { id: 5, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song5", image: "https://c.saavncdn.com/940/Badlapur-Hindi-2014-50x50.jpg", album: 3 },
  { id: 6, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "song6", image: "https://c.saavncdn.com/095/Gold-Hindi-2018-20181101-50x50.jpg", album: 4 },
  { id: 7, url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3', name: "Bawara Mann", image: "https://c.saavncdn.com/736/JOLLY-LLB-2-Full-Hindi-2017-50x50.jpg", album: 4 }

];

const albums = [
  { id: 1, name: "Album1" },
  { id: 2, name: "Album1" },
  { id: 3, name: "Album1" },
  { id: 4, name: "Akshay Kumar" },
];


const initalState = {
  albums: [],
  album: null,
  songs: [],
  searchString: null,
  song_status: {
    ...Sound.defaultProps,
    url: null,
    playStatus: Sound.status.STOPPED,
    position: 0,
    elapsed: 0,
    duration: 27000
  },
  previous_song: null,
  next_song: null,
  current_song: null,
};
function updateSearchData(data) {
  if (data.isSong) {
    return { songs: songs.filter(song => song.name.toLowerCase().indexOf(data.searchString.toLowerCase()) !== -1)}
  } else {
    return { albums: albums.filter(album => album.name.toLowerCase().indexOf(data.searchString.toLowerCase()) !== -1) }

  }
}
function rootReducers(state = initalState, action) {
  switch (action.type) {
    case GET_SONGS: return { ...state,songs:action.payload };
    case PLAY_SONG: return { ...state, current_song: action.payload, song_status: { ...initalState.song_status, playStatus: Sound.status.PLAYING } };
    case RESUME_SONG: return { ...state, song_status: { ...state.song_status, playStatus: Sound.status.PLAYING } };
    case PAUSE_SONG: return { ...state, song_status: { ...state.song_status, playStatus: Sound.status.PAUSED } };
    case SELECT_ALBUM: return { ...state, album: albums[action.payload] };
    case UPDATE_SONG_STATUS: return { ...state, song_status: { ...state.song_status, ...action.payload } }
    case SEARCH_SONG: return { ...state, ...updateSearchData(action.payload), searchString: action.payload.searchString };


    case REQUEST_SONG: console.log(action); return {...state}
    case RECEIVE_SONG: console.log(action); return {...state,songs:action.json};
    case RECEIVE_ALBUM: console.log(action); return {...state,albums:action.json};

    
    default: return state;
  }
}

export default rootReducers;