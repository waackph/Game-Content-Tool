function LinkInput({data, onChange, assignDataToLink}) {
    if (Object.keys(data).length === 0) {
        return(<></>);
    }
    else {
        return (
        <div className='form-group' id='linkInput'>
            <input 
            type="text" 
            id='LinkText'
            value={data.Option}
            onChange={onChange}
            name='Link' />

            <div className="graphElemId" readOnly>{data.Id}</div>
            <button onClick={assignDataToLink}>Submit</button>
        </div>
        );
    }
  }
  
export default LinkInput;