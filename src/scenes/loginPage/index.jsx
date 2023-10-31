import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';
import Form from "./Form";
// TODO:
//  1. feature to navigate to admin dashboard if account is an admin account

// FIXME: 
//  1. login form position is off

const LoginPage = ({ hostUrl }) => {
    const { user, dispatch } = useContext(UserContext);   
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });    

    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // This effect redirects the user after login, based on their role
    useEffect(() => {
        if (user && shouldNavigate) {
            console.log('Preparing to navigate...');  // Log for debugging
            console.log('Current user object:', user);
            // Reset the navigation flag
            setShouldNavigate(false);

            // Determine the destination based on the user's role
            const destination = user.is_admin === 1 ? '/admin-dashboard' : '/search';

            // Navigate to the new destination
            try {
                console.log('Navigated to:');
                navigate(destination);
                console.log(destination);
            } catch (error) {
                console.error('Navigation error:', error);
            }
        }
    }, [user, navigate, shouldNavigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };
        
        const url = `${hostUrl}/LawPhil2.0_Server/userCRUD/loginUser.php`;
        
        try {
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();

            console.log('Response Data: ', responseData);
            
            if (responseData.success) {  // Only set user if login is successful and user is not set
                const newUser = {
                    id: responseData.id,
                    email: responseData.email,
                    is_admin: responseData.is_admin,
                };
    
                console.log('Dispatching user:', newUser);  // Log the user being dispatched
    
                // Dispatch the SET_USER action to update the global user state upon successful login
                dispatch({
                    type: 'SET_USER',
                    payload: newUser,
                });
    
                // Set the navigation flag
                setShouldNavigate(true);
            } else {
                console.log("Login failed:", responseData.message);
            }
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
    
    return (
        <div>
            <div className="container-user d-flex align-items-center min-vh-100">
                <Form
                    className="text-center"
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};
    
export default LoginPage;