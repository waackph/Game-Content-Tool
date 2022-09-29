import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as d3 from "d3";
import CheckboxField from '../InputElements/CheckboxField';
import ThoughtGraph from '../InputElements/ThoughtGraph';
import { addLinksToThoughtData, addItemIdToThoughtNodes, createDialogTreeStructure } from '../helpers/ItemThoughtHelpers';
import DialogGraph from '../InputElements/DialogGraph';


function CreateUpdateCharacter(props) {
  const [Id, setId] = useState(0);
  const [Name, setName] = useState('');
  const [texturePath, setTexturePath] = useState('');
  const [CharacterType, setCharacterType] = useState('conscious.DataHolderCharacter');
  const [Rotation, setRotation] = useState(0);
  const [PositionX, setPositionX] = useState(0);
  const [PositionY, setPositionY] = useState(0);
  const [ItemDependency, setItemDependency] = useState(-1);
  const [DialogUnlocked, setDialogUnlocked] = useState(false);
  const [Pronoun, setPronoun] = useState('');
  const [CatchPhrase, setCatchPhrase] = useState('');
  const [GiveAble, setGiveAble] = useState(false);
  const [MoodChange, setMoodChange] = useState(0);

  const defaultThought = {
    '_id': 1,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': 2,
        'Option': 'First link',
        '_validMoods': [0],
        'IsLocked': false,
        'NextNode': {
          '_id': 3,
          'Thought': 'First node',
          'IsRoot': false,
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]}
  const [Thought, setThought] = useState(defaultThought);

  let thoughtConnections = [];
  let exportedThoughts = {};

  // TODO: Add Dialog Graph
  // Structure:
    // TreeStructure: [
    //     nodes: {
    //         node: { edges: [ edge: {nextNodeId} ] }
    //         # -> Last node has an edge with nextNodeId=0
    //     }
    // ]
  // => A list of nodes, where a node contains the following edges. Each edge references the next node by its ID
  const [TreeStructure, setTreeStructure] = useState([]);
  let dialogConnections = [];
  let exportedDialog = {};


  const [allItems, setAllItems] = useState([]);

  let { room_id, character_id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if(character_id) {
      axios
        .get('http://localhost:8082/api/characters/' + room_id + '/' + character_id)  //this.props.match.params.room_id)
        .then(res => {
          console.log(res.data)
          setId(res.data.Id);
          setName(res.data.Name);
          setTexturePath(res.data.texture_path);
          setCharacterType(res.data.characterType);
          setRotation(res.data.Rotation);
          setPositionX(res.data.PositionX);
          setPositionY(res.data.PositionY);
          setItemDependency(res.data.ItemDependency);
          setDialogUnlocked(res.data.DialogUnlocked);
          setPronoun(res.data.Pronoun);
          setCatchPhrase(res.data.CatchPhrase);
          setGiveAble(res.data.GiveAble);
          setMoodChange(res.data.MoodChange);
          setThought(res.data.Thought);
          setTreeStructure(res.data.TreeStructure);
        })
        .catch(err => { 
          console.log('Error from CreateUpdateCharacter'); 
        });
    }
    // get all items for itemDependency select input
    axios
      .get('http://localhost:8082/api/items')
      .then(res => {
        setAllItems(res.data);
      })
      .catch(err => { 
        console.log('Error from getAllItems'); 
    });
  }, [room_id, character_id])

  const onChange = e => {
    if(e.target.name === 'Name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'texturePath') {
      setTexturePath(e.target.value);
    }
    else if(e.target.name === 'CharacterType') {
      setCharacterType(e.target.value);
    }
    else if(e.target.name === 'Rotation') {
      setRotation(e.target.value);
    }
    else if(e.target.name === 'PositionX') {
      setPositionX(e.target.value);
    }
    else if(e.target.name === 'PositionY') {
      setPositionY(e.target.value);
    }
    else if(e.target.name === 'ItemDependency') {
      setItemDependency(e.target.value);
    }
    else if(e.target.name === 'DialogUnlocked') {
      setDialogUnlocked(!DialogUnlocked);
    }
    else if(e.target.name === 'Pronoun') {
      setPronoun(e.target.value);
    }
    else if(e.target.name === 'CatchPhrase') {
      setCatchPhrase(e.target.value);
    }
    else if(e.target.name === 'GiveAble') {
      setGiveAble(!GiveAble);
    }
    else if(e.target.name === 'MoodChange') {
      setMoodChange(e.target.value);
    }
    else {
        console.log('No matching variable to fieldname');
    }
  };

  // Functions to manage Thought Graph
  const getGraphConnections = connections => {
    thoughtConnections = connections;
  }

  // Functions to manage Dialog Graph
  const getDialogGraphConnections = connections => {
    dialogConnections = connections;
  }

  function retrieveDialogDataFromGraph(e) {
    e.preventDefault();
    const svg = d3.select('#DialogGraphInput');
    let tempConnections = [...dialogConnections];

    exportedDialog = createDialogTreeStructure(svg, tempConnections);
    setTreeStructure(exportedDialog);
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

  const onSubmit = e => {
    e.preventDefault();
    // generate a random number between 1 and 10000 as Id of the Item
    // Warning: Unique ID generation not ensured for now
    // add item ID to all nodes of the Thought as field "ThingId"
    let data;
    if(Id === 0) {
      const tempId = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
      setThought(addItemIdToThoughtNodes(Thought, tempId));
      data = {
        Id: tempId,
        Name: Name,
        texture_path: texturePath,
        characterType: CharacterType,
        Rotation: Rotation,
        PositionX: PositionX,
        PositionY: PositionY,
        ItemDependency: ItemDependency,
        DialogUnlocked: DialogUnlocked,
        Pronoun: Pronoun,
        CatchPhrase: CatchPhrase,
        GiveAble: GiveAble,
        MoodChange: MoodChange,
        Thought: Thought,
        TreeStructure: TreeStructure
      };
    }
    else {
      setThought(addItemIdToThoughtNodes(Thought, Id));
      data = {
        Id: Id,
        Name: Name,
        texture_path: texturePath,
        characterType: CharacterType,
        Rotation: Rotation,
        PositionX: PositionX,
        PositionY: PositionY,
        ItemDependency: ItemDependency,
        DialogUnlocked: DialogUnlocked,
        Pronoun: Pronoun,
        CatchPhrase: CatchPhrase,
        GiveAble: GiveAble,
        MoodChange: MoodChange,
        Thought: Thought,
        TreeStructure: TreeStructure
      };
    }

    if(character_id) {
      axios
      .put('http://localhost:8082/api/characters/' + room_id + '/' + character_id, data)
      .then(res => {
        navigate(`/item-list/${room_id}`);
      })
      .catch(err => {
        console.log("Error in CreateUpdateCharacter!");
        console.log(err);
      })
    }
    else {
      axios
      .post('http://localhost:8082/api/characters/' + room_id, data)
      .then(res => {
        setId(0);
        setName('');
        setTexturePath('');
        setCharacterType('conscious.DataHolderCharacter');
        setRotation(0);
        setPositionX(0);
        setPositionY(0);
        setItemDependency(-1);
        setDialogUnlocked(false);
        setPronoun('');
        setCatchPhrase('');
        setGiveAble(false);
        setMoodChange(0);
        setThought(defaultThought);
        setTreeStructure([]);
        navigate(`/item-list/${room_id}`);
      })
      .catch(err => {
        console.log("Error in CreateUpdateCharacter!");
        console.log(err);
      })
    }
  };

  let selectItemOptions = allItems.map((item, idx) => {
    let val;
    val = <option key={idx} value={item['Id']}>{item['Name']}: {item['ExamineText']}</option>;
    return val;
  });

  // Decide what extended fields should be added
  let extendedInputs = (<></>)
  if(CharacterType === 'conscious.DataHolderPuzzleCharacter') {
    extendedInputs = (
      <>
        <div className="row">
          <div className="col-md-6 m-auto">
            <CheckboxField
                checkLabel='Dialog Unlocked'
                value={DialogUnlocked}
                name='DialogUnlocked'
                onChange={onChange}
              />
          </div>
          <div className="col-md-6 m-auto">
            <div className='form-group'>
              <div className="selectWrapper">
                <select className="form-select" name='ItemDependency'
                      onChange={onChange} value={ItemDependency}
                      aria-label="Select item type">
                  <option value="-1">No dependency</option>
                  { selectItemOptions }
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className="CreateCharacter">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Back to Room
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add/Update Character</h1>
            <p className="lead text-center">
                Create or update a character
            </p>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                  <input
                  type='text'
                  placeholder='Name of the Character'
                  name='Name'
                  className='form-control'
                  value={Name}
                  onChange={onChange}
                  />
              </div>
            </div>
            <div className="col-md-6 m-auto">
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
            </div>
          </div>

          <div className='row'>
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <div className="selectWrapper">
                  <select className="form-select" name='CharacterType' 
                          onChange={onChange} value={CharacterType}
                          aria-label="Select character type">
                    <option value="conscious.DataHolderCharacter">Character</option>
                    <option value="conscious.DataHolderPuzzleCharacter">PuzzleCharacter</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <input
                type='number'
                placeholder='Rotation'
                name='Rotation'
                className='form-control'
                value={Rotation}
                onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                  <input
                  type='number'
                  placeholder='X Position'
                  name='PositionX'
                  className='form-control'
                  value={PositionX}
                  onChange={onChange}
                  />
              </div>
            </div>

            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <input
                type='number'
                placeholder='Y Position'
                name='PositionY'
                className='form-control'
                value={PositionY}
                onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <CheckboxField
              checkLabel='Giveable'
              value={GiveAble}
              name='GiveAble'
              onChange={onChange} 
              />
            </div>

            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <div className="selectWrapper">
                  <select className="form-select" name='MoodChange' 
                          onChange={onChange} value={MoodChange}
                          aria-label="Select Mood Change">
                    <option value="0">None</option>
                    <option value="1">Depressed</option>
                    <option value="2">Regular</option>
                    <option value="3">Manic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                  <input
                  type='text'
                  placeholder='Pronoun'
                  name='Pronoun'
                  className='form-control'
                  value={Pronoun}
                  onChange={onChange}
                  />
              </div>
            </div>

            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <input
                type='text'
                placeholder='Catch Phrase'
                name='CatchPhrase'
                className='form-control'
                value={CatchPhrase}
                onChange={onChange}
                />
              </div>
            </div>
          </div>

          <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#itemThoughtInputs" 
            role="button" aria-expanded="false" aria-controls="collapseExample">
              Thought
          </a>
          <div className="collapse mt-2 mb-2" id="itemThoughtInputs">
            <ThoughtGraph svgId={'ThoughtGraphInput'} data={Thought} getConnections={getGraphConnections} exportGraphToParent={retrieveThoughtDataFromGraph} />
            <button onClick={retrieveThoughtDataFromGraph} className="m-2">Export!</button>
          </div>
          <br></br>

          <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#characterDialogInputs" 
            role="button" aria-expanded="false" aria-controls="collapseExample">
              Dialog
          </a>
          <div className="collapse mt-2 mb-2" id="characterDialogInputs">
            <DialogGraph svgId={'DialogGraphInput'} data={TreeStructure} getConnections={getDialogGraphConnections} exportGraphToParent={retrieveDialogDataFromGraph} />
            <button onClick={retrieveDialogDataFromGraph} className="m-2">Export!</button>
          </div>
          <br></br>

          { extendedInputs }

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateCharacter;