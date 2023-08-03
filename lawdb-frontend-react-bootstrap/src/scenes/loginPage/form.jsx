import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/general.css';
import '../../styles/login.css';
import axios from 'axios';

const Form = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      console.log("Sending request:", { username, password });
      const response = await axios.post('http://localhost:4000/users/login', {
        username,
        password,
      });

      console.log("Response data:", response.data); // For demonstration purposes, we'll just log the response data

      // If the login is successful, you can redirect the user or show a success message
      console.log(response.data); // For demonstration purposes, we'll just log the response data
    } catch (error) {
      console.error(error); // Log the error to see the details in the console
      setLoginError('Invalid username or password. Please try again.'); // You can use error.response.data.error for more specific error messages
    }
  };

    return (
      <div className="container px-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                {/* Login Container - Welcome Message */}
                <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center" id="welcome-side">
                  <h3>Welcome back to</h3>
                  <h2>LawPhil Project!</h2>
                </div>

                {/* Login Container - Login Form */}
                <div className="col-md-6 col-lg-6 d-flex align-items-center" id="login-side">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="form-outline mb-4">
                        <label htmlFor="form-username" className="form-label">Username</label>
                        <input
                          type="username"
                          id="form-username"
                          className="form-control form-control-md"
                          value={username}
                          onChange={(e) => setUser(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="form-password" className="form-label">Password</label>
                        <input
                          type="password"
                          id="form-password"
                          className="form-control form-control-md"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {loginError && (
                        <div className="alert alert-danger" role="alert">
                          {loginError}
                        </div>
                      )}

                      <div className="md-auto mx-auto">
                        <div className="text-center mt-4 mx-auto">
                          <a href="#!" className="link-light">Forgot Password?</a>
                        </div>

                        <div className="text-center mt-4 mx-auto">
                          <button type="button" className="btn btn-light btn-md" onClick={handleLogin}>
                            Login
                          </button>
                        </div>
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
