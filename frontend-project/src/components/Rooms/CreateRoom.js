import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import SequenceCard from '../InputElements/SequenceCard';
import axios from 'axios';
import * as d3 from "d3";
import ThoughtGraph from '../InputElements/ThoughtGraph';
import { addLinksToThoughtData } from '../helpers/ItemThoughtHelpers';
import { defaultThought } from "../helpers/ThoughTreeDisplay";

// ***
// The input view to create a new Room object.
// ***

function CreateRoom (props) {

  const [Name, setName] = useState('');
  const [RoomWidth, setRoomWidth] = useState(0);
  const [texturePath, setTexturePath] = useState('');
  const [SoundFilePath, setSoundFilePath] = useState('');
  const [LightMapPath, setLightMapPath] = useState('');
  const [EntrySequence, setEntrySequence] = useState({'Commands': []});
  const [Thought, setThought] = useState(defaultThought);

  let thoughtConnections = [];
  let exportedThoughts = {};

  let navigate = useNavigate();

  const onChange = e => {
    if(e.target.name === 'Name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'RoomWidth') {
      setRoomWidth(e.target.value);
    }
    else if(e.target.name === 'texturePath') {
      setTexturePath(e.target.value);
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
      console.log('No matching variable to fieldname' + e.target.value)
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

    const data = {
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
      .post('http://localhost:8082/api', data)
      .then(res => {
        setName('');
        setRoomWidth('');
        setTexturePath('');
        setSoundFilePath('');
        setLightMapPath('');
        setEntrySequence({'Commands': []});
        setThought(defaultThought);
        navigate(`/item-list/${res.data._id}`); //"/item-list/" + res._id);
      })
      .catch(err => {
        console.log("Error in CreateRoom!");
      })
  };

  return (
    <div className="CreateRoom">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show Room List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Room</h1>
            <p className="lead text-center">
                Create new Room
            </p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Room'
                  name='Name'
                  className='form-control'
                  value={Name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Room Width'
                  name='RoomWidth'
                  className='form-control'
                  value={RoomWidth}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Texture Path'
                  name='texturePath'
                  className='form-control'
                  value={texturePath}
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


              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;