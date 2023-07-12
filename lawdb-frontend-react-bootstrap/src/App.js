// add redux persist later (application state to be stored and restored across browser sessions)

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import Navbar from './scenes/navbar';
import RegisterPage from './scenes/registerPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* ^this placement makes the navbar appear behind the page content rather than as an overlay */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;