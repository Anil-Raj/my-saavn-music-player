import React, { Component } from 'react';
import Player from '../Player/Player';
import {connect} from 'react-redux';
import SongList from '../SongList/SongList';
import {selectAlbum,fetchSongs} from '../../redux/actions/index'

class AlbumDetail extends Component{
    state = { id:this.props.match.params.id }
    componentDidMount() {
        console.log(this.props.match.params.id);
        
        this.props.playAlbum(this.props.match.params.id);
        this.props.fetchSongs({id:this.props.match.params.id})
    }
    render(){
        return(
            <div>
            <SongList/>
            <Player/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        song:state.current_song
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        playAlbum:(id)=>{
            console.log(id);
            
            dispatch(selectAlbum(id))
        },
        fetchSongs : (album) => fetchSongs(album,dispatch),
    }
   
}

export default  connect(mapStateToProps,mapDispatchToProps)(AlbumDetail);