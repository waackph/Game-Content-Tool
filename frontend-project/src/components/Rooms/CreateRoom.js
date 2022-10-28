import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import SequenceCard from '../InputElements/SequenceCard';
import axios from 'axios';

function CreateRoom (props) {

  const [Name, setName] = useState('');
  const [RoomWidth, setRoomWidth] = useState(0);
  const [texturePath, setTexturePath] = useState('');
  const [SoundFilePath, setSoundFilePath] = useState('');
  const [LightMapPath, setLightMapPath] = useState('');
  const [EntrySequence, setEntrySequence] = useState({'Commands': []});

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
             '_destinationX', '_destinationY', 
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
    const defaultCommand = {index: Math.random(), _destinationX: 0, _destinationY: 0, CommandType: 'conscious.DataHolderWalkCommand, conscious'}
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

    const data = {
      Name: Name,
      RoomWidth: RoomWidth,
      texturePath: texturePath,
      SoundFilePath: SoundFilePath,
      LightMapPath: LightMapPath,
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