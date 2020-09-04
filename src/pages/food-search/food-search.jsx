import React, { Component } from 'react';
import './food-search.css';
// photo
import hamburgerIcon from '../../pic/hamburger-icon.svg';

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

class FoodSearch extends Component {
    timeout = null; // אני לא מבין למה בעצם ? להבין
    constructor() {
        super(); 
        this.state = {
            query: '',
            results: null,
            selection: []
        }
    }
    
    onSearchFetchResults = (event) => {
        const query = event.target.value;
        this.setState({query});
        if (!query) {
            this.setState({
                query: ""
            });
        } else {
            fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${FDC_API_KEY}`)
                .then(resp => resp.json())
                .then(results => {const fdcIds = results.foods.map(food => food.fdcId).join(',');
                    return fetch(`https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcIds}&api_key=${FDC_API_KEY}`);})
                        .then(resp => resp.json())
                        .then(results => {
                            const categoryMap = new Map();
                            if (Array.isArray(results)) {
                                for (const food of results) {
                                    console.log(food);
                                    const category = food.brandedFoodCategory || 'Other';
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
                                console.log(results)
                            }
                        });
        }
        
    }
    select(food) {
        const selection = this.state.selection;
        selection.splice(0, 0, food);
        this.setState({
          selection, 
          results: null, 
          query: ''
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
                    <main className="main">
                                    <div className="selection">
                            {this.state.selection.map(food => (
                            <div className="result">
                                <div className="category">{food.brandedFoodCategory || 'Other'}</div>
                                <div className="description">{food.description}</div>
                            </div>
                            ))}
                        </div>
                        {!this.state.selection.length && (
                            <div className="instructions">
                            <div className="primary">search food items to add in the list</div>
                            <div className="secondary">after search it appere items on the screen that you cen chose from</div>
                            </div>
                        )}
                    </main>
            </div>
        )
    }
}


export default FoodSearch;