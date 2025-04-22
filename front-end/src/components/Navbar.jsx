import React from "react";
import { Link } from "react-router-dom"; // ✅ This is the correct Link
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">📚 AI Study</div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <button className="login-button">Login</button>
    </nav>
  );
}

export default Navbar;


