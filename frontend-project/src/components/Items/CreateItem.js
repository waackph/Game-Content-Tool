import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CheckboxField from '../InputElements/CheckboxField';
import '../../App.css';
import axios from 'axios';
import ThoughtGraph from '../InputElements/ThoughtGraph';
import * as d3 from "d3";

function CreateItem (props) {

  // TODO: Add object type input field Thought
  const [Name, setName] = useState('');
  const [texturePath, setTexturePath] = useState('');
  const [ItemType, setItemType] = useState('conscious.DataHolderItem');
  const [Rotation, setRotation] = useState(0);
  const [PositionX, setPositionX] = useState(0);
  const [PositionY, setPositionY] = useState(0);
  const [ExamineText, setExamineText] = useState('');
  const [IsInInventory, setIsInInventory] = useState(false);
  const [UseAble, setUseAble] = useState(false);
  const [PickUpAble, setPickUpAble] = useState(false);
  const [CombineAble, setCombineAble] = useState(false);
  const [GiveAble, setGiveAble] = useState(false);
  const [UseWith, setUseWith] = useState(false);
  const [ItemDependency, setItemDependency] = useState(-1);

  const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem',
                              'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 
                              'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
                              'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1}
  const [CombineItem, setCombineItem] = useState(defaultCombineItem);
  
  const defaultThought = {
    '_id': 1,
    'Thought': 'Descriptive Thought',
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': 2,
        'Option': 'First link',
        'NextNode': {
          '_id': 3,
          'Thought': 'First node',
          'x': 80,
          'y': 100,
          'Links': [
            {
              'Id': 4,
              'Option': 'second frist link',
              'NextNode': {
                '_id': 5,
                'Thought': 'First node',
                'x': 120,
                'y': 140,
                'Links': [],
                },
              },
              {
                'Id': 6,
                'Option': 'second first link',
                'NextNode': {
                  '_id': 7,
                  'Thought': 'First node',
                  'x': 120,
                  'y': 100,
                  'Links': [],
                  },
                },
                {
                  'Id': 8,
                  'Option': 'second first link',
                  'NextNode': {
                    '_id': 9,
                    'Thought': 'First node',
                    'x': 120,
                    'y': 60,
                    'Links': [],
                    },
                  },
              ],
  },
  }]}
  const [Thought, setThought] = useState(defaultThought);
  let thoughtConnections = [];
  let exportedThoughts = {};
  const [allItems, setAllItems] = useState([]);

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
      if(e.target.value === 'conscious.DataHolderCombineItem') {
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
    // else if(e.target.name === 'Thought') {
    //   setThought(e.target.value);
    // }
    else {
        console.log('No matching variable to fieldname')
    }
  };

  const onChangeCombineItem = e => {
    let { name, value } = e.target;
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

  const getGraphConnections = connections => {
    thoughtConnections = connections;
  }

  function retrieveThoughtDataFromGraph() {
    const svg = d3.select('svg');
    let tempConnections = [...thoughtConnections];

    // // get all nodes of max-depth
    // let maxDepth = 0;
    // tempConnections.forEach(elem => {
    //   if(elem.depth > maxDepth) {
    //     maxDepth = elem.depth;
    //   }
    // })

    // // get max depth connections
    // let maxDepthConnections = [];
    // let connectionsToDelete = [];
    // tempConnections.forEach((elem, index) => {
    //   if(elem.depth === maxDepth) {
    //     maxDepthConnections.push(elem);
    //     connectionsToDelete.push(index);
    //   }
    // })

    // // remove connections already stored
    // connectionsToDelete.sort((a, b) => { return a-b; });
    // for(var i = connectionsToDelete.length-1; i >= 0; i--){
    //   tempConnections.splice(connectionsToDelete[i], 1);
    // }

    // // start recursion
    // result = addNodeData(tempConnections, nodeId);

    /////////

    const rootConnection = thoughtConnections[0];
    const rootNodeId = rootConnection.parentNode;
    let root = svg.select('#n'+rootNodeId).data()[0];
    root['Links'] = addLinksToThoughtData(svg, tempConnections, rootNodeId);
    exportedThoughts = root;
    console.log(root);
    /////////

    // const nextNodeId = rootConnection.childNode;
    // const linkId = rootConnection.link;
    // const rootNode = svg.select('#n'+rootNodeId);
    // const nextNode = svg.select('#n'+nextNodeId);
    // const link = svg.select('#e'+linkId);
    // exportedThoughts = rootNode.data()[0];
    // console.log(rootNode.data()[0]);
    // console.log(thoughtConnections);
  }

  function addLinksToThoughtData(svg, connections, parentNodeId) {
    let links = [];

    // get connections TODO: and remove from array
    let tmp = [];
    let connectionsToDelete = [];
    connections.forEach((elem, index) => {
      if(elem.parentNode === parentNodeId) {
        tmp.push(elem);
        connectionsToDelete.push(index);
      }
    })
    // remove connections retrieved
    connectionsToDelete.sort((a, b) => { return a-b; });
    for(var i = connectionsToDelete.length-1; i >= 0; i--){
      connections.splice(connectionsToDelete[i], 1);
    }

    // if links are present add link and childNode (where for childNode we again call the addLinks... function)
    if(tmp.length > 0) {
      tmp.forEach(connection => {
        const linkId = connection.link;
        const nextNodeId = connection.childNode;
        let linkData = svg.select('#e'+linkId).data()[0];
        let nextNodeData = svg.select('#n'+nextNodeId).data()[0];
        nextNodeData['Links'] = addLinksToThoughtData(svg, connections, nextNodeId);
        linkData['NextNode'] = nextNodeData;
        links.push(linkData);
      })
    }
    return links;
  }

  const onSubmit = e => {
    e.preventDefault();
    // generate a random number between 1 and 10000 as Id of the Item
    // Warning: Unique ID generation not ensured for now
    const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    let data = {
      Id: Id,
      Name: Name,
      texturePath: texturePath,
      ItemType: ItemType,
      Rotation: Rotation,
      PositionX: PositionX,
      PositionY: PositionY,
      ExamineText: ExamineText,
      IsInInventory: IsInInventory,
      UseAble: UseAble,
      PickUpAble: PickUpAble,
      CombineAble: CombineAble,
      GiveAble: GiveAble,
      UseWith: UseWith,
      ItemDependency: ItemDependency,
      // Thought: Thought
    };
    if(ItemType === 'conscious.DataHolderCombineItem') {
      const IdCombine = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
      data = {...data, CombineItem: {...CombineItem, Id: IdCombine}};
    }

    axios
      .post('http://localhost:8082/api/items/' + room_id, data)
      .then(res => {
        setName('');
        setTexturePath('');
        setItemType('conscious.DataHolderItem');
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
    if(item['ItemType'] !== 'conscious.DataHolderThing') {
      val = <option key={idx} value={item['Id']}>{item['Name']}</option>;
    }
    return val;
  });

  // Decide what extended fields should be added
  let extendedInputs = (<></>)
  if(ItemType !== 'conscious.DataHolderThing') {
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

      <a className="btn btn-primary" data-toggle="collapse" href="#itemThoughtInputs" 
           role="button" aria-expanded="false" aria-controls="collapseExample">
          Thought
      </a>
      <div className="collapse mt-2" id="itemThoughtInputs">
        <ThoughtGraph data={Thought} getConnections={getGraphConnections} />
      </div>
    </>
    )
  }

  let combineItemInputs = (<></>);
  if(ItemType === 'conscious.DataHolderCombineItem') {
    combineItemInputs = (
      <>
        <a className="btn btn-primary" data-toggle="collapse" href="#combineInputs" 
           role="button" aria-expanded="false" aria-controls="collapseExample">
          Combine Item
        </a>
        <div className="collapse mt-2" id="combineInputs">
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
                          onChange={onChangeCombineItem} defaultValue="conscious.DataHolderItem"
                          aria-label="Select item type">
                    <option value="conscious.DataHolderThing">Thing</option>
                    <option value="conscious.DataHolderItem">Item</option>
                    <option value="conscious.DataHolderDoor">Door</option>
                    <option value="conscious.DataHolderKey">Key</option>
                    {/* <option value="conscious.DataHolderCombineItem">CombineItem</option> */}
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
                        <option value="conscious.DataHolderThing">Thing</option>
                        <option value="conscious.DataHolderItem">Item</option>
                        <option value="conscious.DataHolderDoor">Door</option>
                        <option value="conscious.DataHolderKey">Key</option>
                        <option value="conscious.DataHolderCombineItem">CombineItem</option>
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

              { extendedInputs }

              {/* Add combine Item fields */}
              { combineItemInputs }

              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
            <button onClick={retrieveThoughtDataFromGraph}>Export!</button>
      </div>
    </div>
  );
}

export default CreateItem;