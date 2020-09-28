import React from "react";
import { Link } from "react-router-dom";
import Action from "../buttons/back-to/action";
import "./user-nav.css";

const UserNav = (props) => {
  const { userInfo, onLogout } = props;
  return (
    <div className="user-nav">
      <Link to="/" className="main-page">
        Main page
      </Link>
      <div className="title" id="title">
        {userInfo && (
          <>
            Welcome {userInfo.first_name} {props.userInfo.last_name}
          </>
        )}
      </div>
      <Action onClick={onLogout} btnTatile="sign out" className="sign-out" />
    </div>
  );
};

export default UserNav;
