// template navbar only for routing purposes; fix and make it look like the one on figma
// if on the register page, the register button should be login and vice versa
  // if done logging in, the button should be a user icon with a dropdown menu

/* Checklist for navbar:
 * [✓] fix navbar to look like the one on figma (decreased no. of menu items - tbc)
 * [✓] if on the register page, the register button should be login and vice versa
 * [ ] if done logging in, the button should be a user icon with a dropdown menu (implement when authentication is fixed)
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const buttonText = isLoginPage ? 'Register' : 'Login';

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <nav className={`navbar navbar-light bg-light ${isCollapsed ? 'isCollapsed' : ''}`}>
        <div className="container-fluid">
          <div>
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
                {isCollapsed ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
            </button>
            <a class="navbar-brand m-3" href="#">ARELLANO LAW FOVNDATION</a>
          </div>
          <form class="d-flex">
            <Link to={isLoginPage ? '/register' : '/'} class="btn nav-btn btn-md">
              {buttonText}
            </Link>
          </form>
        </div>
      </nav>
      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`} id="navbarToggleExternalContent">
        <div className="shadow-3 p-4">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">ABOUT US</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">DISCLAIMER</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;