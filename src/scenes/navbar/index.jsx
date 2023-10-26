// TODO: 
//    1. fix the styling of the register and login buttons
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Assuming you have the search icon imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleLawsButtonClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('searchQuery', '');
        navigate(`/search-results/?${queryParams.toString()}`);
    };

    const renderRightButton = () => {
        if (location.pathname === "/") {
            return (
                <Link to="/register" className="btn btn-md nav-btn">Register</Link> // Adjust styles as needed
            );
        } else if (location.pathname === "/register") {
            return (
                <Link to="/" className="btn btn-md nav-btn">Login</Link> // Adjust styles as needed
            );
        } else if (location.pathname.startsWith("/search-results")) {
            return ( // Added return statement here
                <Link className="nav-link active" aria-current="page" to="/search">
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
            );
        } else if (location.pathname.startsWith("/search")) {
            return ( // Added return statement here
                <button className="nav-link active" onClick={handleLawsButtonClick}>LAWS</button>
            );
        }
        // You can continue with more conditions if there are other specific paths or requirements.
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            
                <div className="btn-group">
                    <div>
                        <img src="/logo.png" className="logo-sm mx-2" alt="lawphil logo" />
                    </div>
                    {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link to="/link1">Log In</Link></li>
                        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                        <li><Link to="/link3">Example</Link></li>
                    </ul> */}
                </div>
                
                <Link className="navbar-brand" to="https://lawphil.net/">ARELLANO LAW FOUNDATION</Link>
                
                {renderRightButton()}
            </div>
        </nav>
    );
};

export default Navbar;