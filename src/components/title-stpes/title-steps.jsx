import React from "react";
import "./title-steps.css";

const TitleSteps = (props) => {
  return (
    <div className="steps bar-steps">
      <div className={props.className}>{props.Bartitle}</div>
    </div>
  );
};

export default TitleSteps;
