import React, { Component } from 'react';
import './food-search.css';
// photo
import hamburgerIcon from '../../pic/hamburger-icon.svg';

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

class FoodSearch extends Component {
    constructor() {
        super(); 
        this.state = {
            query: ''
        }
    }
    
    // componentDidMount(event) {
    //    
    //     this.setState({query});
    //     this.timeout = setTimeout = 
    //     fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${FDC_API_KEY}`)
    //     .then(response => console.log(response));
    // }
    onSearch = (event) => {
        const query = event.target.value;
        this.setState({query});
        if (!query) {
            this.setState({results: null});
        } else {

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
                            onChange={this.onSearch}
                            name="items" 
                            id="items" 
                            placeholder="search foods items"/>
                        </div>
                            {this.state.query && (
                                <div className="result-list">
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