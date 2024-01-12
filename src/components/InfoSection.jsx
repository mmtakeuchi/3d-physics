import React, {useState} from 'react'
import Input from './Input'
import "../App.css"

const InfoSection = ({setLeftInfo, setRightInfo}) => {
  return (
    <div className="info-container">
        <div className="leftSide">
            <Input label="size" value="size"/>
            <Input label="force" value="force"/>
        </div>
        <div className="rightSide">
            <Input label="size" value="size"/>
            <Input label="force" value="force"/>
        </div>
    </div>
  )
}

export default InfoSection