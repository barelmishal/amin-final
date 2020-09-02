import React, { Component } from 'react';
import './food-search.css';
// photo
import hamburgerIcon from '../../pic/hamburger-icon.svg';


const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;



class FoodSearch extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            results: null,
            selection: ""
        }
    }

    onTextChange(event) {
        const query = event.target.value;
        this.setState({query});
    
        if (!query) {
          this.setState({results: null});
        } else {
          if (this.timeout !== null) {
            clearTimeout(this.timeout);
          }
          this.timeout = setTimeout(() => {
            fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${FDC_API_KEY}`)
            .then(resp => resp.json())
            .then(results => {
              const fdcIds = results.foods.map(food => food.fdcId).join(',');
        
              return fetch(`https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcIds}&api_key=${FDC_API_KEY}`);
            })
            .then(resp => resp.json())
            .then(results => {
              const categoryMap = new Map();
              if (Array.isArray(results)) {
                for (const food of results) {
                  const category = food.brandedFoodCategory || 'Other';
                  const foods = categoryMap.get(category);
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
            })
          }, 500);
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
                        <div className="input-container">
                            <input 
                            type="text" 
                            value={this.state.query}
                            onChange={this.onTextChange}
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
                                    {/* Display the category in gray */}
                                    <div className="category">{category}</div>
                                    {/* Display the list of foods in the category in black under the category */}
                                    {Array.from(foods.values()).map(food => (
                                    <div onClick={() => this.select(food)} key={food.fdcId} className="description">{food.description}</div>
                                    ))}
                                </div>
                                )
                            })}
                            {/* Show a _no results_ message if the search didn't return any results */}
                            {!this.state.results.size && (<div>לא נמצאו תוצאות</div>)}
                            </div>
                        )}   
                           
                           
                           
                            {/* {
                            <div className="result-list">
                                <div className="result">
                                    <div className="category">
                                        <div className="description">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            } */}
                    </section>
            </div>
        )
    }
}


export default FoodSearch;