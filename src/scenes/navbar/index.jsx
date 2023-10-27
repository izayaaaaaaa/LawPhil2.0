import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'; // Assuming you have the search icon imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';
import { UserContext } from '../../userContext';
import axios from 'axios';

// TODO:
//      1. create the drop down for logged in users (user profile, laws, search, logout, etc...) --> check new navbar style

// FIXME: 
//      1. fix the styling of the register and login buttons --> migrated them into a dropdown user menu
//      2. fix temp fix for logout - should not be visible when login/reg is visible (sessions?)
//      3. fix dropdown option for admin dash - should only be visible for admin users

const Navbar = ({ hostUrl }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(!!user);

    useEffect(() => {
        setLoggedIn(!!user);
    }, [user]);

    const navbarSpacing = location.pathname !== '/' ? 'mb-5' : '';
    
    // const handleLawsButtonClick = () => {
    //     const queryParams = new URLSearchParams();
    //     queryParams.append('searchQuery', '');
    //     navigate(`/search-results/?${queryParams.toString()}`);
    // };

    const handleLogout = async () => {
        try {
            // Request to the server-side script to end the session
            await axios.get(`${hostUrl}/LawPhil2.0_Server/userCRUD/logoutUser.php`); // Adjust the path to match your server's URL structure
            setLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    }

    const renderUserButtons = () => {
        if (!loggedIn) {
            // If no user is logged in, display register/login buttons
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
                        <li><Link to="/register" className="dropdown-item">Register</Link></li>
                        <li><Link to="/" className="dropdown-item">Login</Link></li>
                    </ul>
                </div>
            );
        }
    
        // Dropdown for authenticated users
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
                    {user.is_admin ? (
                        // If the user is an admin, show admin-related options
                        <li><Link to="/admin-dashboard" className="dropdown-item">Admin Dashboard</Link></li>
                    ) : (
                        // If the user is not an admin, show profile option
                        <li><Link to={`/user-profile/${user.id}`} className="dropdown-item">User Profile</Link></li>
                    )}
                    {/* Common logout option for all users */}
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
        );
    };

    // const renderSearchButtons = () => {
    //     if (location.pathname !== "/" || location.pathname !== "/register") {
    //         return (
    //             <div className="btn-group">
    //                 <div>
    //                     {location.pathname.startsWith("/search") ? (
    //                             <Link className="nav-link active" aria-current="page" to="/">
    //                                 <FontAwesomeIcon icon={faSearch} />
    //                             </Link>
    //                         ) : (
    //                             <button className="nav-link btn-link active" onClick={handleLawsButtonClick}>LAWS</button>
    //                         )
    //                     }
    //                 </div>
    //             </div>
    //         );
    //     } 
    // }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${navbarSpacing}`}>
            <div className="container-fluid">
                {/* {renderSearchButtons()} */}
                <Link className="navbar-brand" to="/search">ARELLANO LAW FOUNDATION</Link>
                {renderUserButtons()}
            </div>
        </nav>
    );
};

export default Navbar;
