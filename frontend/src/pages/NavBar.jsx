import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Smart Task Manager</h2>
      </div>

      <ul className="navbar-links">
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>

            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
