import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Create an AuthProvider component to wrap your entire application
export function AuthProvider({ children, hostUrl }) {
  const [user, setUser] = useState(null); // Store user information
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (userData) => {
    try {
      // Perform your login logic, e.g., send a request to your PHP backend
      const response = await fetch(`${hostUrl}/LawPhil2.0_Server/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        // Assuming the response contains user data with a token
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', user.token); // Store the token
      } else {
        // Handle login failure, show an error message, etc.
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    // Perform logout logic, e.g., clear user data and token
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove the stored token
    };

  const isAdmin = () => {
    return isAuthenticated && user && user.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
