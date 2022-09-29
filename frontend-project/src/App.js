import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import ShowRoomList from './components/Rooms/ShowRoomList';
import CreateRoom from './components/Rooms/CreateRoom';

import CreateItem from './components/Items/CreateItem';
import ShowItemList from './components/Items/ShowItemList';
import ShowItemDetails from './components/Items/ShowItemDetails';
import UpdateItemInfo from './components/Items/UpdateItemInfo';

import CreateUpdateCharacter from "./components/Characters/CreateUpdateCharacter";
import ShowCharacter from "./components/Characters/ShowCharacter";

class App extends Component {
    render () {
        return(
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<ShowRoomList />} />
                        
                        <Route path='/create-room' element={<CreateRoom />} />
                        <Route exact path='/item-list/:room_id' element={<ShowItemList />} />
                        
                        <Route path='/create-item/:room_id' element={<CreateItem />} />
                        <Route path='/edit-item/:room_id/:item_id' element={<UpdateItemInfo />} />
                        <Route path='/show-item/:room_id/:item_id' element={<ShowItemDetails />} />

                        <Route path='/create-character/:room_id' element={<CreateUpdateCharacter />} />
                        <Route path='/edit-character/:room_id/:character_id' element={<CreateUpdateCharacter />} />
                        <Route path='/show-character/:room_id/:character_id' element={<ShowCharacter />} />
                    </ Routes>
                </div>
            </Router>
        );
    }
}

export default App;
