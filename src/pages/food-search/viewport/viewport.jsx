import React from "react";
import "./viewport.css";

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="viewport">{this.props.children}</div>;
  }
}

export default Viewport;
