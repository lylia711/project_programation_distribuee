import React from 'react';
import './SavedRecord.css'

function Button({onAdd}) {
  return <button className='btn' onClick={() => onAdd(true)}>Record</button>;
}

export default Button;
