import React from 'react';
import './action.css';

const Action = (props) => {
  return (
  <button 
  className=
    {props.className}>
    {props.btnTatile}
  </button>
  )
}

export default Action;