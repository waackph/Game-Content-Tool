
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
                placeholder='Character Dialog Line'
                className='form-control'
                name='_dialogLine'
                id='_dialogLine'
                value={data._dialogLine}
                onChange={onChange}
              />
            </div>
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