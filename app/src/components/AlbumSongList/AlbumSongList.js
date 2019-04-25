import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar/NavigationBar';
import Player from '../Player/Player';
import SongItem from '../SongItem/SongItem';
import { searchSong,fetchSongs,fetchAllSongs,fetchAllAlbums } from '../../redux/actions/index'

class AlbumSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSong: false,
            searchString: ''
        }
    }

    componentDidMount() {      
        if(this.props.location.pathname.split("/")[1] === 'search'){
            if (this.props.location.pathname.split("/")[2] === 'album' && this.props.location.pathname.split("/")[3]) {
                this.setState({ isSong: false });
                this.props.search({ isSong: false, searchString: this.props.match.params.id })
            } else {
                this.setState({ isSong: true });
                this.props.search({ isSong: true, searchString: this.props.match.params.id })
            }
        } else{
            this.props.fetchAllSongs();
            this.props.fetchAllAlbums();
        }
    }

    playAlbum = (id) => {
        console.log(this.props);

        this.props.history.push('/album/' + id);
    }

    render() {
        const defaultImage = "https://static.saavncdn.com/_i/3.0/album-default.png";
        console.log(this.props,this.state.isSong);

        return (
            <React.Fragment>
                <NavigationBar></NavigationBar>
                <div class="album-grid">
                    {
                        !this.state.isSong && this.props.albums && this.props.albums.map((album, i) =>
                            <div class="album-art">
                                <div class="art group-art ">
                                    {
                                        [...Array(4)].map((e, i) =>
                                            album.songs && album.songs[i] &&
                                            <img src={album.songs[i] ? album.songs[i].image : defaultImage} alt="Song" />
                                        )

                                    }
                                    {
                                        [...Array(4)].map((e, i) => <img src={defaultImage} alt="May18 Songs" />)
                                    }
                                    <div class="overlay-actions">
                                        <div class="overlay-action-buttons">
                                            <button class="play dark-bg" onClick={(id) => this.playAlbum(album.id)}>Play</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }</div>
                {
                    this.state.isSong && this.props.songs && this.props.songs.map(song =>
                        <SongItem song={song} />
                    )
                }

                <Player />
            </React.Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        albums: state.albums,
        songs: state.songs,
        searchString:state.searchString
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        search: (data) => dispatch(searchSong(data)),
        fetchSongs : (album) => fetchSongs(album,dispatch),
        fetchAllSongs:() => fetchAllSongs(dispatch),
        fetchAllAlbums:()=>fetchAllAlbums(dispatch)
        // fetchArticleDetails:(al)=>dispatch(fetchArticleDetails(al))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(AlbumSongList);

