import React from "react";
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';

const LoginPage = () => {
  return (
    <div>
      <div className="container d-flex align-items-center min-vh-100">
        <Form className="text-center"/>
      </div>
    </div>
  );
};

export default LoginPage;