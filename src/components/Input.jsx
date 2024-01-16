import React, {useState} from 'react'

const Input = ({label, info, side, handleChange}) => {
   
  return (
    <>
        <label htmlFor={info}>{label}</label>
        <input name={info} value={value} type="text" onChange={(side) => handleChange(side)}/>
    </>
  )
}

export default Input