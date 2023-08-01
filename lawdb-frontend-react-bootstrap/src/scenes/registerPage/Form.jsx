import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend registration endpoint
      const response = await axios.post('http://localhost:4000/users/register', formData);
      console.log('Registration successful:', response.data);
      // You can redirect to a success page or display a success message here
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data);
        // You can show an error message to the user using error.response.data
      } else {
        console.error('Registration failed:', error.message);
        // Handle other types of errors without relying on response data
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4"> 
        <label htmlFor="form3Example3">E-mail</label>
        <input
          name="email"
          type="email"
          id="form3Example3"
          value={formData.email}
          onChange={handleChange}
          className="form-control form-control-lg"   
        />
      </div>
      <div className="form-outline mb-4">
        <label htmlFor="form4Example4">Username</label>
        <input
          name="username"
          type="text"
          id="form4Example4"
          value={formData.username} 
          onChange={handleChange}
          className="form-control form-control-lg"
        />
      </div>

      <div className="form-outline mb-3">
        <label htmlFor="form3Example4">Password</label>                         
        <input
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          type="password"
          className="form-control form-control-lg"
        />
      </div>
      <div className="form-outline mb-3">
        <label htmlFor="form3Example5">Confirm Password</label>
        <input 
          name="repeatpassword" 
          value={formData.password} 
          onChange={handleChange} 
          type="password"
          id="form3Example5"
          className="form-control form-control-lg"
        />
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-lg">Register</button>
      </div>
    </form>
  );
};

export default Form;
