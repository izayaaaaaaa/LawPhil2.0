import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/general.css';
import '../../styles/register.css';
import Form from "./Form";

const RegisterPage = ({ hostUrl }) => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <Form hostUrl={hostUrl} />
    </div>
  );
};

export default RegisterPage;