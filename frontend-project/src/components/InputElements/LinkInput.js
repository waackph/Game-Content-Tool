import CheckboxField from "./CheckboxField";

function LinkInput({data, onChange, assignDataToLink, deleteLink}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
        return (
        <div className='form-group p-4 graphInput' id='linkInput'>
          <div className="row">
            <div className="col-md-4 m-auto">
              <input 
                type="text" 
                id='Option'
                placeholder='Player Option'
                className='form-control'
                name='Option'
                value={data.Option}
                onChange={onChange}
              />
            </div>
            <div className="col-md-4 m-auto">
              <CheckboxField
                checkLabel='Is locked'
                name='IsLocked'
                value={data.IsLocked}
                onChange={onChange}
              />
            </div>
            {/* TODO: Create a multi-select input field for valid moods
              <div className="col-md-4 m-auto">
              <div className="selectWrapper">
                <select className="form-select" name='validMoods' 
                      onChange={onChange} value={data.validMoods}
                      aria-label="Select item type">
                  <option value="-1">No dependency</option>
                  { selectItemOptions }
                </select>
              </div>
            </div> */}
          </div>

            <div className="graphElemId" readOnly>{data.Id}</div>
            <button onClick={assignDataToLink}>Submit</button>
            <button onClick={deleteLink} value={data.Id}>Delete</button>
        </div>
        );
    }
  }
  
export default LinkInput;