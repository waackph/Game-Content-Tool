import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import ShowRoomList from './components/Rooms/ShowRoomList';

import CreateItem from './components/Items/CreateItem';
import ShowItemList from './components/Items/ShowItemList';
import ShowItemDetails from './components/Items/ShowItemDetails';
import UpdateItemInfo from './components/Items/UpdateItemInfo';

class App extends Component {
    render () {
        return(
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<ShowRoomList />} />
                        <Route exact path='/item-list' element={<ShowItemList />} />
                        <Route path='/create-item' element={<CreateItem />} />
                        <Route path='/edit-item/:id' element={<UpdateItemInfo />} />
                        <Route path='/show-item/:id' element={<ShowItemDetails />} />
                    </ Routes>
                </div>
            </Router>
        );
    }
}

export default App;
