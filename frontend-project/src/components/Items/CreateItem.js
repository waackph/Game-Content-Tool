import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CheckboxField from '../InputElements/CheckboxField';
import '../../App.css';
import axios from 'axios';

function CreateItem (props) {

  // TODO: Add object type input fields (ItemDependency, CombineItem, Thought)
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
  // const [ItemDependency, setItemDependency] = useState('');
  // const [CombineItem, setCombineItem] = useState('');
  // const [Thought, setThought] = useState('');
  
  let { room_id } = useParams();
  let navigate = useNavigate();

  const onChange = e => {
    if(e.target.name === 'Name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'texturePath') {
      setTexturePath(e.target.value);
    }
    else if(e.target.name === 'ItemType') {
      setItemType(e.target.value);
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
    // else if(e.target.name === 'ItemDependency') {
    //   setItemDependency(e.target.value);
    // }
    // else if(e.target.name === 'CombineItem') {
    //   setCombineItem(e.target.value);
    // }
    // else if(e.target.name === 'Thought') {
    //   setTexturePath(e.target.value);
    // }
    else {
        console.log('No matching variable to fieldname')
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const data = {
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
      // ItemDependency: ItemDependency,
      // CombineItem: CombineItem,
      // Thought: Thought
    };

    axios
      .post('http://localhost:8082/api/items/' + room_id, data)
      .then(res => {
        setName('');
        setTexturePath('');
        setItemType('');
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
        // setItemDependency('');
        // setCombineItem('');
        // setThought('');
        navigate(`/item-list/${room_id}`);
      })
      .catch(err => {
        console.log("Error in CreateItem!");
        console.log(err);
      })
  };

  // Decide what extended fields should be added
  let extendedInputs = (<></>)
  if(ItemType!=='thing') {
    // append different sets of components using inputs = [input1, input2]
    extendedInputs = (
      <>
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
        <CheckboxField
        checkLabel='Is in inventory'
        value={IsInInventory}
        name='IsInInventory'
        onChange={onChange} 
        />

        <CheckboxField
          checkLabel='Is useable'
          value={UseAble}
          name='UseAble'
          onChange={onChange} 
        />

        <CheckboxField
          checkLabel='Pickupable'
          value={PickUpAble}
          name='PickUpAble'
          onChange={onChange} 
        />

        <CheckboxField
          checkLabel='Combineable'
          value={CombineAble}
          name='CombineAble'
          onChange={onChange} 
        />

        <CheckboxField
          checkLabel='Giveable'
          value={GiveAble}
          name='GiveAble'
          onChange={onChange} 
        />

        <CheckboxField
          checkLabel='Use with'
          value={UseWith}
          name='UseWith'
          onChange={onChange} 
        />

        {/* 
          <div className='form-group'>
            <input
              type='text'
              placeholder='Item Dependency'
              name='ItemDependency'
              className='form-control'
              value={ItemDependency}
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='Combine Item'
              name='CombineItem'
              className='form-control'
              value={CombineItem}
              onChange={onChange}
            />
          </div>

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

            <form noValidate onSubmit={onSubmit}>
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
                  placeholder='Thing Type'
                  name='ItemType'
                  className='form-control'
                  value={ItemType}
                  onChange={onChange}
                />
              </div>

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

              { extendedInputs }

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

export default CreateItem;