import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoomCard from './RoomCard';

function ShowRoomList (props) {

    const [Rooms, setRooms] = useState([]);
    
    useEffect(() => {
        axios
          .get('http://localhost:8082/api')
          .then(res => {
            setRooms(res.data);
          })
          .catch(err => {
            console.log('Error from ShowRoomList');
          });
        }, [])

    console.log('Print rooms: ' + Rooms);
    let roomList;

    if(!Rooms) {
        roomList = 'There is no room record!';
    }
    else {
        roomList = Rooms.map((room, k) =>
            <RoomCard room={room} key={k} />
        );
    }

    return (
        <div className='ShowRoomList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Room List</h2>
                    </div>
                    <div className='col-md-11'>
                        <Link to='/create-room' className='btn btn-outline-warning float-right'>
                            + Add new Room
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className='list'>
                    {roomList}
                </div>
            </div>
        </div>
    );
}

export default ShowRoomList;