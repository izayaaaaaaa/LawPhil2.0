import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesomeIcon
import SearchResults from './SearchResults';

const SearchResultsPage = ({ hostUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('both');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;

    // log the variables to console first
    console.log('Search query:', searchQuery);
    console.log('Search type:', searchType);
    console.log('Selected category:', selectedCategory);

    // Build the URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('searchQuery', searchQuery);
    queryParams.append('searchType', searchType);
    queryParams.append('selectedCategory', selectedCategory);

    // log the built URL full
    console.log('URL:', `/search-results/?${queryParams.toString()}`);

    // Use navigate with the built URL
    navigate(`/search-results/?${queryParams.toString()}`);
  };

  useEffect(() => {
    // Extract searchType and selectedCategory from query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('searchQuery');
    const searchType = searchParams.get('searchType');
    const selectedCategory = searchParams.get('selectedCategory');

    // Fetch search results based on the query, searchType, and selectedCategory
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php`, {
      params: {
        searchQuery: searchQuery,
        searchType: searchType,
        selectedCategory: selectedCategory,
      },
    })
      .then((response) => {
        // Handle the successful response
        setSearchResults(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      });
  }, [hostUrl, location.search]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="search-bar p-5">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group has-feedback">
            <div className="input-group search-input">
              <input
                type="text"
                className="form-control search-form-control"
                placeholder="Search Keywords"
                aria-label="Search Bar"
              />
              <div className="input-group-append">
                <button type="submit" className="btn search-btn"> {/* Change the Link component to a button */}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
              {/* Dropdowns */}
              <div className="input-group mt-5 d-flex mx-auto justify-content-center align-items-center">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="form-selection "
                >
                  {/* change into fetched categories */}
                  <option value="all">All Categories</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                  <option value="Category C">Category C</option>
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
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
}

export default SearchResultsPage;
