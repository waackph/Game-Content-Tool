import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const RoomCard = (props) => {
    const item = props.item;

    return (
        <div className='card-container'>
            <img src={`/static/${item.texture_path}`} alt="" />
            <div className='desc'>
                <h2>
                    <Link to={`/show-item/${item._id}`}>
                        {item.name}
                    </Link>
                </h2>
                <p>{item.texture_path}</p>
            </div>
        </div>
    )
};

export default RoomCard;