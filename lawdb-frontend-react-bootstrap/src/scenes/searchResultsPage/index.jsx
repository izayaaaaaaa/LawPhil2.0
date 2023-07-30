import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

/* Search Results Checklist:
 * [ ] Connect to the API/database to fetch the search results
 * [ ] 
*/

const SearchResultsPage = () => {
  // State to hold the search results
  const [searchResults, setSearchResults] = useState([]);

  // Simulate fetching search results from an API
  useEffect(() => {
    const dummyResults = [
      { lawTitle: 'Result 1', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        keywords: ['Keyword 1', 'Keyword 2'] },
      { lawTitle: 'Result 2', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant morbi. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Placerat duis ultricies lacus sed.', 
        keywords: ['Keyword 3', 'Keyword 4'] },
      { lawTitle: 'Result 3', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Velit dignissim sodales ut eu sem integer.', 
        keywords: ['Keyword 1', 'Keyword 2'] },
      { lawTitle: 'Result 4', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant morbi. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Placerat duis ultricies lacus sed.', 
        keywords: ['Keyword 3', 'Keyword 4'] },
    ];
    setSearchResults(dummyResults);
  }, []);

  return (
    <div>
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchResultsPage;
