import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../App.css';

// TODO: Convert Class Component to Function Component (so we can use hooks to access params object)

function UpdateItemInfo(props) {

    const [name, setName] = useState('');
    const [texture_path, setTexture_path] = useState('');
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get('http://localhost:8082/api/' + id)  //this.props.match.params.id)
          .then(res => {
            setName(res.data.name);
            setTexture_path(res.data.texture_path);
          })
          .catch(err => { 
            console.log('Error from UpdateItemInfo'); 
        });
    }, [])


    const onChange = e => {
        if(e.target.name === 'name') {
            setName(e.target.value);
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
            texture_path: texture_path,
        };

        axios
          .put('http://localhost:8082/api/' + id, data)
          .then(res => {
            navigate('/show-item/' + id);
          })
          .catch(err => {
              console.log('Error in UpdateItemInfo');
          });
    };

    return (
        <div className='UpdateItemInfo'>
            <div className="container">

                <div className="row">
                    <div className="col-md-8 m-auto">
                    <br />
                    <Link to="/" className="btn btn-outline-warning float-left">
                        Show Item List
                    </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Item</h1>
                    <p className="lead text-center">
                        Update Item's Info
                    </p>
                    </div>
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
                        <br />

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

                        <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Item</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateItemInfo;
