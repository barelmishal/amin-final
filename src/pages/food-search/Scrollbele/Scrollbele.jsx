import React from "react";
import "./scrollable.css";

class Scrollbele extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div className="scroll">{this.props.children}</div>;
  }
}

export default Scrollbele;
