import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { useState } from "react";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// const registerSchema = yup.object().shape({
//   email: yup.string().email().required(),
//   username: yup.string().required(),
//   password: yup.string().required(),
//   confirmPassword: yup.string().required()
// });

// const loginSchema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().required()
// });

// const initialValuesRegister = {
//   email: "",
//   username: "",
//   password: "",
//   confirmPassword: ""
// };

// const initialValuesLogin = {
//   email: "",
//   password: ""
// };

const Form = () => {
  // const [pageType, setPageType] = useState("login");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  // const isLogin = pageType === "login";
  // const isRegister = pageType === "register";
  
  // const register = async (values, onSubmitProps) => {
  //   const formData = new FormData();
  //   for (let value in values) {
  //     formData.append(value, values[value]);
  //   }
  
  //   const savedUserResponse = await fetch(
  //     "http://localhost:3001/auth/register",
  //     {
  //       method: "POST",
  //       body: formData
  //     }
  //   );
  
  //   const savedUser = await savedUserResponse.json();
  //   onSubmitProps.resetForm();
  
  //   if (savedUser) {
  //     setPageType("login");
  //   }
  // };
  
  // const login = async (values, onSubmitProps) => {
  //   const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values)
  //   });
  //   const loggedIn = await loggedInResponse.json();
  //   onSubmitProps.resetForm();
  //   if (loggedIn) {
  //     dispatch(
  //       setLogin({
  //         user: loggedIn.user
  //         // token: loggedIn.token,
  //       })
  //     );
  //     // navigate("/home");
  //     // navigate to basic search page
  //   }
  // };
  
  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   if (isLogin) await login(values, onSubmitProps);
  //   if (isRegister) await register(values, onSubmitProps);
  // };
  
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