import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SearchResults from './SearchResults';
import CategoryCheckbox from './CategoryCheckbox';

const categories = [
  { label: 'All Categories (Default)', value: 'All' },
  { label: 'Constitutions', value: 'Constitutions' },
  { label: 'Statutes', value: 'Statutes' },
  { label: 'Executive Issuances', value: 'Executive Issuances' },
  { label: 'Judicial Issuances', value: 'Judicial Issuances' },
  { label: 'Other Judicial Issuances', value: 'Other Judicial Issuances' },
  { label: 'Other Issuances', value: 'Other Issuances' },
  { label: 'Jurisprudence', value: 'Jurisprudence' },
  { label: 'International Legal Resources', value: 'International Legal Resources' },
  { label: 'AUSL Exclusive', value: 'AUSL Exclusive' },
];

const SearchResultsPage = ({ hostUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  useEffect(() => {
    // Extract searchType and selectedCategories from query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('searchQuery');
    const selectedCategories = searchParams.getAll('selectedCategories');

    // log the variables to console first
    console.log('SearchResultsPage Search query:', searchQuery);
    console.log('SearchResultsPage Selected categories:', selectedCategories);

    // Fetch search results based on the query, searchType, and selectedCategories
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php`, {
      params: {
        searchQuery: searchQuery,
        selectedCategories: selectedCategories, // Pass an array of selected categories
      },
    })
      .then((response) => {
        // Handle the successful response
        setSearchResults(response.data);
        console.log('SearchResultsPage Search results:', response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      });
  }, [hostUrl, location.search, selectedCategories]);


  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;

    // log the variables to console first
    console.log('Search query:', searchQuery);
    console.log('Selected categories:', selectedCategories);

    // build the URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('searchQuery', searchQuery);
    selectedCategories.forEach((category) => {
      queryParams.append('selectedCategories[]', category); // Use '[]' to send an array of selected categories
    });

    // log the built URL full
    console.log('URL:', `/search-results/?${queryParams.toString()}`);

    // Use navigate with the built URL
    navigate(`/search-results/?${queryParams.toString()}`);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCategories((prevCategories) => {
      if (category === 'All') {
        // If 'All Categories' is checked, clear other selections
        return isChecked ? ['All'] : [];
      } else {
        if (isChecked) {
          // Uncheck 'All Categories' if any other category is checked
          return prevCategories.includes('All') ? prevCategories.filter((c) => c !== 'All') : [...prevCategories, category];
        } else {
          // If unchecking a category, remove it from selectedCategories
          return prevCategories.filter((prevCategory) => prevCategory !== category);
        }
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            
            <h6>Filter by:</h6>

            {/* Checkbox items for categories */}
            {categories.map((category) => (
              <CategoryCheckbox
                key={category.value}
                label={category.label}
                value={category.value}
                checked={selectedCategories.includes(category.value)}
                onChange={handleCategoryChange}
              />
            ))}

            {/* <button type="button" className="btn">
              Apply Filters
            </button> */}

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
