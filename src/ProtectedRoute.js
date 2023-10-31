import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
    const { user } = useContext(UserContext);

    console.log('Route props:', rest);
    
    const isAuthenticated = !!user;
    const isAdmin = user && user.is_admin === 1;
    const isAllowedRole = isAuthenticated && (allowedRoles.includes('admin') ? isAdmin : true);
    
    console.log('Protected route accessed:', rest.path); // log which route is being accessed
    console.log('User authenticated:', isAuthenticated);
    console.log('Is admin:', isAdmin);
    console.log('Has allowed role:', isAllowedRole);
    
    // Check if the user is allowed to access the route
    if (!isAllowedRole) {
        // If not, redirect them to the login page or another appropriate page
        return <Navigate to="/" replace />;
    }

    // If the user is allowed, render the element directly without wrapping it in <Route>
    return element; // This is the change: just return the element as is
};
        
export default ProtectedRoute;
