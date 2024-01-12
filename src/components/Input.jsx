import React, {useState} from 'react'

const Input = ({label, value}) => {
    const [val, setVal] = useState("")
  return (
    <>
    <label htmlFor={value}>{label}</label>
    <input name={value} value={val}/>
    </>
  )
}

export default Input