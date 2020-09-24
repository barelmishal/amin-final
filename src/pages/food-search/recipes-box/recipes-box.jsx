import React from 'react';
import './recipes-box.css';


class RecipesBox extends React.Component {
    render() {
        return (
            <div className="container">
                <div class="ingridentes">
                    <div class="item1">melon</div>
                    <div class="item2">melon 2</div>
                    <div class="item3">melon 3</div>
                </div>
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