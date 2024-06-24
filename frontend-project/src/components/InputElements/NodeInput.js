import CheckboxField from "./CheckboxField";

// ***
// The Node Input component is shown when clicked on a Node in the Thought Graph. 
// It is used to store data in a Node.
// ***

function NodeInput({data, onChange, assignDataToNode, deleteNode}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
        return (
        <div className='form-group p-4 graphInput' id='nodeInput'>
          <div className="row">
            <div className="col-md-6 m-auto">
              <input 
                type='text'
                placeholder='Character Thought'
                className='form-control'
                name='Thought'
                id='Thought'
                value={data.Thought}
                onChange={onChange}
              />
            </div>
            <div className="col-md-6 m-auto">
              <input 
                type='number'
                placeholder='Linkage Id'
                className='form-control'
                name='LinkageId'
                id='LinkageId'
                value={data.Thought}
                onChange={onChange}
              />
            </div>
            { data.IsRoot ? 
            <>
              <div className="col-md-6 m-auto">
                <input 
                  type='text'
                  placeholder='Sound Path'
                  className='form-control'
                  name='SoundPath'
                  id='SoundPath'
                  value={data.SoundPath}
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6 m-auto">
                <CheckboxField
                  checkLabel='Sound Repeated'
                  name='RepeatedSound'
                  value={data.RepeatedSound}
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6 m-auto">
                <input 
                  type='text'
                  placeholder='Thought Portrait'
                  className='form-control'
                  name='ThoughtPortrait'
                  id='ThoughtPortrait'
                  value={data.ThoughtPortrait}
                  onChange={onChange}
                />
              </div>
            </>
            : 
            <></>}
            {/* IsRoot and ThingId are going to be set automatically by context */}
          </div>

          <div className="graphElemId" readOnly>Node ID: {data.Id}</div>
          <button onClick={assignDataToNode}>Submit</button>
          <button onClick={deleteNode} value={data.Id}>Delete</button>
        </div>
        );
    }
  }
  
export default NodeInput;