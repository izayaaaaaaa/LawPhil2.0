import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';
import Form from "./Form";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// TODO:
//  1. feature to navigate to admin dashboard if account is an admin account

// FIXME: 
//  1. login form position is off

const LoginPage = ({ hostUrl }) => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    // SETS THE REQUEST BODY TO BE SENT TO THE SERVER
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    
    // LOGIN API
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        
        const url = `${hostUrl}/LawPhil2.0_Server/userCRUD/loginUser.php`;
        
        try {
            const response = await fetch(url, requestOptions);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const responseData = await response.json();
            
            if (responseData.success) {
                // const redirectUrl = responseData.success === 'true' ? '/search' : '/';
                navigate('/search');
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