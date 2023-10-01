// navbar
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Navbar dropdown */}
        <div id="navbar-dropdown">
          <img src="/logo.png" className="logo-sm mx-3" alt="LawPhil Logo" />

          {/* Dropdown content */}
          <div className="dropdown-content">
            <Link to="/link1">Log In</Link>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            <Link to="/link3">Example</Link>
          </div>
        </div>
<Link className="navbar-brand" to="/">ARELLANO LAW FOUNDATION</Link>
        <Link className="nav-link active" aria-current="page" to="/">
          LAWS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
