import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import { ASSET_FOLDER } from "../../constants";

// ***
// A card element used for the ShowRoomList view to list each Room defined as a card element.
// ***

const RoomCard = (props) => {
    const room = props.room;

    return (
        <div className='card-container'>
            <img src={`${ASSET_FOLDER}/${room.texturePath}`} alt="" className="img-texture" />
            <div className='desc'>
                <h2>
                    <Link to={`/item-list/${room._id}`}>
                        {room.Name}
                    </Link>
                </h2>
                <p>{room.RoomWidth}</p>
            </div>
        </div>
    )
};

export default RoomCard;