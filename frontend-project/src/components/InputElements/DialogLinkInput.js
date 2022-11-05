import Select from 'react-select';
import CheckboxField from "./CheckboxField";

const moodOptions = [
  { label: "None", value: 0 },
  { label: "Depressed", value: 1 },
  { label: "Regular", value: 2 },
  { label: "Manic", value: 3 },
];

function LinkInput({data, onChange, onSelectChange, assignDataToLink, deleteLink}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
      // set validMoods data into right format for multiselect
      let validMoods = moodOptions.filter(elem => { return data.MoodDependence === elem.value });

      return (
      <div className='form-group p-4 graphInput' id='linkInput'>
        <div className="row">
          <div className="col-md-4 m-auto">
            <input 
              type="text" 
              id='_dialogLine'
              placeholder='Dialog Line Option'
              className='form-control'
              name='_dialogLine'
              value={data._dialogLine}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4 m-auto">
            <CheckboxField
              checkLabel='is final dialog option'
              name='isFinalDialogOption'
              value={data.isFinalDialogOption}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4 m-auto">
            <div className='SelectContainer'>
              {/* <pre>{JSON.stringify(validMoods)}</pre>  */}
              <Select
                name='MoodDependence'
                placeholder='Mood Dependence'
                // labelledBy='Select valid moods for option'
                value={validMoods}
                options={moodOptions}
                onChange={onSelectChange}
                isMulti={false}
              />
            </div>
          </div>
          
        </div>

          <div className="graphElemId" readOnly>{data.Id}</div>
          <button onClick={assignDataToLink}>Submit</button>
          <button onClick={deleteLink} value={data.Id}>Delete</button>
      </div>
      );
    }
  }
  
export default LinkInput;