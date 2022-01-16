import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import '../App.css';

class UpdateItemInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            texture_path: '',
        };
    }

    componentDidMount() {
        axios
          .get('http://localhost:8082/api/' + <GetParams />)  // this.props.match.params.id)
          .then(res => {
            this.setState({
                name: res.data.name,
                texture_path: res.data.texture_path,
            });
          })
          .catch(err => {
            console.log('Error from UpdateItemInfo');
          });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            texture_path: this.state.texture_path,
        };

        axios
          .put('http://localhost:8082/api/' + <GetParams />, data)  // this.props.match.params.id, data)
          .then(res => {
            // this.props.history.push('/show-item/'+this.props.match.params.id);
          })
          .catch(err => {
              console.log('Error in UpdateItemInfo');
          });
    };

    render() {
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
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="name">Name</label>
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
                                <label htmlFor="texture_path">Texture Path</label>
                                <input
                                    type='text'
                                    placeholder='texture_path'
                                    name='texture_path'
                                    className='form-control'
                                    value={this.state.texture_path}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Item</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateItemInfo;

function GetParams() {
    let { id } = useParams();
    return id;
}