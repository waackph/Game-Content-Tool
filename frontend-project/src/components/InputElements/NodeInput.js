function NodeInput({data, onChange, assignDataToNode}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
        return (
        <div className='form-group' id='nodeInput'>
            <input 
            type="text" 
            id='ThoughtText'
            value={data.Thought}
            onChange={onChange}
            name='Thought' />

            <div className="graphElemId" readOnly>{data._id}</div>
            <button onClick={assignDataToNode}>Submit</button>
        </div>
        );
    }
  }
  
export default NodeInput;