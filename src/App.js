// LIBEARY
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"; 
// CSS
import './App.css';
// components
// PAGES
import FoodSearch from './pages/food-search/food-search';
import HomePage from './pages/home-page/home-page';




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  } 
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/food-search">
                  <FoodSearch/>
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}