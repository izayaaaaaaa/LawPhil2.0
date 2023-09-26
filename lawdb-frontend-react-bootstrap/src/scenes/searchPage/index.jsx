import React from 'react';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';
import { useNavigate } from 'react-router-dom';

// searchPage.jsx

const SearchPage = ({ hostUrl }) => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value;
    console.log('Input:', searchQuery)
    navigate(`/search-results/${searchQuery}`);
  };

  return (
    <div>
      <Form handleSubmit={handleSearch} />
    </div>
  );
};

export default SearchPage;