// template navbar only for routing purposes; fix and make it look like the one on figma
// if on the register page, the register button should be login and vice versa
  // if done logging in, the button should be a user icon with a dropdown menu

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded={isCollapsed ? 'true' : 'false'}
            aria-label="Toggle navigation"
            onClick={handleToggleCollapse}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <a className="navbar-brand" href="#">ARELLANO LAW FOVNDATION</a>
          <form className="d-flex">
            <a href="/register" className="btn btn-primary">Register</a>
          </form>
        </div>
      </nav>
      <div className={`collapse ${isCollapsed ? 'show' : ''}`} id="navbarToggleExternalContent">
        <div className="bg-light shadow-3 p-4">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;