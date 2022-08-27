import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

function CreateRoom (props) {

  const [Name, setName] = useState('');
  const [RoomWidth, setRoomWidth] = useState('');
  const [texturePath, setTexturePath] = useState('');

  let navigate = useNavigate();

  const onChange = e => {
    if(e.target.name === 'Name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'RoomWidth') {
      setRoomWidth(e.target.value);
    }
    else if(e.target.name === 'texturePath') {
      setTexturePath(e.target.value);
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
      .post('http://localhost:8082/api', data)
      .then(res => {
        setName('');
        setRoomWidth('');
        setTexturePath('');
        navigate(`/item-list/${res.data._id}`); //"/item-list/" + res._id);
      })
      .catch(err => {
        console.log("Error in CreateRoom!");
      })
  };

  return (
    <div className="CreateRoom">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show Room List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Room</h1>
            <p className="lead text-center">
                Create new Room
            </p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Room'
                  name='Name'
                  className='form-control'
                  value={Name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Room Width'
                  name='RoomWidth'
                  className='form-control'
                  value={RoomWidth}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Texture Path'
                  name='texturePath'
                  className='form-control'
                  value={texturePath}
                  onChange={onChange}
                />
              </div>

              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;