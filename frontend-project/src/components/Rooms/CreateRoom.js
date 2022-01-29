import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

function CreateRoom (props) {

  const [name, setName] = useState('');
  const [room_width, setRoom_width] = useState('');
  const [texture_path, setTexture_path] = useState('');
  let navigate = useNavigate();

  const onChange = e => {
    if(e.target.name === 'name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'room_width') {
      setRoom_width(e.target.value);
    }
    else if(e.target.name === 'texture_path') {
      setTexture_path(e.target.value);
    }
    else {
      console.log('No matching variable to fieldname')
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      name: name,
      room_width: room_width,
      texture_path: texture_path,
    };

    axios
      .post('http://localhost:8082/api', data)
      .then(res => {
        setName('');
        setRoom_width('');
        setTexture_path('');
        console.log(res);
        navigate(`/item-list/${res.data._id}`); //"/item-list/" + res._id);
      })
      .catch(err => {
        console.log("Error in CreateRoom!");
        console.log(err);
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
                  name='name'
                  className='form-control'
                  value={name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Room Width'
                  name='room_width'
                  className='form-control'
                  value={room_width}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Texture Path'
                  name='texture_path'
                  className='form-control'
                  value={texture_path}
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