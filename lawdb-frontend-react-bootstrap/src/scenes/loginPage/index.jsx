// loginPage index.jsx 
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; 
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/login.css';

const LoginPage = ({ hostUrl }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    navigate('/search'); // Redirect to the search page or the appropriate page
  }

  return (
    <div>
      <div className="container d-flex align-items-center min-vh-100">
        <Form hostUrl={hostUrl} className="text-center" login={login}/>
      </div>
    </div>
  );
};

export default LoginPage;