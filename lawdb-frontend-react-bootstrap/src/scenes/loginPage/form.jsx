import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = () => {
  return (
    <div class="row">
      <div class="col-md-auto">
        <h3>Welcome back to</h3>
        <h1>LawPhil!</h1>
      </div>
      <div class="col-md-auto">
        <form>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Username</label>
            <input 
              type="email" 
              id="form3Example3" 
              class="form-control form-control-lg" 
            />
          </div>
          
          <div class="form-outline mb-3">
            <label class="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" class="form-control form-control-lg"/>
          </div>
      
          <div class="d-flex justify-content-between align-items-center">
            <a href="#!" class="text-body">Forgot password?</a>
          </div>
      
          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-primary btn-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;