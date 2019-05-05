import React, { Component } from 'react'
import { connect } from 'react-redux'
import { playSong, pauseSong, resumeSong,updateSongStatus } from '../../redux/actions/index';
import { withRouter } from 'react-router-dom';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import Sound from 'react-sound';

class Player extends Component {
    constructor(props){
        super(props);
    this.state={song_status:{position:0}}
    }
    playNextSong = () => {
        const queue = this.props.queue;
        const nextSong = queue.songs[(queue.songs.findIndex( song => song.id === queue.current_song.id) + 1) % queue.songs.length]
        this.setState({position:0})
        this.props.playSong(nextSong);
    }
    pauseSong = () => {
        this.setState({playStatus:Sound.status.PAUSED})
        // this.props.updateSongStatus({position:this.props.current_song.song_status.position,playStatus:Sound.status.PAUSED});
        this.props.pauseSong();
    }
    resumeSong = () => {
        this.setState({playStatus:Sound.status.PLAYING})
        this.props.resumeSong();//({position:this.props.current_song.song_status.position,playStatus:Sound.status.PLAYING});
    }
    playPreviousSong = () => {
        const queue = this.props.queue;
        const previousSong = queue.songs[(queue.songs.indexOf(this.props.current_song) + queue.songs.length - 1) % queue.songs.length]
        this.props.playSong(previousSong);
    }
    handlePlay = ({ position, duration }) => {
        // this.props.updateSongStatus({ position: position , playStatus:Sound.status.PLAYING})

        // if(this.props.current_song.song_status.playStatus === Sound.status.PLAYING){
            // console.log({ position: position , playStatus:Sound.status.PLAYING,duration:duration});
            this.setState({position:position,duration:duration});
            // this.props.updateSongPosition({ position: position })
        // }    
    }
    handleFinishedPlaying = () => {
        this.playNextSong();
    }
    handleClick = (e) => {
        var rect = e.target.getBoundingClientRect();
        const length = rect.right - rect.left;
        const position = parseInt((e.clientX - rect.left) * 100 / length);
        const songPosition = position * this.props.current_song.duration / 100;
        this.setState({ position: songPosition })
    }
    render() {
        const current_song = this.props.current_song;
        current_song.duration = this.state.duration;
        // console.log((this.state.position * 100) / current_song.duration + "%" );
        // current_song.song_status.position = this.state.position;
        const color = "#E8F5E9";
        return (
            <div >
                { current_song && 
                    <div className="playControls">
                        <Sound
                            url={current_song.url}
                            playStatus={current_song.song_status.playStatus}
                            onPlaying={this.handlePlay}
                            onFinishedPlaying={this.handleFinishedPlaying}
                            position={this.state.position}
                            loop={false}
                        />
                        <div class="controls">
                            <button type="button" className="btn btn-secondary btn-lg" >
                                <MaterialIcon icon="skip_previous" size='large' color={color} onClick={this.playPreviousSong} />
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg" >
                                <div class="placeholder">
                                    {current_song.song_status.playStatus === Sound.status.PLAYING &&
                                        <MaterialIcon icon="pause" size='large' color={color} onClick={this.pauseSong} />}
                                    {(current_song.song_status.playStatus === Sound.status.PAUSED || current_song.song_status.playStatus === Sound.status.STOPPED) &&
                                        <MaterialIcon icon="play_arrow" size='large' color={color} onClick={this.resumeSong} />
                                    }
                                </div>
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg" >
                                <MaterialIcon icon="skip_next" size='large' color={color} onClick={this.playNextSong} />
                            </button>
                        </div>
                        <div class="flex width-100  ">
                            <div>
                                <img width="60px" height="60px" src={current_song.image} />
                            </div>
                            <div class="flex-column width-100">
                                <div class="flex-row row-p20 ">
                                    <div class="album-name">{current_song.albumName}</div>
                                    <div class="song-name">{current_song.name}</div>
                                </div>
                                <div class="flex-row row-p20 pt-10">
                                    <div class="track-timer">
                                        <span>{parseInt(this.state.position / 60000)}</span>:
         <span>{parseInt(this.state.position / 1000) % 60}</span>
                                    </div>
                                    <div class="playbackTimeline__progressWrapper" role="progressbar" onClick={this.handleClick}>
                                        <div class="playbackTimeline__progressBackground"  ></div>
                                        <div class="playbackTimeline__progressBar" style={{ minWidth: "1px", width: (this.state.position * 100) / current_song.duration + "%" }} ></div>
                                        <div class="playbackTimeline__progressHandle sc-ir" style={{ left: 100 - (this.state.position * 100) / current_song.duration + "%" }} ></div>
                                    </div>
                                    <div class="track-timer">
                                        <span>{parseInt(current_song.duration / 60000)}</span>:
         <span>{parseInt(current_song.duration / 1000) % 60}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="player-blur"><img src={current_song.image} /></div>
                    </div>

                }</div>

        )
    }
}

const mapStatetoProps = (state) => {
    return {
        queue: state.queue,
        current_song: state.queue.current_song
    }
}
const mapDispatchtoProps = (dispatch, ownProps) => {
    return {
        playSong: (song) => {
            dispatch(playSong(song))

        },
        pauseSong: () =>{
            dispatch(pauseSong())
        },
        resumeSong: () =>{
            dispatch(resumeSong())
        },
        updateSongPosition:(status)=>{
            dispatch(updateSongStatus(status))
        }
    }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Player))