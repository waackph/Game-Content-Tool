import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ShowCharacter(props) {
  const [character, setCharacter] = useState({});
  let { room_id, character_id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
      axios
        .get('http://localhost:8082/api/characters/' + room_id + '/' + character_id)
        .then(res => {
          setCharacter(res.data);
        })
        .catch(err => { 
          console.log('Error from ShowCharacterDetails'); 
      });
  }, [room_id, character_id])

  const onDeleteClick = (id) => {
    axios
      .delete('http://localhost:8082/api/characters/' + id)
      .then(res => {
        navigate('/item-list/' + room_id);
      })
      .catch(err => {
        console.log('Error from ShowCharacter_deleteClick', err);
      });
  }

  let CharacterShow = (
    <>
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
                <td>Id</td>
                <td>{ character.Id }</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{ character.Name }</td>
            </tr>
            <tr>
                <td>Texture Path</td>
                <td>{ character.texturePath }</td>
            </tr>
            <tr>
                <td>Character Type</td>
                <td>{ character.characterType }</td>
            </tr>
            <tr>
                <td>Rotation</td>
                <td>{ character.Rotation }</td>
            </tr>
            <tr>
                <td>PositionX</td>
                <td>{ character.PositionX }</td>
            </tr>
            <tr>
                <td>PositionY</td>
                <td>{ character.PositionY }</td>
            </tr>
            <tr>
                <td>DrawOrder</td>
                <td>{ character.DrawOrder }</td>
            </tr>
            <tr>
                <td>Pronoun</td>
                <td>{ character.Pronoun }</td>
            </tr>
            <tr>
                <td>CatchPhrase</td>
                <td>{ character.CatchPhrase }</td>
            </tr>
            <tr>
                <td>GiveAble</td>
                <td>{ String(character.GiveAble) }</td>
            </tr>
            <tr>
                <td>MoodChange</td>
                <td>{ character.MoodChange }</td>
            </tr>
            <tr>
                <td>DialogUnlocked</td>
                <td>{ String(character.DialogUnlocked) }</td>
            </tr>
            <tr>
                <td>ItemDependency</td>
                <td>{ character.ItemDependency }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <div className='ShowCharacter'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br />
            <br />
            <Link to={`/item-list/${room_id}`} className='btn btn-outline-warning float-left'>
                Back to Room
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Character Record</h1>
            <p className='lead text-center'>
                View Character Info
            </p>
            <hr />
            <br />
          </div>
        </div>

        <div>
            { CharacterShow }
        </div>
          
        <div className='row'>
          <div className='col-md-6'>
              <button type='button' 
                      className='btn btn-outline-danger btn-lg btn-block' 
                      onClick={ () => onDeleteClick(character._id) }>
                  Delete character
              </button>
              <br />
          </div>
          <div className='col-md-6'>
              <Link to={`/edit-character/${room_id}/${character._id}`} className='btn btn-outline-info btn-lg btn-block'>
                  Edit character
              </Link>
              <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCharacter;