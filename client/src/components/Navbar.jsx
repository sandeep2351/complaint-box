import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Navbar = ({ isAuthenticated }) => {
  console.log('Navbar Rendering with isAuthenticated:', isAuthenticated);

  return (
    <nav>
      <div className="navbar">
        <Link className="navbar-brand" to="/">VIT Complaints</Link>
        <div className="button-container">
          {isAuthenticated ? (
            <>
              <Link className="submit-btn" to="/logout">Logout</Link>
              <Link className="submit-btn submit-complaint-btn" to="/submit-form">Submit a complaint</Link>
            </>
          ) : (
            <>
              <Link className="submit-btn" to="/login">Login/SignUp</Link>
              <Link className="submit-btn submit-complaint-btn" to="/submit-form">Submit a complaint</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
