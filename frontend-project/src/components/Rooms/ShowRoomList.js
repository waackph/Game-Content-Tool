import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoomCard from './RoomCard'

class ShowRoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }

    componentDidMount() {
        axios
          .get('http://localhost:8082/api')
          .then(res => {
            this.setState({
                rooms: res.data,
            });
          })
          .catch(err => {
            console.log('Error from ShowRoomList');
          });
    };

    render() {
        const rooms = this.state.rooms;
        console.log('Print rooms: ' + rooms);
        let roomList;

        if(!rooms) {
            roomList = 'There is no room record!';
        }
        else {
            roomList = rooms.map((room, k) =>
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
}

export default ShowRoomList;