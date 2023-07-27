// add redux persist later (application state to be stored and restored across browser sessions)
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import Navbar from './scenes/navbar';
import RegisterPage from './scenes/registerPage';
import SearchPage from './scenes/searchPage';
import SearchResultsPage from './scenes/searchResultsPage';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <div className="NavbarPosition">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;