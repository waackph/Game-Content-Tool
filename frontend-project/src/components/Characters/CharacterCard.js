import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import { ASSET_FOLDER } from "../../constants";

// ***
// A card element used for the ShowItemList view to list all characters defined.
// ***

const CharacterCard = (props) => {
    const character = props.character;
    const room_id = props.room_id; 

    return (
        <div className='card-container'>
            <img src={`${ASSET_FOLDER}/${character.texturePath}`} alt="" className="img-texture" />
            <div className='desc'>
                <h2>
                    <Link to={`/show-character/${room_id}/${character._id}`}>
                        {character.Name}
                    </Link>
                </h2>
                <p>{character.texturePath}</p>
            </div>
        </div>
    )
};

export default CharacterCard;