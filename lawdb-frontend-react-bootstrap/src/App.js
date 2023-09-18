/**
 * The above code is a JavaScript file that defines the main App component for a React application,
 * which includes routing and rendering different scenes/pages based on the URL path.
 * @returns The App component is being returned.
 */

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import NavbarPage from './scenes/navbar';
import RegisterPage from './scenes/registerPage';
import SearchPage from './scenes/searchPage/searchPage';
import SearchResultsPage from './scenes/searchResultsPage';
import LawContentPage from './scenes/lawContentPage';
import UserProfile from './scenes/userProfilePage/UserProfile';
import AdminDashboard from './scenes/adminDashboardPage';
import './styles/components.css';
import './styles/general.css';

const hostUrl = "http://192.168.100.19";

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  // Conditionally apply the appropriate background class based on the route
  const getBackgroundClass = () => {
    if (location.pathname === '/search-results') {
      return 'white-bg'; // For search results page
    } else if (location.pathname === '/') {
      return 'search-bg'; // For search page
    } else {
      return 'default-bg'; // Use the default class for other pages
    }
  };

  // Conditionally apply padding for search results page
  const getContentStyles = () => {
    let paddingTop = '12vh'; // Default top padding

    if (location.pathname === '/law-content/') {
      paddingTop = '30vh'; // Override top padding for search results page
    } else if (location.pathname === '/user-profile' || location.pathname === '/login') {
      paddingTop = '25vh'; // Override top padding for search results page
    } else if (location.pathname === '/admin-dashboard') {
      paddingTop = '15vh'; // Override top padding for admin-dashboard page
    } else if (location.pathname === '/') {
      paddingTop = '0'; // Override top padding for search page
    }

    return { paddingTop, paddingBottom: '0' }; // Set bottom padding to 0 for all pages
  };


  return (
    <div className={`App ${getBackgroundClass()}`}>
      <div style={getContentStyles()}>{children}</div>
    </div>
  );
};

function App() {
  // const { getRole } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <BackgroundWrapper>
          <div className="NavbarPosition">
            <NavbarPage hostUrl={hostUrl} />
          </div>
          <Routes>
            <Route path="/" element={<SearchPage hostUrl={hostUrl} />} />
            <Route path="/search-results/:query" element={<SearchResultsPage hostUrl={hostUrl} />} />
            <Route path="/law-content/:id" element={<LawContentPage hostUrl={hostUrl} />} />

            <Route path="/login" element={<LoginPage hostUrl={hostUrl} />} />
            <Route path="/register" element={<RegisterPage hostUrl={hostUrl} />} />
            <Route path="/user-profile/:id" element={<UserProfile hostUrl={hostUrl} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard hostUrl={hostUrl} />} />

            {/* about us route */}
            {/* disclaimer route ? */}
          </Routes>
        </BackgroundWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;