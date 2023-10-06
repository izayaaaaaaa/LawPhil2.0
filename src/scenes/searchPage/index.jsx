import React, { useCallback } from 'react';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({ hostUrl }) => {
  const navigate = useNavigate();

  const handleSearch = useCallback((event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;
    
    // console.log('SearchPage Search query:', searchQuery);

    const queryParams = new URLSearchParams();
    queryParams.append('searchQuery', searchQuery);

    console.log('SearchPage URL:', `/search-results/?${queryParams.toString()}`);

    navigate(`/search-results/?${queryParams.toString()}`);
  }, [navigate]);

  return (
    <div>
      <Form
        handleSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchPage;