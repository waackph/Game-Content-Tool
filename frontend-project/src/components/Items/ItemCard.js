import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const ItemCard = (props) => {
    const item = props.item;

    return (
        <div className='card-container'>
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
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

export default ItemCard;