import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/general.css';
import '../../styles/login.css';


const Form = () => {
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
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label login-form-label" for="form-username">Username</label>
                        <input 
                          type="email" 
                          id="form-username" 
                          className="form-control login-form-control form-control-md" 
                        />
                      </div>
                      
                      <div className="form-outline mb-4">
                        <label className="form-label login-form-label" for="form-password">Password</label>
                        <input 
                          type="password" 
                          id="form-password" 
                          className="form-control login-form-control form-control-md"/>
                      </div>
                  
                      <div className="md-auto mx-auto">
                        <div className="text-center mt-4 mx-auto">
                          <a href="#!" className="link-light">Forgot Password?</a>
                        </div>
                    
                        <div className="text-center mt-4 mx-auto">
                          <button type="button" className="btn btn-light login-btn btn-md">
                            <text id="btn-text">Login</text>
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