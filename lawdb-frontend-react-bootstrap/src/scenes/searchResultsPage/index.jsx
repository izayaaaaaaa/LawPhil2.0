import { useParams } from 'react-router-dom';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

const SearchResultsPage = ({ hostUrl }) => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    // Fetch search results based on the query
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php?q=${query}`)
      .then((response) => {
        // Handle the successful response
        console.log('Search query:', query);
        console.log('Search results:', response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      });
  }, [hostUrl, query]);

  return (
    <div>
      <SearchResults results={searchResults} />
    </div>
  );
}

export default SearchResultsPage;