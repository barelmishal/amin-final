// LIBEARY
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// CSS
import "./App.css";
// components
// PAGES
import Search from "./pages/food-search/search";
import HomePage from "./pages/home-page/home-page";
import FoodAmounts from "./pages/amounts/foods-amount";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    };
  }

  onLogin = (response) => {
    fetch("/api/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleToken: response.getAuthResponse().id_token,
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        this.setState({ userInfo: info });
      });
  };

  logout = () => {
    fetch("/api/users/logout", {
      method: "POST",
    }).then(() => {
      this.setState({ userInfo: null });
    });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/food-amounts">
              <FoodAmounts userInfo={userInfo} onLogout={this.logout} />
            </Route>
            <Route path="/">
              <Search userInfo={userInfo} onLogout={this.logout} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
