import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as d3 from "d3";
import '../../App.css';
import CheckboxField from '../InputElements/CheckboxField';
import ThoughtGraph from '../InputElements/ThoughtGraph';
import { addLinksToThoughtData, addItemIdToThoughtNodes } from '../helpers/ItemThoughtHelpers';
import { createRandomId } from '../helpers/GeneralHelpers';

// ***
// The input view to create an Item object.
// ***

function CreateItem (props) {

  const [Name, setName] = useState('');
  const [texturePath, setTexturePath] = useState('');
  const [ItemType, setItemType] = useState('conscious.DataHolderItem, conscious');
  const [Rotation, setRotation] = useState(0);
  const [PositionX, setPositionX] = useState(0);
  const [PositionY, setPositionY] = useState(0);
  // Thing variables
  const [DrawOrder, setDrawOrder] = useState(3);
  const [ExamineText, setExamineText] = useState('');
  // Item variables
  const [IsInInventory, setIsInInventory] = useState(false);
  const [UseAble, setUseAble] = useState(false);
  const [PickUpAble, setPickUpAble] = useState(false);
  const [CombineAble, setCombineAble] = useState(false);
  const [GiveAble, setGiveAble] = useState(false);
  const [UseWith, setUseWith] = useState(false);
  const [ItemDependency, setItemDependency] = useState(-1);
  // Door variables
  const [RoomId, setRoomId] = useState(0);
  const [DoorId, setDoorId] = useState(0);
  const [IsUnlocked, setIsUnlocked] = useState(false);
  const [InitPlayerPosX, setInitPlayerPosX] = useState(-1);
  const [InitPlayerPosY, setInitPlayerPosY] = useState(-1);
  const [CloseTexturePath, setCloseTexturePath] = useState('');
  
  const firstId = createRandomId();
  const secondId = createRandomId();
  const thirdId = createRandomId();
  const defaultThought = {
    'Id': firstId,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'LinkageId': 0,
    'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': secondId,
        'Option': 'First link',
        'ValidMoods': [0],
        'IsLocked': false,
        'linkType': 'conscious.DataHolderThoughtLink, conscious',
        'NextNode': {
          'Id': thirdId,
          'Thought': 'First node',
          'IsRoot': false,
          'LinkageId': 0,
          'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]}
  const [Thought, setThought] = useState(defaultThought);
  const [allItems, setAllItems] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  const forthId = createRandomId();
  const fifthId = createRandomId();
  const sixthId = createRandomId();
  const defaultCombineThought = {
    'Id': forthId,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'LinkageId': 0,
    'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': fifthId,
        'Option': 'First link',
        'ValidMoods': [0],
        'IsLocked': false,
        'linkType': 'conscious.DataHolderThoughtLink, conscious',
        'NextNode': {
          'Id': sixthId,
          'Thought': 'First node',
          'IsRoot': false,
          'LinkageId': 0,
          'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]}
  const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem, conscious',
  'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 'DrawOrder': 3,
  'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
  'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1,
  'Thought': defaultCombineThought}
  const [CombineItem, setCombineItem] = useState(defaultCombineItem);

  let thoughtConnections = [];
  let exportedThoughts = {};

  let combineThoughtConnections = [];
  let combineExportedThoughts = {};

  let { room_id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // get all items for itemDependency select input
    axios
      .get('http://localhost:8082/api/items')
      .then(res => {
        setAllItems(res.data);
      })
      .catch(err => { 
        console.log('Error from getAllItems'); 
    });

    // get all rooms for roomId in case of door type as select input
    axios
      .get('http://localhost:8082/api/rooms')
      .then(res => {
        setAllRooms(res.data);
      })
      .catch(err => { 
        console.log('Error from getAllRooms'); 
    });
  }, [])


  const onChange = e => {
    if(e.target.name === 'Name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'texturePath') {
      setTexturePath(e.target.value);
    }
    else if(e.target.name === 'ItemType') {
      setItemType(e.target.value);
      if(e.target.value === 'conscious.DataHolderCombineItem, conscious') {
        setCombineAble(true);
      }
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
    else if(e.target.name === 'DrawOrder') {
      setDrawOrder(e.target.value);
    }
    else if(e.target.name === 'ExamineText') {
      setExamineText(e.target.value);
    }
    else if(e.target.name === 'IsInInventory') {
      setIsInInventory(!IsInInventory);
    }
    else if(e.target.name === 'UseAble') {
      setUseAble(!UseAble);
    }
    else if(e.target.name === 'PickUpAble') {
      setPickUpAble(!PickUpAble);
    }
    else if(e.target.name === 'CombineAble') {
      setCombineAble(!CombineAble);
    }
    else if(e.target.name === 'GiveAble') {
      setGiveAble(!GiveAble);
    }
    else if(e.target.name === 'UseWith') {
      setUseWith(!UseWith);
    }
    else if(e.target.name === 'ItemDependency') {
      setItemDependency(e.target.value);
    }
    else if(e.target.name === 'RoomId') {
      setRoomId(e.target.value);
    }
    else if(e.target.name === 'DoorId') {
      setDoorId(e.target.value);
    }
    else if(e.target.name === 'IsUnlocked') {
      setIsUnlocked(!IsUnlocked);
    }
    else if(e.target.name === 'InitPlayerPosX') {
      setInitPlayerPosX(e.target.value);
    }
    else if(e.target.name === 'InitPlayerPosY') {
      setInitPlayerPosY(e.target.value);
    }
    else if(e.target.name === 'CloseTexturePath') {
      setCloseTexturePath(e.target.value);
    }
    else {
        console.log('No matching variable to fieldname')
    }
  };

  const onChangeCombineItem = e => {
    let { name, value } = e.target;
    if(name !== 'Thought') {
      // In case of checkbox value, assign correct boolean
      if(value === 'on') {
        name = name.substring(4);
        value = !CombineItem[name];
      }
      setCombineItem({
        ...CombineItem,
        [name]: value,
      })
    }
  }

  const getGraphConnections = connections => {
    thoughtConnections = connections;
  }

  const getCombineGraphConnections = connections => {
    combineThoughtConnections = connections;
  }

  // Update the thought field from the graph to rerender the whole view correctly, if something else is changed
  function retrieveThoughtDataFromGraph(e) {
    if(e) {
      e.preventDefault();
    }
    const svg = d3.select('svg');
    let tempConnections = [...thoughtConnections];

    const rootConnection = thoughtConnections[0];
    const rootNodeId = rootConnection.parentNode;
    let root = svg.select('#n'+rootNodeId).data()[0];
    root['Links'] = addLinksToThoughtData(svg, tempConnections, rootNodeId);
    exportedThoughts = root;
    setThought(exportedThoughts);
  }

  // Update the combineItem thought field from the graph to rerender the whole view correctly, if something else is changed
  function retrieveCombineThoughtDataFromGraph(e) {
    if(e) {
      e.preventDefault();
    }
    const svg = d3.select('svg');
    let tempConnections = [...combineThoughtConnections];

    const rootConnection = combineThoughtConnections[0];
    const rootNodeId = rootConnection.parentNode;
    let root = svg.select('#n'+rootNodeId).data()[0];
    root['Links'] = addLinksToThoughtData(svg, tempConnections, rootNodeId);
    combineExportedThoughts = root;
    setCombineItem({
      ...CombineItem,
      'Thought': combineExportedThoughts,
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    // generate a random number between 1 and 10000 as Id of the Item
    // Warning: Unique ID generation not ensured for now
    const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    // add item ID to all nodes of the Thought as field "ThingId"
    setThought(addItemIdToThoughtNodes(Thought, Id));
    let data = {
      Id: Id,
      Name: Name,
      texturePath: texturePath,
      ItemType: ItemType,
      Rotation: Rotation,
      PositionX: PositionX,
      PositionY: PositionY,
      DrawOrder: DrawOrder,
      ExamineText: ExamineText,
      IsInInventory: IsInInventory,
      UseAble: UseAble,
      PickUpAble: PickUpAble,
      CombineAble: CombineAble,
      GiveAble: GiveAble,
      UseWith: UseWith,
      ItemDependency: ItemDependency,
      RoomId: RoomId,
      DoorId: DoorId,
      IsUnlocked: IsUnlocked,
      InitPlayerPosX: InitPlayerPosX,
      InitPlayerPosY: InitPlayerPosY,
      CloseTexturePath: CloseTexturePath,
      Thought: Thought
    };
    if(ItemType === 'conscious.DataHolderCombineItem, conscious') {
      const IdCombine = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
      CombineItem.Thought = addItemIdToThoughtNodes(CombineItem.Thought, IdCombine);
      data = {...data, CombineItem: {...CombineItem, Id: IdCombine}};
    }

    axios
      .post('http://localhost:8082/api/items/' + room_id, data)
      .then(res => {
        setName('');
        setTexturePath('');
        setItemType('conscious.DataHolderItem, conscious');
        setRotation(0);
        setPositionX(0);
        setPositionY(0);
        setExamineText('');
        setIsInInventory(false);
        setUseAble(false);
        setPickUpAble(false);
        setCombineAble(false);
        setGiveAble(false);
        setUseWith(false);
        setItemDependency(-1);
        setCombineItem(defaultCombineItem);
        setRoomId(0);
        setIsUnlocked(false);
        setInitPlayerPosX(0);
        setInitPlayerPosY(0);
        setCloseTexturePath('');
        setThought(defaultThought);
        navigate(`/item-list/${room_id}`);
      })
      .catch(err => {
        console.log("Error in CreateItem!");
        console.log(err);
      })
  };

  let selectItemOptions = allItems.map((item, idx) => {
    let val;
    if(item['ItemType'] !== 'conscious.DataHolderThing, conscious') {
      val = <option key={idx} value={item['Id']}>{item['Name']}</option>;
    }
    return val;
  });

  let selectRoomOptions = allRooms.map((room, idx) => {
    let val;
    if(room['_id'] !== room_id) {
      val = <option key={idx} value={room['Id']}>{room['Name']}</option>;
    }
    return val;
  });

  // Decide what extended fields should be added
  let extendedInputs = (<></>)
  if(ItemType !== 'conscious.DataHolderThing, conscious') {
    // append different sets of components using inputs = [input1, input2]
    extendedInputs = (
    <>
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <input
                type='text'
                placeholder='Examine Text'
                name='ExamineText'
                className='form-control'
                value={ExamineText}
                onChange={onChange}
            />
          </div>
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
      
      <div className="row">
        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Is in inventory'
          value={IsInInventory}
          name='IsInInventory'
          onChange={onChange} 
          />
        </div>

        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Is useable'
          value={UseAble}
          name='UseAble'
          onChange={onChange} 
          />
        </div>

        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Pickupable'
          value={PickUpAble}
          name='PickUpAble'
          onChange={onChange} 
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Combineable'
          value={CombineAble}
          name='CombineAble'
          onChange={onChange} 
          />
        </div>

        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Giveable'
          value={GiveAble}
          name='GiveAble'
          onChange={onChange} 
          />
        </div>

        <div className="col-md-4 m-auto">
          <CheckboxField
          checkLabel='Use with'
          value={UseWith}
          name='UseWith'
          onChange={onChange} 
          />
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
    </>
    )
  }

  console.log(allRooms)

  let extendedDoorInputs = (<></>)
  if(ItemType === 'conscious.DataHolderDoor, conscious') {
    // append different sets of components using inputs = [input1, input2]
    extendedDoorInputs = (
    <>
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <input
                type='number'
                placeholder='Init Player Pos X'
                name='InitPlayerPosX'
                className='form-control'
                value={InitPlayerPosX}
                onChange={onChange}
            />
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <input
                type='number'
                placeholder='Init Player Pos Y'
                name='InitPlayerPosY'
                className='form-control'
                value={InitPlayerPosY}
                onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <input
                type='text'
                placeholder='Close Texture Path'
                name='CloseTexturePath'
                className='form-control'
                value={CloseTexturePath}
                onChange={onChange}
            />
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <div className="selectWrapper">
              <select className="form-select" name='RoomId' 
                    onChange={onChange} value={RoomId}
                    aria-label="Select Room the door leads to">
                <option value="-1">No Room Selected</option>
                { selectRoomOptions }
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="col-md-6 m-auto">
          <div className='form-group'>
            <input
                type='number'
                placeholder='Door Id'
                name='DoorId'
                className='form-control'
                value={DoorId}
                onChange={onChange}
            />
          </div>
        </div>

        <div className="col-md-6 m-auto">
            <CheckboxField
            checkLabel='Is unlocked'
            value={IsUnlocked}
            name='IsUnlocked'
            onChange={onChange} 
            />
        </div>
      </div>
    </>
    )
  }

  let combineItemInputs = (<></>);
  if(ItemType === 'conscious.DataHolderCombineItem, conscious') {
    combineItemInputs = (
      <>
        <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#combineInputs" 
           role="button" aria-expanded="false" aria-controls="collapseExample">
          Combine Item
        </a>
        <div className="collapse mt-2 mb-2" id="combineInputs">
          <div className="row">
              <div className="col-md-6 m-auto">
                <div className='form-group'>
                    <input
                    type='text'
                    placeholder='Name of the Item'
                    name='Name'
                    className='form-control'
                    value={CombineItem.Name}
                    onChange={onChangeCombineItem}
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
                    value={CombineItem.texturePath}
                    onChange={onChangeCombineItem}
                    />
                </div>
              </div>
            </div>
          <div className='row'>
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <div className="selectWrapper">
                  <select className="form-select" name='ItemType' 
                          onChange={onChangeCombineItem} defaultValue="conscious.DataHolderItem, conscious"
                          aria-label="Select item type">
                    <option value="conscious.DataHolderThing, conscious">Thing</option>
                    <option value="conscious.DataHolderItem, conscious">Item</option>
                    {/* <option value="conscious.DataHolderDoor, conscious">Door</option> */}
                    <option value="conscious.DataHolderKey, conscious">Key</option>
                    {/* <option value="conscious.DataHolderCombineItem, conscious">CombineItem</option> */}
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
                value={CombineItem.Rotation}
                onChange={onChangeCombineItem}
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
                    value={CombineItem.PositionX}
                    onChange={onChangeCombineItem}
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
                  value={CombineItem.PositionY}
                  onChange={onChangeCombineItem}
                  />
                </div>
              </div>
            </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <input
                type='number'
                placeholder='Draw Order'
                name='DrawOrder'
                className='form-control'
                value={CombineItem.DrawOrder}
                onChange={onChangeCombineItem}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <input
                    type='text'
                    placeholder='Examine Text'
                    name='ExamineText'
                    className='form-control'
                    value={CombineItem.ExamineText}
                    onChange={onChangeCombineItem}
                />
              </div>
            </div>
            <div className="col-md-6 m-auto">
              <div className='form-group'>
                <div className="selectWrapper">
                  <select className="form-select" name='ItemDependency' 
                        onChange={onChangeCombineItem} value={CombineItem.ItemDependency}
                        aria-label="Select item type">
                    <option value="-1">No dependency</option>
                    { selectItemOptions }
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Is in inventory'
              value={CombineItem.IsInInventory}
              name='combIsInInventory'
              onChange={onChangeCombineItem} 
              />
            </div>

            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Is useable'
              value={CombineItem.UseAble}
              name='combUseAble'
              onChange={onChangeCombineItem} 
              />
            </div>

            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Pickupable'
              value={CombineItem.PickUpAble}
              name='combPickUpAble'
              onChange={onChangeCombineItem} 
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Combineable'
              value={CombineItem.CombineAble}
              name='combCombineAble'
              onChange={onChangeCombineItem} 
              />
            </div>

            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Giveable'
              value={CombineItem.GiveAble}
              name='combGiveAble'
              onChange={onChangeCombineItem} 
              />
            </div>

            <div className="col-md-4 m-auto">
              <CheckboxField
              checkLabel='Use with'
              value={CombineItem.UseWith}
              name='combUseWith'
              onChange={onChangeCombineItem} 
              />
            </div>
          </div>

          <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#combineItemThoughtInputs" 
           role="button" aria-expanded="false" aria-controls="collapseExample">
              Thought
          </a>
          <div className="collapse mt-2 mb-2" id="combineItemThoughtInputs">
            <ThoughtGraph svgId={'CombineItemThoughtGraphInput'} data={CombineItem.Thought} getConnections={getCombineGraphConnections} exportGraphToParent={retrieveCombineThoughtDataFromGraph} />
            <button onClick={retrieveCombineThoughtDataFromGraph} className="m-2">Export!</button>
          </div>

        </div>
      </>
    )
  }

  return (
    <div className="CreateItem">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show Item List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Item</h1>
            <p className="lead text-center">
                Create new item
            </p>
          </div>
        </div>

            <form noValidate onSubmit={onSubmit}>
              <div className="row">
                  <div className="col-md-6 m-auto">
                    <div className='form-group'>
                        <input
                        type='text'
                        placeholder='Name of the Item'
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
                      <select className="form-select" name='ItemType' 
                              onChange={onChange} defaultValue="conscious.DataHolderItem"
                              aria-label="Select item type">
                        <option value="conscious.DataHolderThing, conscious">Thing</option>
                        <option value="conscious.DataHolderItem, conscious">Item</option>
                        <option value="conscious.DataHolderDoor, conscious">Door</option>
                        <option value="conscious.DataHolderKey, conscious">Key</option>
                        <option value="conscious.DataHolderCombineItem, conscious">CombineItem</option>
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
                    <div className='form-group'>
                      <input
                      type='number'
                      placeholder='Draw Order'
                      name='DrawOrder'
                      className='form-control'
                      value={DrawOrder}
                      onChange={onChange}
                      />
                    </div>
                  </div>
                </div>

              { extendedInputs }

              {/* Add Door Item fields */}
              { extendedDoorInputs }

              {/* Add combine Item fields */}
              { combineItemInputs }

              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
      </div>
    </div>
  );
}

export default CreateItem;