import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const RoomCard = (props) => {
    const room = props.room;

    return (
        <div className='card-container'>
            <img src={`/static/${room.texture_path}`} alt="" className="img-texture" />
            <div className='desc'>
                <h2>
                    <Link to={`/item-list/${room._id}`}>
                        {room.name}
                    </Link>
                </h2>
                <p>{room.room_width}</p>
            </div>
        </div>
    )
};

export default RoomCard;