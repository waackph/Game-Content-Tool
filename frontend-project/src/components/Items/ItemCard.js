import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const ItemCard = (props) => {
    const item = props.item;
    const room_id = props.room_id; 

    return (
        <div className='card-container'>
            <img src={`/static/${item.texture_path}`} alt="" className="img-texture" />
            <div className='desc'>
                <h2>
                    <Link to={`/show-item/${room_id}/${item._id}`}>
                        {item.name}
                    </Link>
                </h2>
                <p>{item.texture_path}</p>
            </div>
        </div>
    )
};

export default ItemCard;