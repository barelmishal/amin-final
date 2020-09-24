import React from 'react';
import './recipes-box.css';


class RecipesBox extends React.Component {
    render() {
        return (
            <div className="container-recipe-box">
                <div class="ingridentes">
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items brightness">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
                    <div class="food-items">
                        <div className="food-category">fruit</div>
                        <div className="food-description">melon</div>
                    </div>
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