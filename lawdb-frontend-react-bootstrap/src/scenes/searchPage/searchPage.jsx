import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Form from './Form';
import SearchResults from '../searchResultsPage/SearchResults';
import '../../styles/general.css';
import '../../styles/search.css';

// searchPage.jsx

const SearchPage = ({ hostUrl }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = useCallback(async () => {
    try {
      console.log('Fetching with query:', searchQuery);
      const response = await axios.get(`${hostUrl}/LawPhil2.0_Server/search.php?q=${searchQuery}`);
      console.log('Response:', response);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  }, [searchQuery, hostUrl]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Form onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchPage;