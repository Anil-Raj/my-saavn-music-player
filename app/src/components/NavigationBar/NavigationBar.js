import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { searchSong } from '../../redux/actions/index'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.location.pathname.split("/"));
            if ((!this.props.location.pathname.split("/")[2] === 'album' && !this.props.location.pathname.split("/")[3])) {
                this.state = { search: props.searchString, isSong:true }      

            } else {
                this.state = { search: props.searchString, isSong:false }      

            }
    }
    keyDown = (e) => {
        if (e.key === 'Enter' && this.state.search !== "") {

            if (this.props.location.pathname.split("/")[2] === 'album' && this.props.location.pathname.split("/")[3]!=undefined) {
                this.props.history.push('/search/album/' + this.state.search)
                this.props.search({ isSong: false, searchString:this.state.search})
                this.setState({isSong:false})          

            } else {
                this.props.history.push('/search/' + this.state.search)
                this.props.search({ isSong: true, searchString:this.state.search})      
                this.setState({isSong:true})          

            }
        }
    }
    handleSearch = (e) => {

        this.setState({
            search: e.target.value
        });

    }

    handleAlbumClick = () => {
        this.setState({ isSong: false });
        if(this.state.search){
            this.props.search({ isSong: false, searchString: this.state.search })
            this.props.history.push('/search/album/' + this.state.search);
        } 
    }
    handleSongClick = () => {
        this.setState({ isSong: true });
        if(this.state.search){
            this.props.search({ isSong: true, searchString: this.state.search })
            this.props.history.push('/search/' + this.state.search);
        } 
       
    }
    componentDidMount() {
        this.setState({ search: this.props.match.params.id })
    }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <div id="header">
                    <div class="header-search">
                        <input class="search-input" value={this.state.search} type="text" onKeyDown={this.keyDown} onChange={this.handleSearch}></input>
                    </div>
                </div>
                <div class="filter flex width-100 pt-66">
                    <div className={ this.state.isSong ? '' :'active' }   onClick={this.handleAlbumClick}>Albums {this.state.isSong}</div>
                    <div className={this.state.isSong ? 'active' :'' } onClick={this.handleSongClick}>Songs</div>
                </div>
            </React.Fragment>

        )
    }
}
const mapStatetoProps = (state) => {
    return {
        searchString: state.searchString
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        search: (data) => dispatch(searchSong(data))
    }
}
export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(NavigationBar));