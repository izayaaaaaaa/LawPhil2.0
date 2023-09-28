/**
 * The above code is a JavaScript file that defines the main App component for a React application,
 * which includes routing and rendering different scenes/pages based on the URL path.
 * @returns The App component is being returned.
 */

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import NavbarPage from './scenes/navbar';
import RegisterPage from './scenes/registerPage';
import SearchPage from './scenes/searchPage';
import SearchResultsPage from './scenes/searchResultsPage';
import LawContentPage from './scenes/lawContentPage';
import UserProfile from './scenes/userProfilePage/UserProfile';
import AdminDashboard from './scenes/adminDashboardPage';
import './styles/components.css';
import './styles/general.css';

const hostUrl = "http://192.168.56.1";

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  // Conditionally apply the appropriate background class based on the route
  const getBackgroundClass = () => {
    if (location.pathname === '/search-results') {
      return 'white-bg';
    } else if (location.pathname === '/') {
      return 'search-bg';
    } else {
      return 'default-bg';
    }
  };
  // Conditionally apply padding for each page
  const getContentStyles = () => {
    let paddingTop = '12vh';
  
    if (location.pathname === '/law-content/') {
      paddingTop = '30vh';
    } else if (location.pathname === '/user-profile' || location.pathname === '/login') {
      paddingTop = '25vh';
    }else if (location.pathname === '/admin-dashboard') {
      paddingTop = '12vh';
    } else if (location.pathname === '/') {
      paddingTop = '0';
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <BackgroundWrapper>
          <div className="NavbarPosition">
            <NavbarPage hostUrl={hostUrl} />
          </div>
          <Routes>
            <Route path="/" element={<SearchPage hostUrl={hostUrl} />} />
            <Route path="/search-results/*" element={<SearchResultsPage hostUrl={hostUrl} />} />
            <Route path="/law-content/:id" element={<LawContentPage hostUrl={hostUrl} />} />

            <Route path="/login" element={<LoginPage hostUrl={hostUrl}  registrationSuccess={registrationSuccess} />} />
            <Route path="/register" element={<RegisterPage hostUrl={hostUrl} setRegistrationSuccess={setRegistrationSuccess} />} />
            <Route path="/user-profile/:id" element={<UserProfile hostUrl={hostUrl}/>} />
            <Route path="/admin-dashboard" element={<AdminDashboard hostUrl={hostUrl}/>} />
      
            {/* about us route */}
            {/* disclaimer route ? */}
          </Routes>
        </BackgroundWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;