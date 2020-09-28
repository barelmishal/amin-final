import React from "react";
import Action from "../buttons/back-to/action";
import "./user-nav.css";

const UserNav = (props) => {
  return (
    <div className="user-nav">
      <Action btnTatile="main page" className="main-page" />
      <div className="title" id="title">
        Welcome Ron Levi
      </div>
      <Action btnTatile="sign out" className="sign-out" />
    </div>
  );
};

export default UserNav;
