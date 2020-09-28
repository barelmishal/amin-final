import React from "react";
import { Route, Link } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";
import Action from "../../components/buttons/back-to/action";
import "./welcome.css";

const Welcome = (props) => {
  return (
    <div className="welcome-container">
      <UserNav />
      <br />
      <div className="text">
        Click one of the
        <br />
        buttons to get started{" "}
      </div>
      <div className="button-container">
        <Action
          onClick={props.onCreateRecipeClick}
          btnTatile="Create Recipes"
          className="create-recipes"
        />

        <div className="text">or</div>

        <Action btnTatile="Create New client" className="creat-new-client" />
      </div>
    </div>
  );
};

export default Welcome;
