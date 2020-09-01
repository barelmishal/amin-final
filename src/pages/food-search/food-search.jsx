import React from 'react';
import './food-search.css';
// photo
import hamburgerIcon from '../../pic/hamburger-icon.svg';





const FoodSearch = () => (
    <div className="food-search">
            <section className="user-nav"> 
            {/* אני מנסה להבין כיצד עושים אקרדיון */}
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
                    type="search" 
                    name="items" 
                    id="items" 
                    placeholder="search foods items"/>
                    <div className="result-list">
                        <div className="result">
                            <div className="category">
                                <div className="description">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </div>
);


export default FoodSearch;