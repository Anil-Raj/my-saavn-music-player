import React, { Component } from 'react';
import Player from '../Player/Player';
import {connect} from 'react-redux';
import SongList from '../SongList/SongList';
import {fetchAlbum,fetchSongs,selectAlbum, playQueue} from '../../redux/actions/index'

class AlbumDetail extends Component{
    state = { id:this.props.match.params.id }
    componentDidMount() {
        this.props.fetchAlbum({id:this.props.match.params.id})
        // this.props.selectAlbum({id:this.props.match.params.id})

    }
    render(){
        console.log(this.props);
        
        return(
            <div>
            <SongList songs={this.props.songs}/>
            <Player/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        songs:state.songs
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        playAlbum:(id)=>{
            console.log(id);
            
            dispatch(selectAlbum(id))
        },
        fetchSongs : (album) => fetchSongs(album,dispatch),
        fetchAlbum : (id) => fetchAlbum(id,dispatch),
        selectAlbum : (id) => {dispatch(selectAlbum(id));dispatch(playQueue());} 

    }
   
}

export default  connect(mapStateToProps,mapDispatchToProps)(AlbumDetail);