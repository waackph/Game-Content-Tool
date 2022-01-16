import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import axios from "axios";

class ShowItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
        };
    }

    componentDidMount() {
        axios
          .get('http://localhost:8082/api/' + <GetParams />)  //this.props.match.params.id)
          .then(res => {
            this.setState({
                item: res.data,
            });
            console.log(res.data);
          })
          .catch(err => { 
            console.log('Error from ShowItemDetails'); 
        });
    };

    onDeleteClick(id) {
        axios
          .delete('http://localhost:8082/api/' + id)
          .then(res => {
            //   this.props.history.push('/');
          })
          .catch(err => {
            console.log('Error from ShowItemDetails_deleteClick');
          });
    }

    render() {
        const item = this.state.item;

        let ItemShow = <div>
                            <table className="table table-hover table-dark">
                                {/* <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Name</td>
                                        <td>{ item.name }</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Texture Path</td>
                                        <td>{ item.texture_path }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

        return (
            <div className='ShowItemDetails'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 m-auto'>
                            <br />
                            <br />
                            <Link to='/' className='btn btn-outline-warning float-left'>
                                Show Item List
                            </Link>
                        </div>
                        <br />
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Items Record</h1>
                            <p className='lead text-center'>
                                View Items Info
                            </p>
                            <hr />
                            <br />
                        </div>
                    </div>
                    <div>
                        { ItemShow }
                    </div>
                    
                    <div className='row'>
                        <div className='col-md-6'>
                            <button type='button' 
                                    className='btn btn-outline-danger btn-lg btn-block' 
                                    onClick={ this.onDeleteClick.bind(this, item._id) }>
                                Delete Item
                            </button>
                            <br />
                        </div>
                        <div className='col-md-6'>
                            <Link to={`edit-item/${item._id}`} className='btn btn-outline-info btn-lg btn-block'>
                                Edit Item
                            </Link>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowItemDetails;

function GetParams() {
    let { id } = useParams();
    return id;
}