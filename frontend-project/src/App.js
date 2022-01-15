import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import CreateItem from './components/CreateItem';
// import ShowItemList from './components/ShowItemList';
// import ShowItemDetails from './components/ShowItemDetails';
// import UpdateItemInfo from './components/UpdateItemInfo';

class App extends Component {
    render () {
        return(
            <Router>
                <div>
                    <Routes>
                        {/* <Route exact path='/' component={ShowItemList} /> */}
                        <Route path='/create-item' element={<CreateItem />} />
                        {/* <Route path='/edit-item/:id' component={UpdateItemInfo} />
                        <Route path='/show-book/:id' component={ShowItemDetails} /> */}
                    </ Routes>
                </div>
            </Router>
        );
    }
}

export default App;
