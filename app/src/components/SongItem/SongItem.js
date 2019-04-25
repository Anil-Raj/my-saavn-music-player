import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong, pauseSong, resumeSong} from '../../redux/actions/index';

class SongItem extends Component {
    render() {
        return (
            <div class="song-wrap">
                <div class="flex width-100  ">
                    <div onClick={()=>this.props.playSong(this.props.song)}>
                        <img width="60px" height="60px" src={this.props.song.image} alt={this.props.song.name} />
                    </div>
                    <div class="flex-column width-100">
                        <div class="pl-20 album-name">
                            <div>{this.props.song.name}</div>
                        </div>
                        <div class="pl-20 song-name ">
                            <div>{this.props.song.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = (state)=>{
    return {

    }
}

const mapDispatchtoProps = (dispatch)=>{
    return {
        playSong: (song) => {
            dispatch(playSong(song))

        },
        pauseSong: () => {
            dispatch(pauseSong())

        },
        resumeSong: () => {
            dispatch(resumeSong())

        }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(SongItem)