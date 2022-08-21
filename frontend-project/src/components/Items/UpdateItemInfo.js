import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import CheckboxField from '../InputElements/CheckboxField';
import axios from "axios";
import * as d3 from "d3";
import '../../App.css';
import ThoughtGraph from '../InputElements/ThoughtGraph';
import { addLinksToThoughtData, addItemIdToThoughtNodes } from '../helpers/ItemThoughtHelpers';

function UpdateItemInfo(props) {

    // TODO: Add object type input field CombineItem.Thought
    const [Id, setId] = useState(0);
    const [Name, setName] = useState('');
    const [texturePath, setTexturePath] = useState('');
    const [ItemType, setItemType] = useState('');
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

    const defaultCombineThought = {
      '_id': 111,
      'Thought': 'Descriptive Thought',
      'IsRoot': true,
      'x': 40,
      'y': 100,
      'Links': [
        {
          'Id': 112,
          'Option': 'First link',
          '_validMoods': [0],
          'IsLocked': false,
          'NextNode': {
            '_id': 113,
            'Thought': 'First node',
            'IsRoot': false,
            'x': 80,
            'y': 100,
            'Links': [],
          },
        }
      ]}
    const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem',
    'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 
    'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
    'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1,
    'Thought': defaultCombineThought}
    const [CombineItem, setCombineItem] = useState(defaultCombineItem);
    // const [Thought, setThought] = useState({});
    const [allItems, setAllItems] = useState([]);

    let thoughtConnections = [];
    let exportedThoughts = {};  

    let combineThoughtConnections = [];
    let combineExportedThoughts = {};

    let { room_id, item_id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
      // get item info
        axios
          .get('http://localhost:8082/api/items/' + room_id + '/' + item_id)  //this.props.match.params.room_id)
          .then(res => {
            setId(res.data.Id);
            setName(res.data.Name);
            setTexturePath(res.data.texturePath);
            setItemType(res.data.ItemType);
            setRotation(res.data.Rotation);
            setPositionX(res.data.PositionX);
            setPositionY(res.data.PositionY);
            setExamineText(res.data.ExamineText);
            setIsInInventory(res.data.IsInInventory);
            setUseAble(res.data.UseAble);
            setPickUpAble(res.data.PickUpAble);
            setCombineAble(res.data.CombineAble);
            setGiveAble(res.data.GiveAble);
            setUseWith(res.data.UseWith);
            setItemDependency(res.data.ItemDependency);
            setCombineItem(res.data.CombineItem);
            setThought(res.data.Thought);
          })
          .catch(err => { 
            console.log('Error from UpdateItemInfo'); 
        });
        // get all items for itemDependency select input
        axios
          .get('http://localhost:8082/api/items')
          .then(res => {
            setAllItems(res.data);
          })
          .catch(err => { 
            console.log('Error from getAllItems'); 
        });
    }, [room_id, item_id])


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
          //   setTexturePath(e.target.value);
          // }
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

    // Functions to manage Thought Graph
    const getGraphConnections = connections => {
      thoughtConnections = connections;
    }
  
    const getCombineGraphConnections = connections => {
      combineThoughtConnections = connections;
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

    // Update the combineItem thought field from the graph to rerender the whole view correctly, if something else is changed
    function retrieveCombineThoughtDataFromGraph(e) {
      if(e) {
        e.preventDefault();
      }
      const svg = d3.select('#CombineItemThoughtGraphInput');
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
        // add item ID to all nodes of the Thought as field "ThingId" (we do this for potentially new nodes)
        setThought(addItemIdToThoughtNodes(Thought, Id));
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
            Thought: Thought
        };
        if(ItemType === 'conscious.DataHolderCombineItem') {
          if(!CombineItem.hasOwnProperty('Id')) {
            const IdCombine = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
            CombineItem.Thought = addItemIdToThoughtNodes(CombineItem.Thought, IdCombine);
            data = {...data, CombineItem: {...CombineItem, Id: IdCombine}};
          }
          else {
            CombineItem.Thought = addItemIdToThoughtNodes(CombineItem.Thought, CombineItem.Id);
            data = {...data, CombineItem: CombineItem};
          }
        }
    
        axios
          .put('http://localhost:8082/api/items/' + room_id + '/' + item_id, data)
          .then(res => {
            // setName('');
            // setTexturePath('');
            // setItemType('');
            // setRotation(0);
            // setPositionX(0);
            // setPositionY(0);
            // setExamineText('');
            // setIsInInventory(false);
            // setUseAble(false);
            // setPickUpAble(false);
            // setCombineAble(false);
            // setGiveAble(false);
            // setUseWith(false);
            // // setItemDependency('');
            // // setCombineItem('');
            // // setThought('');
            navigate('/show-item/' + room_id + '/' + item_id);
          })
          .catch(err => {
              console.log('Error in UpdateItemInfo');
              console.log(err);
          });
    };

    let selectItemOptions = allItems.map((item, idx) => {
      let val;
      if(item['ItemType'] !== 'conscious.DataHolderThing' && item['Id'] !== Id) {
        val = <option key={idx} value={item['Id']}>{item['Name']}: {item['ExamineText']}</option>;
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
        <a className="btn btn-outline-primary btn-lg btn-block mt-2 mb-2" data-toggle="collapse" href="#itemThoughtInputs" 
          role="button" aria-expanded="false" aria-controls="collapseExample">
            Thought
        </a>
        <div className="collapse mt-2 mb-2" id="itemThoughtInputs">
          <ThoughtGraph svgId={'ThoughtGraphInput'} data={Thought} getConnections={getGraphConnections} exportGraphToParent={retrieveThoughtDataFromGraph} />
          <button onClick={retrieveThoughtDataFromGraph} className="m-2">Export!</button>
        </div>
        <br></br>
      </>
      )
    }

    let combineItemInputs = (<></>);
    if(ItemType === 'conscious.DataHolderCombineItem') {
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
                            onChange={onChangeCombineItem} value={CombineItem.ItemType}
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
        <div className='UpdateItemInfo'>
          <div className="container">

            <div className="row">
                <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                    Show Item List
                </Link>
                </div>
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Edit Item</h1>
                <p className="lead text-center">
                    Update Item's Info
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

                  <div className="col-md-6 m-auto">
                    <div className='form-group'>
                      {/* <input
                      type='text'
                      placeholder='Thing Type'
                      name='ItemType'
                      className='form-control'
                      value={ItemType}
                      onChange={onChange}
                      /> */}
                      <div className="selectWrapper">
                        <select className="form-select" name='ItemType' 
                                value={ItemType} onChange={onChange} 
                                aria-label="Select item type">
                          <option value="conscious.DataHolderThing">Thing</option>
                          <option value="conscious.DataHolderItem">Item</option>
                          <option value="conscious.DataHolderCombineItem">CombineItem</option>
                          <option value="conscious.DataHolderDoor">Door</option>
                          <option value="conscious.DataHolderKey">Key</option>
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

                <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Item</button>
            </form>
          </div>
        </div>
    );
}

export default UpdateItemInfo;
