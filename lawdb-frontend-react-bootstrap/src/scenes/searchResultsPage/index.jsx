import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SearchResults from './SearchResults';

const SearchResultsPage = ({ hostUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('both');
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;

    // log the variables to console first
    console.log('Search query:', searchQuery);
    console.log('Search type:', searchType);
    console.log('Selected categories:', selectedCategories);

    // Build the URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('searchQuery', searchQuery);
    queryParams.append('searchType', searchType);
    selectedCategories.forEach((category) => {
      queryParams.append('selectedCategories', category);
    });

    // log the built URL full
    console.log('URL:', `/search-results/?${queryParams.toString()}`);

    // Use navigate with the built URL
    navigate(`/search-results/?${queryParams.toString()}`);
  };

  useEffect(() => {
    // Extract searchType and selectedCategories from query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('searchQuery');
    const searchType = searchParams.get('searchType');
    const selectedCategories = searchParams.getAll('selectedCategories');

    // Fetch search results based on the query, searchType, and selectedCategories
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php`, {
      params: {
        searchQuery: searchQuery,
        searchType: searchType,
        selectedCategories: selectedCategories, // Pass an array of selected categories
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
    const category = e.target.value;
    const isChecked = e.target.checked;

    if (category === 'all') {
      // If 'All Categories' is checked, clear other selections
      setSelectedCategories(isChecked ? ['all'] : []);
    } else {
      // If other categories are checked, toggle their selection
      setSelectedCategories((prevCategories) => {
        if (isChecked) {
          // Uncheck 'All Categories' if any other category is checked
          return prevCategories.includes('all') ? [category] : [...prevCategories, category];
        } else {
          return prevCategories.filter((prevCategory) => prevCategory !== category);
        }
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h6>Filter by:</h6>
            {/* Checkbox items for categories */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="all"
                id="checkboxAll"
                checked={selectedCategories.includes('all')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxAll">
                All Categories (Default)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="constitutions"
                id="checkboxConstitutions"
                checked={selectedCategories.includes('constitutions')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxConstitutions">
                Constitutions
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="statutes"
                id="checkboxStatutes"
                checked={selectedCategories.includes('statutes')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxStatutes">
                Statutes
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="executiveIssuances"
                id="checkboxExecutiveIssuances"
                checked={selectedCategories.includes('executiveIssuances')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxExecutiveIssuances">
                Executive Issuances
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="judicialIssuances"
                id="checkboxJudicialIssuances"
                checked={selectedCategories.includes('judicialIssuances')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxJudicialIssuances">
                Judicial Issuances
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="otherJudicialIssuances"
                id="checkboxOtherJudicialIssuances"
                checked={selectedCategories.includes('otherJudicialIssuances')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxOtherJudicialIssuances">
                Other Judicial Issuances
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="otherIssuances"
                id="checkboxOtherIssuances"
                checked={selectedCategories.includes('otherIssuances')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxOtherIssuances">
                Other Issuances
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="jurisprudence"
                id="checkboxJurisprudence"
                checked={selectedCategories.includes('jurisprudence')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxJurisprudence">
                Jurisprudence
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="internationalLegalResources"
                id="checkboxInternationalLegalResources"
                checked={selectedCategories.includes('internationalLegalResources')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxInternationalLegalResources">
                International Legal Resources
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="auslExclusive"
                id="checkboxAUSLExclusive"
                checked={selectedCategories.includes('auslExclusive')}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor="checkboxAUSLExclusive">
                AUSL Exclusive
              </label>
            </div>

            <button type="button" className="btn">
              Apply Filters
            </button>

          </div>

          <div className="col-md-10">
            <SearchResults results={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
