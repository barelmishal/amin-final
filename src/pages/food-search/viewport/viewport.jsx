import React from 'react';
import './viewport.css';

class Viewport extends React.Component {
  constructor() {
      super();
      this.state = {
        width:  800,
        height: 182
      }
    }
  
    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
      if(window.innerWidth < 500) {
        this.setState({ width: 450, height: 102 });
      } else {
        let update_width  = window.innerWidth-100;
        let update_height = Math.round(update_width/4.4);
        this.setState({ width: update_width, height: update_height });
      }
    }
  
    /**
     * Add event listener
     */
    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
      console.log()
    }
  
    /**
     * Remove event listener
     */
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
      return (
        <div width={this.state.width} height={this.state.height} className='viewport'>
          {this.props.children}
        </div>
        );
      };
    }

export default Viewport;