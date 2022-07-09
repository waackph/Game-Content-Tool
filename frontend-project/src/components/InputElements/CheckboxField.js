function CheckboxField({checkLabel, value, name, onChange}) {
    return (
      <div className='form-group'>
        <input 
          type="checkbox" 
          id={name}
          name={name}
          checked={value}
          onChange={onChange} />

        <label htmlFor={name}>{checkLabel}</label>
      </div>
    );
  }
  
  export default CheckboxField;