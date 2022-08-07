import CheckboxField from "./CheckboxField";
// import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

const moodOptions = [
  { label: "None", value: 0 },
  { label: "Depressed", value: 1 },
  { label: "Regular", value: 2 },
  { label: "Manic", value: 3 },
];

const verbOptions = [
  { label: "None", value: 0 },
  { label: "WalkTo", value: 1 },
  { label: "Examine", value: 2 },
  { label: "PickUp", value: 3 },
  { label: "Use", value: 4 },
  { label: "UseWith", value: 5 },
  { label: "Combine", value: 6 },
  { label: "Give", value: 7 },
  { label: "TalkTo", value: 8 },
  { label: "WakeUp", value: 9 },
];


// TODO: Add fields linkType, Verb, MoodChange, UnlockId, Animation
function LinkInput({data, onChange, onSelectChange, assignDataToLink, deleteLink}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
      // set validMoods data into right format for multiselect
      let validMoods = moodOptions.filter(elem => { return data._validMoods.includes(elem.value) });
      let finalLinkInputData = (<></>);
      if(data.IsFinal) {
        let moodChange = moodOptions.filter(elem => { return data.MoodChange === elem.value });
        let verb = verbOptions.filter(elem => { return data.Verb === elem.value });
        finalLinkInputData = (
          <>
            <div className="col-md-4 m-auto">
              <div className='SelectContainer'>
                <Select
                  name='Verb'
                  placeholder='Verb'
                  value={verb}
                  options={verbOptions}
                  onChange={onSelectChange}
                  isMulti={false}
                />
              </div>
            </div>

            <div className="col-md-4 m-auto">
              <div className='SelectContainer'>
                <Select
                  name='MoodChange'
                  placeholder='Mood Change'
                  value={moodChange}
                  options={moodOptions}
                  onChange={onSelectChange}
                  isMulti={false}
                />
              </div>
            </div>
          </>
        );
      }

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
            <div className='SelectContainer'>
              {/* <pre>{JSON.stringify(validMoods)}</pre>  */}
              <Select
                name='_validMoods'
                placeholder='Valid Moods'
                // labelledBy='Select valid moods for option'
                value={validMoods}
                options={moodOptions}
                onChange={onSelectChange}
                isMulti={true}
              />
            </div>
          </div>
          
          <div className="col-md-4 m-auto">
            <CheckboxField
              checkLabel='Is locked'
              name='IsLocked'
              value={data.IsLocked}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4 m-auto">
            <CheckboxField
              checkLabel='Is Final Link'
              name='IsFinal'
              value={data.IsFinal}
              onChange={onChange}
            />
          </div>

          { finalLinkInputData }
          
        </div>

          <div className="graphElemId" readOnly>{data.Id}</div>
          <button onClick={assignDataToLink}>Submit</button>
          <button onClick={deleteLink} value={data.Id}>Delete</button>
      </div>
      );
    }
  }
  
export default LinkInput;