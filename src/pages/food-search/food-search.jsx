import React, { Component } from 'react';
// style
import './food-search.css';
// photo
import hamburgerIcon from '../../pic/hamburger-icon.svg';
// files
import RecipesBox from './recipes-box/recipes-box.jsx';
import Viewport from './viewport/viewport';
import RecipeTag from './recipe-tag/recipe-tag';

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

class FoodSearch extends Component {
    timeout = null; // אני לא מבין למה בעצם ? להבין
    constructor(props) {
        super(); 
        this.state = {
            query: '',
            results: null,
            selection: []
        }
    }
    // hi this is my chenge for this pull requst we cen feel free to delate me (the message)
    onSearchFetchResults = (event) => {
        const query = event.target.value;
        const datatype = "Survey%20(FNDDS)";
        this.setState({query});
        if (!query) {
            this.setState({
                query: "",
                
            });
        } else {
            fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${FDC_API_KEY}&query=${encodeURIComponent(query)}&dataType=${datatype}&pageSize=10`)
                .then(resp => resp.json())
                .then(results => {const fdcIds = results.foods.map(food => food.fdcId).join(',');
                    return fetch(`https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcIds}&api_key=${FDC_API_KEY}`);})
                        .then(resp => resp.json())
                        .then(results => {
                            const categoryMap = new Map();
                            if (Array.isArray(results)) {
                                for (const food of results) {
                                    const category = food.wweiaFoodCategory.wweiaFoodCategoryDescription || 'Other';
                                    let foods = categoryMap.get(category);                          
                                    if (!foods) {
                                        foods = new Map();
                                        categoryMap.set(category, foods);
                                    }
                                    foods.set(food.description, food);
                                }
                                this.setState({results: categoryMap});
                            } else {
                                this.setState({results: new Map()});
                            }
                        });
        }   
    }

    select = (food) => {
        const selection = this.state.selection;
        selection.splice(0, 0, food);
        this.setState({
          selection,
          results: null, 
          query: ''
        }); 
        this.dbSelection(food.fdcId);
    }

    dbSelection = (food) => {
        fetch('/api/foodslist/id', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
             
            body: JSON.stringify({ foodChosen: food })
        });
    }


    render() {
        return (
            <div className="food-search">
                    <section className="user-nav"> 
                    {/* אני מנסה להבין כיצד עושים אקורדיון */}
                          {/* <button className="back-main-page" id='back-btn-main-page'>BACK TO MAIN PAGE</button> */}
                          <div className="title" id='title'>welcome Ron Levi</div>
                          {/* <button className="logout" id='log-out'>log out</button> */}
                          <img className="menu-icon" alt='' src={hamburgerIcon} />
                    </section>
                    <section className='bar-steps'>
                        <div className="bar-steps-title" id="bar-steps">step 1: search and chose foods items</div>
                    </section>
        
                    <section className="food-search-bar">
                        {/* ברגע שכותבים אז הID משתנה ויש לנו ID there-is-result */}
                        <div className="input-container" id={this.state.results && ("has-text")}>
                            <input 
                            type="text" 
                            // value={this.state.query} 
                            onChange={this.onSearchFetchResults}
                            name="items" 
                            id="items" 
                            placeholder="search foods items"/>
                            </div>
                            {this.state.results && (
                                <div className="result-list">
                            {Array.from(this.state.results.entries()).map(entry => {
                                const category = entry[0];
                                const foods = entry[1]; 
                                return (
                                <div key={category} className="result">
                                    <div className="category">{category}</div>
                                      {Array.from(foods.values()).map(food => (
                                    <div onClick={() => this.select(food)} key={food.fdcId} className="description">{food.description}</div>
                                    ))}
                                </div>
                                )
                            })}
                             {!this.state.results.size && (<div>לא נמצאו תוצאות</div>)}
                            </div>
                        )}
                    </section>
                        <div class="buttons clickable font">
                            <button class="button add-new-recipe">ADD NEW RECIPE</button>
                            <button class="button go-to-amounts">GO TO AMOUNTS</button>
                        </div>
                    <Viewport>
                        <RecipeTag/>
                        <RecipesBox className="main"/>
                    </Viewport>
            </div>
        )
    }
}


export default FoodSearch;