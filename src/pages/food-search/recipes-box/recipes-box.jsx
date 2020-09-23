import React from 'react';
import './recipes-box.css';


class RecipesBox extends React.Component {
    
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
            <div width={this.state.width} height={this.state.height} className="container">

                    {/* <div className="box-skeleton">hihi</div>
                    <div className="selection">
                        {props.state.selection.map(food => (
                        <div className="result">
                            <div className="category">{food.brandedFoodCategory || 'Other'}</div>
                            <div className="description">{food.description}</div>
                        </div>
                        ))}
                    </div>
                        {!props.state.selection.length && (
                            <div className="instructions">
                                <div className="primary">search food items to add in the list</div>
                                <div className="secondary">dfldjafter search it appere items on the screen that you cen chose from</div>
                            </div>
                    )} */}
            </div>
        );   
    }
}

export default RecipesBox;