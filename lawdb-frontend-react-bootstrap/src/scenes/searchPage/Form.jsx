import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <div>
      <div className="container d-flex flex-column">
        <div className="search-body text-center flex-grow-1" >
          <h4>ARELLANO FOVNDATION</h4>
          <h1>LawPhil Project</h1>

          <div className="search-bar">
            <form action="" className="search-form">
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
                      <button
                        className="btn search-btn"
                        onClick={() => {
                          window.location.href = `/search-results?q=${searchQuery}`;
                        }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <h5>FREE ACCESS TO LAW</h5>

          <div>
            <a href="#!" className="link-light">
              Advanced Search <br />
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </a>
          </div>
        </div>

        <div className="adv-search-body mt-5 vh-100">
          <div className="container">
            <div className="row align-items-center">
              <h6>Search by Category</h6>
              <div className="col-12 col-md-6">
                <select className="form-select" id="search-categories">
                  <option>All Categories</option>
                  <option>Constitutions</option>
                  <option>Statutes</option>
                  <option>Executive Issuances</option>
                  <option>Judicial Issuances</option>
                  <option>Other Judicial Issuances</option>
                  <option>Other Issuances</option>
                  <option>Jurisprudence</option>
                  <option>International Legal Resources</option>
                  <option>AUSL Exclusive</option>
                </select>
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0">
              <div className="search-bar">
                <form action="" className="search-form">
                  <div className="form-group has-feedback">
                    <div className="input-group my-5">
                      <input type="text" className="form-control search-form-control" placeholder="Search Keywords" aria-label="Search Bar" />
                      <div className="input-group-append">
                        <Link to={`/search-results?q=${searchQuery}`} className="btn search-btn">
                          <FontAwesomeIcon icon={faSearch} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
