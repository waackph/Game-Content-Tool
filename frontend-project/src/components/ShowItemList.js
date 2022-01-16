import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard'

class ShowItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        axios
          .get('http://localhost:8082/api')
          .then(res => {
            this.setState({
                items: res.data,
            });
          })
          .catch(err => {
            console.log('Error from ShowItemList');
          });
    };

    render() {
        const items = this.state.items;
        console.log('Print items: ' + items);
        let itemList;

        if(!items) {
            itemList = 'There is no item record!';
        }
        else {
            itemList = items.map((item, k) =>
              <ItemCard item={item} key={k} />
            );
        }

        return (
            <div className='ShowItemList'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <br />
                            <h2 className='display-4 text-center'>Item List</h2>
                        </div>
                        <div className='col-md-11'>
                            <Link to='/create-item' className='btn btn-outline-warning float-right'>
                                + Add new Item
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>
                    </div>
                    <div className='list'>
                        {itemList}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowItemList;