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
                name='Thought'
                id='ThoughtText'
                value={data.Thought}
                onChange={onChange}
              />
            </div>
            {/* IsRoot and ThingId are going to be set automatically by context */}
          </div>

          <div className="graphElemId" readOnly>Node ID: {data._id}</div>
          <button onClick={assignDataToNode}>Submit</button>
          <button onClick={deleteNode} value={data._id}>Delete</button>
        </div>
        );
    }
  }
  
export default NodeInput;