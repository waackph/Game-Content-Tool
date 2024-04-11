import React, { useEffect, useState } from 'react';
import '../../App.css';
import * as d3 from "d3";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard'
import CharacterCard from '../Characters/CharacterCard'
import SequenceCard from '../InputElements/SequenceCard';
import ThoughtGraph from '../InputElements/ThoughtGraph';
import { addLinksToThoughtData } from '../helpers/ItemThoughtHelpers';
import { defaultThought } from "../helpers/ThoughTreeDisplay";

// ***
// A view that has a given Rooms data and input mask to update Room data
// as well as cards that show the Items and Characters as Card elements, that are stored in the Room.
// ***

function ShowItemList(props) {

    const [room, setRoom] = useState([]);
    const [Name, setName] = useState('');
    const [texturePath, setTexturePath] = useState('');
    const [RoomWidth, setRoomWidth] = useState(0);
    const [SoundFilePath, setSoundFilePath] = useState('');
    const [LightMapPath, setLightMapPath] = useState('');
    const [EntrySequence, setEntrySequence] = useState({'Commands': []});
    const [Thought, setThought] = useState(defaultThought);

    let thoughtConnections = [];
    let exportedThoughts = {};  

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
            setSoundFilePath(res.data.SoundFilePath);
            setLightMapPath(res.data.LightMapPath);
            const tmpThought = res.data.Thought;
            if(tmpThought == null){
                setThought(defaultThought);
            }
            else{
                setThought(tmpThought);
            }
            if(res.data.EntrySequence){
                setEntrySequence(res.data.EntrySequence);
            }
            else{
                setEntrySequence({'Commands': []});
            }
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
        else if(e.target.name === 'SoundFilePath') {
            setSoundFilePath(e.target.value);
        }
        else if(e.target.name === 'LightMapPath') {
            setLightMapPath(e.target.value);
        }
        else if(['CommandType',
        'DestinationX', 'DestinationY', 
        'MillisecondsToWait', 'CmdSoundFilePath',
        'DoorId'].includes(e.target.name)) {
            let cmds = [...EntrySequence.Commands];
            cmds[e.target.dataset.id][e.target.name] = e.target.value;
            setEntrySequence({...EntrySequence, Commands: cmds});
        }
        else {
            console.log('No matching variable to fieldname')
        }
    };

    const addSequenceCommand = (e) => {
        if(e) {
            e.preventDefault();
        }
        const defaultCommand = {index: Math.random(), DestinationX: 0, DestinationY: 0, CommandType: 'conscious.DataHolderWalkCommand, conscious'}
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

    function retrieveThoughtDataFromGraph(e) {
        e.preventDefault();
        const svg = d3.select('#ThoughtGraphInput');
        let tempConnections = [...thoughtConnections];
    
        const rootConnection = thoughtConnections[0];
        const rootNodeId = rootConnection.parentNode;
        let root = svg.select('#n'+rootNodeId).data()[0];
        root['Links'] = addLinksToThoughtData(svg, tempConnections, rootNodeId);
        exportedThoughts = root;
        console.log(exportedThoughts);
        setThought(exportedThoughts);
      }

      // Functions to manage Thought Graph
      const getGraphConnections = connections => {
        thoughtConnections = connections;
      }

    const onSubmit = e => {
        e.preventDefault();

        // We do not need a thought id because it is not owned by a thought
        // setThought(addItemIdToThoughtNodes(Thought, Id));

        let data = {
            Name: Name,
            RoomWidth: RoomWidth,
            texturePath: texturePath,
            SoundFilePath: SoundFilePath,
            LightMapPath: LightMapPath,
            Thought: Thought
        };

        if(EntrySequence.Commands.length !== 0) {
            data['EntrySequence'] = EntrySequence;
        }
        else{
            data['EntrySequence'] = null;
        }

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

                        <div className='form-group'>
                            <input
                            type='text'
                            placeholder='Sound File Path'
                            name='SoundFilePath'
                            className='form-control'
                            value={SoundFilePath}
                            onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                            type='text'
                            placeholder='Light Map Path'
                            name='LightMapPath'
                            className='form-control'
                            value={LightMapPath}
                            onChange={onChange}
                            />
                        </div>

                        <SequenceCard sequence={EntrySequence} add={addSequenceCommand} delete={deleteRow} onChange={onChange} />


                        <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#itemThoughtInputs" 
                            role="button" aria-expanded="false" aria-controls="collapseExample">
                            Thought
                        </a>
                        <div className="collapse mt-2 mb-2" id="itemThoughtInputs">
                            <ThoughtGraph svgId={'ThoughtGraphInput'} data={Thought} getConnections={getGraphConnections} exportGraphToParent={retrieveThoughtDataFromGraph} />
                            <button onClick={retrieveThoughtDataFromGraph} className="m-2">Export!</button>
                        </div>
                        <br></br>


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