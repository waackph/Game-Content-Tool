import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import { ASSET_FOLDER } from "../../constants";

// ***
// A card element used for the ShowItemList view to list each Item defined as a card element.
// ***

const ItemCard = (props) => {
    const item = props.item;
    const room_id = props.room_id; 

    return (
        <div className='card-container'>
            <img src={`${ASSET_FOLDER}//${item.texturePath}`} alt="" className="img-texture" />
            <div className='desc'>
                <h2>
                    <Link to={`/show-item/${room_id}/${item._id}`}>
                        {item.Name}
                    </Link>
                </h2>
                <p>{item.texturePath}</p>
            </div>
        </div>
    )
};

export default ItemCard;