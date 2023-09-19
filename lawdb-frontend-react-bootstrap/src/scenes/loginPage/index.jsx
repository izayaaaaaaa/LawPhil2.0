/**
 * The above code is a React component for a login page that handles form submission and API calls to
 * authenticate users.
 * @returns The LoginPage component is being returned.
 */

import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';
import Form from "./Form";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = ({ hostUrl, registrationSuccess }) => {
  const navigate = useNavigate();
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  useEffect(() => {
    // When registrationSuccess prop changes to true, show the message
    if (registrationSuccess) {
      setShowRegistrationSuccess(true);

      // Hide the message after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowRegistrationSuccess(false);
      }, 3000);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [registrationSuccess]);

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
        const redirectUrl = responseData.role === 'admin' ? '/admin-dashboard' : '/';
        navigate(redirectUrl);
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
        {showRegistrationSuccess && ( 
          // Conditionally render the alert based on registrationSuccess
          <div className="alert alert-success" role="alert">
            Registration was successful! You can now log in.
          </div>
        )}
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