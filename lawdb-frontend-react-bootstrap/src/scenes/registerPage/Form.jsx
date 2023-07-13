import React from 'react';
// import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/general.css';
import '../../styles/register.css';

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().required(),
//   confirmPassword: yup.string().required(),
// });

// const initialValues = {
//   username: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
// };

const Form = () => {
  const handleSubmit = async(values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
          method: "POST",
          body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm(); RESET THE FORM
  };

  return (
    <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10 mx-auto">
            <div className="card reg-card reg-card-bg">
                <div className="text-center">
                  <h3>Welcome back to</h3>
                  <h2>LawPhil Project!</h2>
                  <br/>
                </div>
              
                <form onSubmit={handleSubmit} className="px-5">
                  <div class="form-outline mb-4 input-wrapper">
                    <label class="form-label reg-form-label" for="form-username">Username</label>
                    <input 
                      type="text" 
                      id="form-username" 
                      class="form-control reg-form-control form-control-md" 
                    />
                  </div>

                  <div class="form-outline mb-4 input-wrapper">
                    <label class="form-label reg-form-label" for="form-email">Email</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      class="form-control reg-form-control form-control-md"
                      />
                  </div>

                  <div class="form-outline mb-4 input-wrapper">
                    <label class="form-label reg-form-label" for="form-password">Password</label>
                    <input 
                      type="password" 
                      id="form-password" 
                      class="form-control reg-form-control form-control-md"/>
                  </div>

                  <div class="form-outline mb-5 input-wrapper">
                    <label class="form-label reg-form-label" for="form-confirm">Confirm Password</label>
                    <input 
                      type="password" 
                      id="form-confirm" 
                      class="form-control reg-form-control form-control-md" 
                    />
                  </div>
              
                  <div className="text-center mt-4 mx-auto">
                    <button type="button" className="btn btn-light reg-btn btn-md">
                      <text id="btn-text">Register</text>
                    </button>
                  </div>
                
                </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Form;