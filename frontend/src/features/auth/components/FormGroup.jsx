import React from 'react'

const FormGroup = ({label,placeholder,value,onChange}) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
      <input value={value} onChange={onChange} id={label} name={label} type="text" placeholder={placeholder} required/>
    </div>
  )
}

export default FormGroup