import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

const SearchResultsPage = () => {
  // State to hold the search results
  const [searchResults, setSearchResults] = useState([]);

  // Simulate fetching search results from an API
  useEffect(() => {
    // For this example, let's assume searchResults is populated with some dummy data.
    const dummyResults = ['Result 1', 'Result 2', 'Result 3'];
    setSearchResults(dummyResults);
  }, []);

  return (
    <div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchResultsPage;
