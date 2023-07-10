// add redux persist later (application state to be stored and restored across browser sessions)

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './scenes/loginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;