import React from "react";
import "./dynamic-text.css";

const DynamicText = (props) => {
  return (
    <div className={props.className}>
      <div className={props.classNameChild}>{props.dynamicText}</div>
    </div>
  );
};

export default DynamicText;
