import React from 'react';
import './recipes-box.css';


class RecipesBox extends React.Component {
    render() {
        return (
            <div className="container-recipe-box">
                <div class="ingridentes">
                    {this.props.foods.map(f => (
                        <div class="food-items">
                            <div className="food-description">{f.food_description}</div>
                        </div>
                    ))}
                </div>
            </div>
        );   
    }
}

export default RecipesBox;