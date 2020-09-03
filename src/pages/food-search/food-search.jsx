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
            fetchResults: null
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
                                console.log(results);
                            }
                        });
        }
        
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
                        <div className="input-container" id={this.state.query}>
                            <input 
                            type="text" 
                            // value={this.state.query} 
                            onChange={this.onSearchFetchResults}
                            name="items" 
                            id="items" 
                            placeholder="search foods items"/>
                        </div>
                            {this.state.fetchResults && (
                                <div className="result-list" key>
                                    <div className="result">
                                        <div className="category">
                                            <div className="description">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}  
                    </section>
            </div>
        )
    }
}


export default FoodSearch;