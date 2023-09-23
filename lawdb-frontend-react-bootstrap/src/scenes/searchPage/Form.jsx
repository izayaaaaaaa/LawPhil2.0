import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Form.jsx

const Form = ({
  searchQuery,
  selectedCategory,
  handleInputChange,
  handleCategoryChange,
  handleSearch,
  categories,
  searchType,
  setSearchType,
}) => {
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
              <div className="form-group has-feedback my-5">
                <div className="input-group search-input">
                  {/* Text Input */}
                  <input
                    type="text"
                    className="form-control search-form-control"
                    placeholder="Search Keywords"
                    aria-label="Search Bar"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn search-btn">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                  {/* Dropdowns */}
                  <div className="input-group my-3 d-flex mx-auto justify-content-center align-items-center">
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="form-selection"
                    >
                      {/* change into fetched categories */}
                      <option value="all">All Categories</option>
                      <option value="consti">Constitution</option>
                      <option value="stat">Statutes</option>
                      <option value="admin">Administrative Issuances</option>
                    </select>
                    <select
                      id="searchType"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="form-selection"
                    >
                      <option value="both">Both Title and Content</option>
                      <option value="title">Title Only</option>
                      <option value="content">Content Only</option>
                    </select>
                  </div>
                </div>
          </form>
          <h5>FREE ACCESS TO LAW</h5>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Form;
