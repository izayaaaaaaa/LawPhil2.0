import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Form.jsx

const Form = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    onSearch(searchQuery);
  };
  return (
    <div className="body-search">
      <div className="container d-flex flex-column">
        <div className="search-body text-center flex-grow-1 vh-100">
          <img src="/logo.png" className="login-logo mb-4" alt="LawPhil Logo" />
          <h4 className="mb-3">ARELLANO LAW FOVNDATION</h4>
          <h1>LawPhil Project</h1>
          {/* Main Search */}
          <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-group has-feedback">
              <div className="input-group my-5">
                <input
                  type="text"
                  className="form-control search-form-control"
                  placeholder="Search Keywords"
                  aria-label="Search Bar"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                  <div className="input-group-append">
                    <button type="submit" className="btn search-btn"> {/* Change the Link component to a button */}
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <h5>FREE ACCESS TO LAW</h5>
        </div>
      </div>
    </div>
  );
};

export default Form;
