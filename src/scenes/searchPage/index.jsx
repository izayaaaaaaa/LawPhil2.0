import React, { useState } from 'react';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({ hostUrl }) => {
  const navigate = useNavigate();

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

  return (
    <div>
      <Form
        handleSubmit={handleSearch}
        searchType={searchType}
        setSearchType={setSearchType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default SearchPage;