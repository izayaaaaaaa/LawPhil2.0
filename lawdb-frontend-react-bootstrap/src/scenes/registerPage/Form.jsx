// register form
// to do: 
// - implement a feature that checks if the username already exists, cancel registration if yes

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterForm = ({ hostUrl }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      // console.log("Backend Base URL:", hostUrl);

      const response = await axios.post(`${hostUrl}/LawPhil2.0_Server/register.php`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      // console.log("Full response object:", response); 

      if (response.data.success) {
        console.log("Registration successful!");
        // Redirect to login page
        navigate('/login');
      } else {
        console.log("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.log("Registration failed:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10 mx-auto">
          <div className="card reg-card reg-card-bg">
            <div className="text-center">
              <h3>Welcome back to</h3>
              <h2>LawPhil Project!</h2>
              <br />
            </div>

            <form onSubmit={handleSubmit} className="px-5">
              <div className="form-outline mb-4 input-wrapper">
                <label className="form-label reg-form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control reg-form-control form-control-md"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4 input-wrapper">
                <label className="form-label reg-form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control reg-form-control form-control-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4 input-wrapper">
                <label className="form-label reg-form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control reg-form-control form-control-md"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center mt-4 mx-auto">
                <button type="submit" className="btn btn-light reg-btn btn-md">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
