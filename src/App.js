import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from './userContext';
import ProtectedRoute from './ProtectedRoute';
import NavbarPage from './scenes/navbar';
import SearchPage from './scenes/searchPage';
import SearchResultsPage from './scenes/searchResultsPage';
import LawContentPage from './scenes/lawContentPage';
import AdminDashboard from './scenes/adminDashboardPage';
import LoginPage from './scenes/loginPage';
import RegisterPage from './scenes/registerPage';
import UserProfile from './scenes/userProfilePage';
import './styles/components.css';
import './styles/general.css';

const hostUrl = "http://192.168.100.27";

const BackgroundWrapper = ({ children }) => {
    const location = useLocation();
    
    const getBackgroundClass = () => {
        if (location.pathname === '/search-results') {
            return 'white-bg';
        } else if (location.pathname === '/') {
            return 'search-bg';
        } else {
            return 'default-bg';
        }
    };
    
    return (
        <div className={`App ${getBackgroundClass()}`}>
            {children}
        </div>
    );
};
    
function App() {
    const { user, dispatch } = useContext(UserContext);  // Adjusted to use dispatch

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser && !user) {
            const userData = JSON.parse(sessionUser);
            
            // Dispatch the action instead of calling setUser
            dispatch({
                type: 'SET_USER',
                payload: userData,
            });
        }
    }, [user, dispatch]);  // Depend on user and dispatch

    return (
        <Router>
            <div className="App">
                <BackgroundWrapper>
                    <NavbarPage user={user} hostUrl={hostUrl} />
                    <Routes>
                        <Route path="/" element={<LoginPage hostUrl={hostUrl} />} />
                        <Route path="/register" element={<RegisterPage hostUrl={hostUrl} />} />
                        <Route path="/user-profile/:id" element={<ProtectedRoute element={<UserProfile hostUrl={hostUrl} />} allowedRoles={['user']} />} />
                        <Route path="/search" element={<ProtectedRoute element={<SearchPage hostUrl={hostUrl} />} allowedRoles={['user']} />} />
                        <Route path="/search-results" element={<ProtectedRoute element={<SearchResultsPage hostUrl={hostUrl} />} allowedRoles={['user']} />} />
                        <Route path="/law-content/:lawID" element={<LawContentPage hostUrl={hostUrl} allowedRoles={['user']} />} />
                        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard hostUrl={hostUrl} />} allowedRoles={['admin']} />} />
                    </Routes>
                </BackgroundWrapper>
            </div>
        </Router>
    );
}
        
export default App;
        