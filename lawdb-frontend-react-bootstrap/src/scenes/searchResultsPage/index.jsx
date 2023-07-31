import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

/* Search Results Checklist:
 * [ ] Connect to the database to fetch the search results
 * [ ] Connect to the API/database to fetch the law content
*/

const SearchResultsPage = () => {
  // State to hold the search results
  const [searchResults, setSearchResults] = useState([]);

  // Simulate fetching search results from an API
  useEffect(() => {
    // Dummy data for now - populate with actual data from the database!
    const dummyResults = [
      {
        lawId: 1,
        lawTitle: 'Result 1',
        lawDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        keywords: ['Keyword 1', 'Keyword 2'],
      },
      {
        lawId: 2,
        lawTitle: 'Result 2',
        lawDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant morbi. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Placerat duis ultricies lacus sed.',
        keywords: ['Keyword 3', 'Keyword 4'],
      },
      {
        lawId: 3,
        lawTitle: 'Result 3',
        lawDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        keywords: ['Keyword 1', 'Keyword 2'],
      },
      {
        lawId: 4,
        lawTitle: 'Result 4',
        lawDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque habitant morbi. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Placerat duis ultricies lacus sed.',
        keywords: ['Keyword 3', 'Keyword 4'],
      },
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
