
import React from "react";
import Register from "./Register";
// import Login from "./Login";
import "./User.css";

function User() {
  return (
    <div className="user-container">
      <div className="user-card">
        <Register />
      </div>

      {/* <div className="user-card">
        <Login />
      </div> */}
    </div>
  );
}

export default User;