import {
  GET_SONGS, PLAY_SONG, PAUSE_SONG, RESUME_SONG, SELECT_ALBUM, UPDATE_SONG_STATUS, SEARCH_SONG, UPDATE_SEARCH_STRING,UPDATE_QUEUE,
  RECEIVE_SONG,
  RECEIVE_ALBUM,
  REQUEST_SONG,
  PLAY_QUEUE
} from '../actions/index';
import Sound from 'react-sound';

const initalState = {
  queue:{
        songs:[],
        current_song:{
          song:null,
          song_status:{
            playStatus: Sound.status.STOPPED,
            position: 0,
            elapsed: 0,
            duration: 0
          }
        }
      },
  albums:[],
  current_album: null,
  songs: [],
  searchString: null
};
// function updateSearchData(data) {
//   if (data.isSong) {
//     return { songs: songs.filter(song => song.name.toLowerCase().indexOf(data.searchString.toLowerCase()) !== -1)}
//   } else {
//     return { albums: albums.filter(album => album.name.toLowerCase().indexOf(data.searchString.toLowerCase()) !== -1) }

//   }
// }

function addtoArrayIfNotExist(array,item){
  let newArray = array;
  if(array.find(a=>a.id === item.id )){
    return array;
  } else {
    newArray.push(item);
    return newArray;
  }

  
}
function rootReducers(state = initalState, action) {
  switch (action.type) {
    // case GET_SONGS: return { ...state,songs:action.payload };
    // // case SEARCH_SONG: return { ...state, ...updateSearchData(action.payload), searchString: action.payload.searchString };
    
    
    // case PLAY_SONG: return { ...state, queue:{...state.queue,songs:[...addtoArrayIfNotExist(state.queue.songs,action.payload)],current_song: {...action.payload, song_status: {playStatus: Sound.status.PLAYING }} }};
    case PAUSE_SONG: return { ...state, queue:{...state.queue,current_song:{...state.queue.current_song, song_status:{...state.queue.current_song.song_status,playStatus: Sound.status.PAUSED }}} };
    case RESUME_SONG: return { ...state, queue:{...state.queue,current_song:{...state.queue.current_song, song_status:{...state.queue.current_song.song_status,playStatus: Sound.status.PLAYING }}} };
    case GET_SONGS: return { ...state,songs:action.payload };
    case PLAY_SONG: return { ...state, queue:{...state.queue,songs:[...addtoArrayIfNotExist(state.queue.songs,action.payload)],current_song: {...action.payload, song_status: {position:0,playStatus: Sound.status.PLAYING }} }};
    case UPDATE_SONG_STATUS: return { ...state, queue: {...state.queue,current_song:{...state.queue.current_song,song_status:{...state.queue.current_song.song_status ,position:action.payload } }}}
    case REQUEST_SONG: return {...state}
    case RECEIVE_SONG: return {...state,songs:action.json};
    case RECEIVE_ALBUM: return {...state,albums:action.json};
    case SELECT_ALBUM: return { ...state, current_album: state.albums.find(album=> album.id === parseInt(action.payload.id)) };
    case UPDATE_QUEUE: return {...state,queue:{...state.queue,songs:action.payload}};
    case PLAY_QUEUE: return {...state,queue:{...state.queue,songs:action.payload,current_song:{...action.payload[0],song_status:{position:0 ,playStatus:Sound.status.PLAYING}}}}
  


    
    default: return state;
  }
}

export default rootReducers;