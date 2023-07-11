import React from 'react';
// import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <form onSubmit={handleSubmit}>
      <div class="form-outline mb-4">
        <label class="form-label" for="form3Example3">Username</label>
        <input 
          type="email" 
          id="form3Example3" 
          class="form-control form-control-lg" 
        />
      </div>
      <div class="form-outline mb-4">
        <label class="form-label" for="form4Example4">Username</label>
        <input 
          type="text" 
          id="form4Example4" 
          class="form-control form-control-lg" 
        />
      </div>
      
      <div class="form-outline mb-3">
        <label class="form-label" for="form3Example4">Password</label>
        <input type="password" id="form3Example4" class="form-control form-control-lg"/>
      </div>
      <div class="form-outline mb-3">
        <label class="form-label" for="form3Example4">Password</label>
        <input type="password" id="form3Example4" class="form-control form-control-lg"/>
      </div>
  
      <div class="text-center text-lg-start mt-4 pt-2">
        <button type="submit" class="btn btn-primary btn-lg">Register</button>
      </div>
    </form>
  );
};

export default Form;