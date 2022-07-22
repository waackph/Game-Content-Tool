import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard'


function ShowItemList(props) {

    const [room, setRoom] = useState([]);
    const [Name, setName] = useState([]);
    const [texturePath, setTexturePath] = useState([]);
    const [RoomWidth, setRoomWidth] = useState([]);
    let { room_id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get('http://localhost:8082/api/items/' + room_id)
          .then(res => {
            console.log(res);
            setRoom(res.data);
            setName(res.data.Name);
            setTexturePath(res.data.texturePath);
            setRoomWidth(res.data.RoomWidth);
          })
          .catch(err => { 
            console.log('Error from ShowItemList'); 
        });
    }, [room_id])

    const onDeleteClick = (id) => {
        axios
          .delete('http://localhost:8082/api/' + id)
          .then(res => {
            navigate('/');
          })
          .catch(err => {
            console.log('Error from ShowItemList_deleteClick', err);
          });
    }

    const onChange = e => {
        if(e.target.name === 'Name') {
            setName(e.target.value);
        }
        else if(e.target.name === 'texturePath') {
            setTexturePath(e.target.value);
        }
        else if(e.target.name === 'RoomWidth') {
            setRoomWidth(e.target.value);
        }
        else {
            console.log('No matching variable to fieldname')
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            Name: Name,
            RoomWidth: RoomWidth,
            texturePath: texturePath,
        };

        axios
          .put('http://localhost:8082/api/' + room_id, data)
          .then(res => {
            navigate('/item-list/' + room_id);
          })
          .catch(err => {
              console.log('Error in UpdateItemInfo');
          });
    };

    let itemList;

    if(!room.Items) {
        itemList = 'There is no item record!';
    }
    else {
        itemList = room.Items.map((item, k) =>
            <ItemCard item={item} room_id={room_id} key={k} />
        );
    }

    return (
        <div className='ShowItemList'>
            <div className='container'>
                <div className='row'>
                <div className="col-md-8 m-auto">
                    <br />
                    <Link to="/" className="btn btn-outline-warning float-left">
                        Show Room List
                    </Link>
                    </div>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>{Name}</h2>
                    </div>
                    <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="Name">Name</label>
                            <input
                                type='text'
                                placeholder='Name of the Item'
                                name='Name'
                                className='form-control'
                                value={Name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="texturePath">Texture Path</label>
                            <input
                                type='text'
                                placeholder='texturePath'
                                name='texturePath'
                                className='form-control'
                                value={texturePath}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="RoomWidth">Room Width Path</label>
                            <input
                                type='text'
                                placeholder='RoomWidth'
                                name='RoomWidth'
                                className='form-control'
                                value={RoomWidth}
                                onChange={onChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-info btn-lg btn-block">
                            Update Room
                        </button>
                        <button type='button' 
                                className='btn btn-outline-danger btn-lg btn-block' 
                                onClick={ () => onDeleteClick(room._id) }>
                            Delete Room
                        </button>

                    </form>
                    </div>

                    <div className='col-md-11'>
                        <br />
                        <br />
                        <hr />

                        <Link to={`/create-item/${room_id}`} className='btn btn-outline-warning float-right'>
                            + Add new Item
                        </Link>
                    </div>
                </div>
                <div className='list'>
                    {itemList}
                </div>
                <br />
            </div>
        </div>
    );
}

export default ShowItemList;