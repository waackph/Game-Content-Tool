import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard'
import CharacterCard from '../Characters/CharacterCard'
import SequenceCard from '../InputElements/SequenceCard';


function ShowItemList(props) {

    const [room, setRoom] = useState([]);
    const [Name, setName] = useState([]);
    const [texturePath, setTexturePath] = useState([]);
    const [RoomWidth, setRoomWidth] = useState([]);
    const [EntrySequence, setEntrySequence] = useState({'_currentIndex': 1, 'SequenceFinished': false, 'Commands': []});

    let { room_id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get('http://localhost:8082/api/items/' + room_id)
          .then(res => {
            setRoom(res.data);
            setName(res.data.Name);
            setTexturePath(res.data.texturePath);
            setRoomWidth(res.data.RoomWidth);
            setEntrySequence(res.data.EntrySequence);
          })
          .catch(err => { 
            console.log('Error from ShowItemList'); 
        });
    }, [room_id])

    const onDeleteClick = (id) => {
        axios
          .delete('http://localhost:8082/api/' + id)
          .then(res => {
            navigate('/');
          })
          .catch(err => {
            console.log('Error from ShowItemList_deleteClick', err);
          });
    }

    const onChange = e => {
        if(e.target.name === 'Name') {
            setName(e.target.value);
        }
        else if(e.target.name === 'texturePath') {
            setTexturePath(e.target.value);
        }
        else if(e.target.name === 'RoomWidth') {
            setRoomWidth(e.target.value);
        }
        else if(['_destinationX', '_destinationY', 'CommandType'].includes(e.target.name)) {
            let cmds = [...EntrySequence.Commands];
            cmds[e.target.dataset.id][e.target.name] = e.target.value;
            setEntrySequence({...EntrySequence, Commands: cmds});
        }
        else {
            console.log('No matching variable to fieldname')
        }
    };

    const addSequenceCommand = (e) => {
        e.preventDefault();
        const defaultCommand = {index: Math.random(), _destinationX: 0, _destinationY: 0, CommandFinished: false, CommandType: 'conscious.DataHolderWalkCommand, conscious'}
        setEntrySequence({
            ...EntrySequence, 
            Commands: [...EntrySequence.Commands, defaultCommand]
        })
    }

    const deleteRow = (e, cmd) => {
        setEntrySequence({
            ...EntrySequence, 
            Commands: EntrySequence.Commands.filter(val => val !== cmd)
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        let data = {
            Name: Name,
            RoomWidth: RoomWidth,
            texturePath: texturePath,
        };

        if(EntrySequence.Commands.length !== 0) {
            data['EntrySequence'] = EntrySequence;
        }
        console.log(data);

        axios
          .put('http://localhost:8082/api/' + room_id, data)
          .then(res => {
            navigate('/item-list/' + room_id);
          })
          .catch(err => {
              console.log('Error in UpdateItemInfo');
          });
    };

    let itemList;
    if(!room.Items) {
        itemList = 'There is no item record!';
    }
    else {
        itemList = room.Items.map((item, k) =>
            <ItemCard item={item} room_id={room_id} key={k} />
        );
    }

    let characterList;
    if(!room.Characters) {
        characterList = 'There is no character record!';
    }
    else {
        characterList = room.Characters.map((character, k) =>
            <CharacterCard character={character} room_id={room_id} key={k} />
        );
    }

    return (
        <div className='ShowItemList'>
            <div className='container'>
                <div className='row'>
                <div className="col-md-8 m-auto">
                    <br />
                    <Link to="/" className="btn btn-outline-warning float-left">
                        Show Room List
                    </Link>
                    </div>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>{Name}</h2>
                    </div>
                    <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="Name">Name</label>
                            <input
                                type='text'
                                placeholder='Name of the Item'
                                name='Name'
                                className='form-control'
                                value={Name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="texturePath">Texture Path</label>
                            <input
                                type='text'
                                placeholder='texturePath'
                                name='texturePath'
                                className='form-control'
                                value={texturePath}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="RoomWidth">Room Width Path</label>
                            <input
                                type='text'
                                placeholder='RoomWidth'
                                name='RoomWidth'
                                className='form-control'
                                value={RoomWidth}
                                onChange={onChange}
                            />
                        </div>

                        <SequenceCard sequence={EntrySequence} add={addSequenceCommand} delete={deleteRow} onChange={onChange} />

                        <button type="submit" className="btn btn-outline-info btn-lg btn-block">
                            Update Room
                        </button>
                        <button type='button' 
                                className='btn btn-outline-danger btn-lg btn-block' 
                                onClick={ () => onDeleteClick(room._id) }>
                            Delete Room
                        </button>

                    </form>
                    </div>

                    <div className='col-md-11'>
                        <br />
                        <br />
                        <hr />

                        <Link to={`/create-item/${room_id}`} className='btn btn-outline-warning float-right'>
                            + Add new Item
                        </Link>

                        <Link to={`/create-character/${room_id}`} className='btn btn-outline-warning float-right'>
                            + Add new Character
                        </Link>
                    </div>
                </div>
                <div className='list'>
                    <h6>Items:</h6>
                    {itemList}
                </div>
                <div className='list'>
                    <h6>Characters:</h6>
                    {characterList}
                </div>
                <br />
            </div>
        </div>
    );
}

export default ShowItemList;