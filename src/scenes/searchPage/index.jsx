import React, { useState } from 'react';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({ hostUrl }) => {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState('All');

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;
    
    // log the variables to console first
    console.log('SearchPage Search query:', searchQuery);
    console.log('SearchPage Selected category:', selectedCategories);

    // build the URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('searchQuery', searchQuery);
    queryParams.append('selectedCategories', selectedCategories);

    // log the built URL full
    console.log('SearchPage URL:', `/search-results/?${queryParams.toString()}`);

    navigate(`/search-results/?${queryParams.toString()}`);
  };

  return (
    <div>
      <Form
        handleSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchPage;