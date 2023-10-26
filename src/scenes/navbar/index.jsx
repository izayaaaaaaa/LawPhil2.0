import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'; // Assuming you have the search icon imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

// TODO:
//      1. create the drop down for logged in users (user profile, laws, search, logout, etc...) --> check new navbar style

// FIXME: 
//      1. fix the styling of the register and login buttons --> migrated them into a dropdown user menu
//      2. fix temp fix for logout - should not be visible when login/reg is visible (sessions?)
//      3. fix dropdown option for admin dash - should only be visible for admin users

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navbarSpacing = location.pathname !== '/' ? 'mb-5' : '';
    
    const handleLawsButtonClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('searchQuery', '');
        navigate(`/search-results/?${queryParams.toString()}`);
    };

    const renderUserItems = () => {
        return (
            <div className="btn-group">
                <button
                    className="btn btn-link btn-md dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <FontAwesomeIcon icon={faUser} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    {location.pathname === "/login" ? (
                        <li><Link to="/register" className="dropdown-item">Register</Link></li>
                    ) : (
                        <li><Link to="/login" className="dropdown-item">Login</Link></li>
                    )}
                    {/* temp fix for logout */}
                    {location.pathname !== "/login" && location.pathname !== "/register" && (
                        <li><Link to="/login" className="dropdown-item">Logout</Link></li>
                    )}
                    <li><Link to="/admin-dashboard" className="dropdown-item">Admin Dashboard</Link></li>
                </ul>
            </div>
        );
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${navbarSpacing}`}>
            <div className="container-fluid">
            
                <div className="btn-group">
                    <div>
                        {location.pathname.startsWith("/search-results") ? (
                            <Link className="nav-link active" aria-current="page" to="/">
                                <FontAwesomeIcon icon={faSearch} />
                            </Link>
                        ) : (
                            <button className="nav-link btn-link active" onClick={handleLawsButtonClick}>LAWS</button>
                        )}
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link to="/link1">Log In</Link></li>
                        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                        <li><Link to="/link3">Example</Link></li>
                    </ul>
                </div>
                
                <Link className="navbar-brand" to="/">ARELLANO LAW FOUNDATION</Link>
                
                {renderUserItems()}
            </div>
        </nav>
    );
};

export default Navbar;
