// LIBARY
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import './home-page.css';


const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


class HomePage extends Component {
    constructor() {
        super();
    }

    handleLoginFailure = (e) => {
        console.error(e)
    }

    render() {
        const { onLogin, userInfo} = this.props

        return (
          <div className="home-page main">
              {/* NavBar */}
              
              {userInfo ? (
                   <div className="login-page">{`welcome ${userInfo.firstName} ${userInfo.lastName}`}</div>

                ) : (
                  
                  <div className="logout">you are log out
                    <div className="login-title"> 
                            {/* look good */}
                            <button className="log-in-button">log in</button>
                            </div>
                            <div className="login-content">
                                <div className="app-description">
                                <p>this app ...</p>
                            </div>
                                <div className="register-down dots"></div>
                                <GoogleLogin
                                    clientId={CLIENT_ID} // <--- The Google client ID that we defined in the .env file or passed from Heroku dashboard
                                    onSuccess={onLogin} // <--- This function is passed from `App.js`. We are telling `react-google-login` to call the `onLogin` function that is defined in `App.js`
                                    onFailure={this.handleLoginFailure} // <--- Tell `react-google-login` to call this function if the log in fails
                                    // I'll be honest I copied these props from the documentation
                                    // and I'm not exactly sure what they do
                                    cookiePolicy={'single_host_origin'}
                                    responseType='code,token'
                                />                        
                </div>
            </div>
            )}
              
        </div>
        );
    }
}

export default HomePage;
