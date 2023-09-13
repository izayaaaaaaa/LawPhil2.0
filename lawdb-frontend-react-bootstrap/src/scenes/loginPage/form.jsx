// loginPage Form.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ hostUrl }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${hostUrl}/LawPhil2.0_Server/login.php`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        // log the user response role
        console.log("Response data:", response.data);
        console.log("Login successful!");
        localStorage.setItem("username", formData.username); // Store the username
        localStorage.setItem("role", response.data.role); // Store the user role

        if (localStorage.getItem("role")=== "admin") {
        // Redirect admin users to the admin dashboard
        window.location.href = "/admin-dashboard";
        } else {
          // Redirect normal users to the main page
          window.location.href = "/";
        }
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.log("Login failed:", error.message);
    }
  };

  return (
    <div className="container px-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <div className="card log-card">
            <div className="row g-0">
              {/* Login Container - Welcome Message */}
              <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center" id="welcome-side">
                <h3>Welcome back to</h3>
                <h2>LawPhil Project!</h2>
              </div>

              {/* Login Container - Login Form */}
              <div className="col-md-6 col-lg-6 d-flex align-items-center" id="login-side">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label className="form-label login-form-label" htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        id="username" 
                        className="form-control form-control-md login-form-control" 
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <label className="form-label login-form-label" htmlFor="password">Password</label>
                      <input 
                        type="password" 
                        id="password" 
                        className="form-control form-control-md login-form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                
                    {/* <div className="text-center mt-4">
                      <a href="#!" className="link-light">Forgot Password?</a>
                    </div> */}
                
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-light btn-md login-btn">
                        <span id="btn-text">Login</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
