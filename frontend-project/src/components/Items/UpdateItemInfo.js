import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import CheckboxField from '../InputElements/CheckboxField';
import axios from "axios";
import '../../App.css';

function UpdateItemInfo(props) {

    // TODO: Add object type input fields (CombineItem, Thought)
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

    const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem',
    'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 
    'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
    'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1}
    const [CombineItem, setCombineItem] = useState(defaultCombineItem);
    // const [Thought, setThought] = useState({});
    const [allItems, setAllItems] = useState([]);

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

    const onSubmit = e => {
        e.preventDefault();

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
          if(!CombineItem.hasOwnProperty('Id')) {
            const IdCombine = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
            data = {...data, CombineItem: {...CombineItem, Id: IdCombine}};
          }
          else {
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

          {/* 
          <div className='form-group'>
              <input
              type='text'
              placeholder='Thought'
              name='Thought'
              className='form-control'
              value={Thought}
              onChange={onChange}
              />
          </div>
          */}
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
