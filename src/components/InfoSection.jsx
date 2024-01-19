import React, { useState } from 'react';
import Input from './Input';
import '../App.css';

const InfoSection = ({ info, setInfo }) => {
  const [ballValues, setBallValues] = useState({ ...info });

  const handleSubmit = (e) => {
    console.log('ball', ballValues);
    setInfo({ ...ballValues });
  };

  const handleChange = (e, side) => {
    const { name, value } = e.target;
    console.log(side, name, value);
    if (name === 'force' || name === 'height') {
      setBallValues({
        ...ballValues,
        [side]: {
          ...ballValues[side],
          [name]: parseInt(value),
        },
      });
    } else {
      setBallValues({
        ...ballValues,
        [side]: {
          ...ballValues[side],
          [name]: parseInt(value),
        },
      });
    }
  };

  return (
    <div className="info-container">
      <div className="info-inputs">
        <div className="leftSide">
          <h3>Left Ball</h3>
          {/* <Input label="size" info="size" side="left" handleChange={handleChange}/>
                <Input label="force" info="force" side="left" handleChange={handleChange}/> */}
          <label htmlFor="size">Size</label>
          <input
            name="size"
            value={ballValues.left.size}
            min="1"
            max="5"
            type="number"
            onChange={(e) => handleChange(e, 'left')}
          />
          <label htmlFor="force">Force</label>
          <input
            name="force"
            value={ballValues.left.force}
            min="1"
            max="100"
            type="number"
            onChange={(e) => handleChange(e, 'left')}
          />
          <label htmlFor="heightPos">Height</label>
          <input
            name="heightPos"
            value={ballValues.left.heightPos}
            min="1"
            max="10"
            type="number"
            onChange={(e) => handleChange(e, 'left')}
          />
        </div>
        <div className="rightSide">
          <h3>Right Ball</h3>
          <label htmlFor="size">Size</label>
          <input
            name="size"
            value={ballValues.right.size}
            min="1"
            max="5"
            type="number"
            onChange={(e) => handleChange(e, 'right')}
          />
          <label htmlFor="force">Force</label>
          <input
            name="force"
            value={ballValues.right.force}
            min="1"
            max="100"
            type="number"
            onChange={(e) => handleChange(e, 'right')}
          />
          <label htmlFor="heightPos">Height</label>
          <input
            name="heightPos"
            value={ballValues.right.heightPos}
            min="1"
            max="10"
            type="number"
            onChange={(e) => handleChange(e, 'right')}
          />
        </div>
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default InfoSection;
