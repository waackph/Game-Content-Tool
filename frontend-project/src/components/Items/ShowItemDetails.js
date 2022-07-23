// Class Component to Function Component: https://nimblewebdeveloper.com/blog/convert-react-class-to-function-component/
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from "axios";


function ShowItemDetails(props) {

    const [item, setItem] = useState({});
    let { room_id, item_id } = useParams();
    let navigate = useNavigate();
    
    // Note: We can only do it like this as long as id is not an object, else it will fail the equality check and useEffect might be executed infinitly
    // https://betterprogramming.pub/stop-lying-to-react-about-missing-dependencies-10612e9aeeda
    useEffect(() => {
        axios
          .get('http://localhost:8082/api/items/' + room_id + '/' + item_id)
          .then(res => {
            setItem(res.data);
          })
          .catch(err => { 
            console.log('Error from ShowItemDetails'); 
        });
    }, [room_id, item_id])

    const onDeleteClick = (id) => {
        axios
          .delete('http://localhost:8082/api/items/' + id)
          .then(res => {
            navigate('/item-list/' + room_id);
          })
          .catch(err => {
            console.log('Error from ShowItemDetails_deleteClick', err);
          });
    }

    // const item = this.state.item;
    const itemTypes = {'conscious.DataHolderThing': 'Thing', 
                       'conscious.DataHolderItem': 'Item', 
                       'conscious.DataHolderCombineItem': 'CombineItem'}

    let optionalInfo = (<></>)
    if(itemTypes[item.ItemType] !== 'Thing') {
        optionalInfo = (
                    <>
                        <tr>
                            <td>Rotation</td>
                            <td>{ item.Rotation }</td>
                        </tr>
                        <tr>
                            <td>Position X</td>
                            <td>{ item.PositionX }</td>
                        </tr>
                        <tr>
                            <td>Position Y</td>
                            <td>{ item.PositionY }</td>
                        </tr>
                        <tr>
                            <td>Examine Text</td>
                            <td>{ item.ExamineText }</td>
                        </tr>
                        <tr>
                            <td>Is in inventory</td>
                            <td>{ String(item.IsInInventory) }</td>
                        </tr>
                        <tr>
                            <td>Useable</td>
                            <td>{ String(item.UseAble) }</td>
                        </tr>
                        <tr>
                            <td>Pickupable</td>
                            <td>{ String(item.PickUpAble) }</td>
                        </tr>
                        <tr>
                            <td>Combineable</td>
                            <td>{ String(item.CombineAble) }</td>
                        </tr>
                        <tr>
                            <td>Giveable</td>
                            <td>{ String(item.GiveAble) }</td>
                        </tr>
                        <tr>
                            <td>Use with</td>
                            <td>{ String(item.UseWith) }</td>
                        </tr>
                        <tr>
                            <td>Item Dependency</td>
                            <td>{ item.ItemDependency }</td>
                        </tr>
                    </>
                    )
        }

    let ItemShow = (
        <>
                    <div>
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
                                    <td>Id</td>
                                    <td>{ item.Id }</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{ item.Name }</td>
                                </tr>
                                <tr>
                                    <td>Texture Path</td>
                                    <td>{ item.texturePath }</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{ itemTypes[item.ItemType] }</td>
                                </tr>
                                { optionalInfo }
                            </tbody>
                        </table>
                    </div>
                    </>
                    )

    return (
        <div className='ShowItemDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <br />
                        <br />
                        <Link to={`/item-list/${room_id}`} className='btn btn-outline-warning float-left'>
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
                                onClick={ () => onDeleteClick(item._id) }>
                            Delete Item
                        </button>
                        <br />
                    </div>
                    <div className='col-md-6'>
                        <Link to={`/edit-item/${room_id}/${item._id}`} className='btn btn-outline-info btn-lg btn-block'>
                            Edit Item
                        </Link>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowItemDetails;
