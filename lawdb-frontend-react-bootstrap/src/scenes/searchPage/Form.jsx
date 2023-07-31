import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

/* Search Checklist:
 * [ ] Revisit Advanced Search to see if the search results can be filtered using the dropdown menu
 * [ ] Implement search functionality (search bar and advanced search) via searchQuery state or something else
 * [ ] Connect to the database to fetch the search results using: lawId, lawTitle, lawDescription, keywords (might not match ERD - mb!)
 * [ ] Change the redirects for the search bar/adv search bar inputs (text input & search button) - take note that there are TWO search bars
*/

const Form = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
            <form action="" className="search-form">
              <div className="form-group has-feedback">
                <div className="input-group my-5">

                  {/* Fix search functionality here: */}
                  
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

          <h5>FREE ACCESS TO LAW</h5>

          <div className="mt-3 pt-5">
            <a href="#adv-search" className="link-light">
              Advanced Search <br />
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </a>
          </div>
        </div>

        {/* Advanced Search */}
        <div id="adv-search" className="adv-search-body flex-grow-1 vh-100">
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

                      {/* Fix adv search functionality (+category dropdown from lines 59-70) here: */}

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
  );
};

export default Form;
