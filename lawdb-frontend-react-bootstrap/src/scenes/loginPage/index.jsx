// loginPage index.jsx 

import React from "react";
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';

const LoginPage = ({ hostUrl }) => {
  return (
    <div>
      <div className="container d-flex align-items-center min-vh-100">
        <Form hostUrl={hostUrl} className="text-center"/>
      </div>
    </div>
  );
};

export default LoginPage;