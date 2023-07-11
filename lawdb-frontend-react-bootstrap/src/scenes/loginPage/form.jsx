import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/general.css';
import '../../styles/login.css';


const Form = () => {
  return (
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card">
              <div class="row g-0">

                <div class="col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <h3>Welcome back to</h3>
                    <h2>LawPhil Project!</h2>
                </div>

                <div class="col-md-6 col-lg-6 d-flex align-items-center" id="login-side">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form-username">Username</label>
                        <input 
                          type="email" 
                          id="form-username" 
                          class="form-control form-control-md" 
                        />
                      </div>
                      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form-password">Password</label>
                        <input 
                          type="password" 
                          id="form-password" 
                          class="form-control form-control-md"/>
                      </div>
                  
                      <div class="d-flex justify-content-between align-items-center">
                        <a href="#!" class="text-body" id="form-forgot">Forgot password?</a>
                      </div>
                  
                      <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="button" class="btn btn-primary btn-lg">Login</button>
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