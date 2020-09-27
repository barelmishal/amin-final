// LIBEARY
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// CSS
import "./App.css";
// components
// PAGES
import FoodSearch from "./pages/food-search/food-search";
import HomePage from "./pages/home-page/home-page";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((userInfo) => {
        this.setState({ userInfo, loading: false });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
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
    const { userInfo, loading } = this.state;

    // Hide the entire UI while we load the logged in user info
    // in order to prevent the logged out content from flickering
    // before we load the user info.
    if (loading) {
      return <div></div>;
    }

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/food-search">
              <FoodSearch />
            </Route>
            <Route path="/">
              <HomePage onLogin={this.onLogin} userInfo={userInfo} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
