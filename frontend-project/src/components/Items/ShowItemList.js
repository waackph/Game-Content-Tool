import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard'


function ShowItemList(props) {

    const [room, setRoom] = useState([]);
    const [name, setName] = useState([]);
    const [texture_path, setTexture_path] = useState([]);
    const [room_width, setRoom_width] = useState([]);
    let { room_id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get('http://localhost:8082/api/items/' + room_id)
          .then(res => {
            setRoom(res.data);
            setName(res.data.name);
            setTexture_path(res.data.texture_path);
            setRoom_width(res.data.room_width);
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
        if(e.target.name === 'name') {
            setName(e.target.value);
        }
        else if(e.target.name === 'texture_path') {
            setTexture_path(e.target.value);
        }
        else if(e.target.name === 'room_width') {
            setRoom_width(e.target.value);
        }
        else {
            console.log('No matching variable to fieldname')
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            name: name,
            texture_path: texture_path,
            room_width: room_width,
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

    if(!room.items) {
        itemList = 'There is no item record!';
    }
    else {
        itemList = room.items.map((item, k) =>
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
                        <h2 className='display-4 text-center'>{name}</h2>
                    </div>
                    <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input
                                type='text'
                                placeholder='Name of the Item'
                                name='name'
                                className='form-control'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="texture_path">Texture Path</label>
                            <input
                                type='text'
                                placeholder='texture_path'
                                name='texture_path'
                                className='form-control'
                                value={texture_path}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="room_width">Room Width Path</label>
                            <input
                                type='text'
                                placeholder='room_width'
                                name='room_width'
                                className='form-control'
                                value={room_width}
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