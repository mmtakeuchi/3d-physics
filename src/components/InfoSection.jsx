import React, {useState} from 'react'
import Input from './Input'
import "../App.css"

const InfoSection = ({info, setInfo}) => {
     const handleChange = (e, side) => {
        console.log('input',e, side)
        if (side === "right" && e.target.name === "force") {
            setInfo({...info, [side]: {...info[side], [e.target.name]: -e.target.value}})
        } else {
            setInfo({...info, [side]: {...info[side], [e.target.name]: e.target.value}})
        }
    }

  return (
    <div className="info-container">
        <div className="info-inputs">
            <div className="leftSide">
                <h3>Left Ball</h3>
                {/* <Input label="size" info="size" side="left" handleChange={handleChange}/>
                <Input label="force" info="force" side="left" handleChange={handleChange}/> */}
                <label htmlFor="size">Size</label>
                <input name="size" value={info.left.size} min="1" max="5" type="number" onChange={(e) => handleChange(e, "left")}/>
                <label htmlFor="force">Force</label>
                <input name="force" value={info.left.force} min="1" max="10" type="text" onChange={(e) => handleChange(e,"left")}/>
            </div>
            <div className="rightSide">
                <h3>Right Ball</h3>
                <label htmlFor="size">Size</label>
                <input name="size" value={info.right.size}  min="1" max="5" type="number" onChange={(e) => handleChange(e, "right")}/>
                <label htmlFor="force">Force</label>
                <input name="force" value={info.right.force * -1}  min="1" max="10" type="text" onChange={(e) => handleChange(e,"right")}/>
            </div>
        </div>
        {/* <button type="button" onSubmit={handleSubmit}>Submit</button> */}
    </div>
  )
}

export default InfoSection