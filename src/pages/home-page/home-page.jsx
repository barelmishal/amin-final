import React, { Component } from 'react';
// import { GoogleLogin } from 'react-google-login';
import './home-page.css';

// const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


class HomePage extends Component  {
    constructor() {
        super();
        this.start = {}
    }
    render() {
        return (
          <div className="home-page main">
              <div className="login-title"> 
                {/* look good */}
                  <button className="log-in-button">log in</button>
              </div>
              <div className="login-content">
                  <div className="app-description">
                      <p>this app ...</p>
                  </div>
                  <div className="register-down dots"></div>
                  <button className="register-down register">Register with Google</button>
              </div>
          </div>
        );
    }
}

export default HomePage;
