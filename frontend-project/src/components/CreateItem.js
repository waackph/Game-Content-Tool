import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      texture_path:'',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      texture_path: this.state.texture_path,
    };

    axios
      .post('http://localhost:8082/api', data)
      .then(res => {
        this.setState({
          name: '',
          texture_path:'',
        })
        // useNavigate.push('/');
      })
      .catch(err => {
        console.log("Error in CreateItem!");
        console.log(err);
      })
  };

  render() {
    return (
      <div className="CreateItem">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Item List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Item</h1>
              <p className="lead text-center">
                  Create new item
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name of the Item'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Texture Path'
                    name='texture_path'
                    className='form-control'
                    value={this.state.texture_path}
                    onChange={this.onChange}
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
}

export default CreateItem;