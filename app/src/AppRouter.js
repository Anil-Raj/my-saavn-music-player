import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import AlbumDetail from './components/AlbumDetail/AlbumDetail';
import AlbumSongList from './components/AlbumSongList/AlbumSongList';

function AppRouter() {
    return (
        <Switch>
            <Route path="/" exact component={AlbumSongList}/>
            <Route path="/album/:id" component={AlbumDetail}/>
            <Route path="/search/:id" exact  component={AlbumSongList}/>
            <Route path="/search/album/:id" exact component={AlbumSongList}/>
        </Switch>);
}

export default AppRouter;