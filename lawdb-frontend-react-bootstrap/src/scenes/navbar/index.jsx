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
        <img src="/logo.png" className="logo-sm mx-3" alt="LawPhil Logo" />

        {/* Navbar dropdown */}
        <div className="navbar-brand" id="navbarBrandDropdown">
          <Link className="navbar-brand" to="/">ARELLANO LAW FOUNDATION</Link>

          {/* Dropdown content */}
          <div className="dropdown-content">
            <Link to="/link1">Link 1</Link>
            <Link to="/link2">Link 2</Link>
            <Link to="/link3">Link 3</Link>
          </div>
        </div>

        <Link className="nav-link active" aria-current="page" to="/">
          LAWS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
