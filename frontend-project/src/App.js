import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import ShowRoomList from './components/Rooms/ShowRoomList';
import CreateRoom from './components/Rooms/CreateRoom';

// import CreateItem from './components/Items/deprecated/CreateItem';
import ShowItemList from './components/Items/ShowItemList';
import ShowItemDetails from './components/Items/ShowItemDetails';
import CreateUpdateItemInfo from './components/Items/CreateUpdateItemInfo';

import CreateUpdateCharacter from "./components/Characters/CreateUpdateCharacter";
import ShowCharacter from "./components/Characters/ShowCharacter";

// ***
// The class App is the basic application definition 
// and contains all definitions to the different Routes 
// and the components to be called for each Route (can be found in the components folder).
// ***

class App extends Component {
    render () {
        return(
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<ShowRoomList />} />
                        
                        <Route path='/create-room' element={<CreateRoom />} />
                        <Route exact path='/item-list/:room_id' element={<ShowItemList />} />
                        
                        <Route path='/create-item/:room_id' element={<CreateUpdateItemInfo />} />
                        <Route path='/edit-item/:room_id/:item_id' element={<CreateUpdateItemInfo />} />
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
