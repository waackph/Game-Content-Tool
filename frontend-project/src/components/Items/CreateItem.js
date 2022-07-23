import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CheckboxField from '../InputElements/CheckboxField';
import '../../App.css';
import axios from 'axios';

function CreateItem (props) {

  // TODO: Add object type input fields (ItemDependency, CombineItem, Thought)
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
  // const [CombineItem, setCombineItem] = useState('');
  // const [Thought, setThought] = useState('');
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
    // else if(e.target.name === 'CombineItem') {
    //   setCombineItem(e.target.value);
    // }
    // else if(e.target.name === 'Thought') {
    //   setThought(e.target.value);
    // }
    else {
        console.log('No matching variable to fieldname')
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    // generate a random number between 1 and 10000 as Id of the Item
    // Warning: Unique ID generation not ensured for now
    const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    const data = {
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
      // CombineItem: CombineItem,
      // Thought: Thought
    };

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
        // setCombineItem('');
        // setThought('');
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

        {/* 
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