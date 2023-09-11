import React, { useState, useEffect } from 'react';
import Form from './Form';
import SearchResults from './SearchResults';
import '../../styles/general.css';
import '../../styles/search.css';

// searchPage index.jsx

/* Search Checklist:
 * [ ] Revisit Advanced Search to see if the search results can be filtered using the dropdown menu
 * [ ] 
*/

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Search request failed');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error while searching:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Example: Fetch search results for the query 'yourQuery'
    fetchSearchResults('yourQuery');
  }, []);

  const handleSearch = (query) => {
    // Call the fetchSearchResults function when the search form is submitted
    fetchSearchResults(query);
  };

  return (
    <div>
      <Form onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SearchResults data={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;