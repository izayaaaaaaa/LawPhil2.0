// add redux persist later (application state to be stored and restored across browser sessions)

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import Navbar from './scenes/navbar';
import RegisterPage from './scenes/registerPage';
import './styles/components.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className="NavbarPosition">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;