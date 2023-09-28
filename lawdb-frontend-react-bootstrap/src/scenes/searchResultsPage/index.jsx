import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

const SearchResultsPage = ({ hostUrl }) => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    // Extract searchType and selectedCategory from query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('searchQuery');
    const searchType = searchParams.get('searchType');
    const selectedCategory = searchParams.get('selectedCategory');

    console.log('Search query:', searchQuery);
    console.log('Search type:', searchType);
    console.log('Selected category:', selectedCategory);

    // Fetch search results based on the query, searchType, and selectedCategory
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/searchKeywordLaw.php`, {
      params: {
        searchQuery: searchQuery,
        searchType: searchType,
        selectedCategory: selectedCategory,
      },
    })
      .then((response) => {
        // Handle the successful response
        console.log('Search query:', searchQuery);
        console.log('Search type:', searchType);
        console.log('Selected category:', selectedCategory);
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
  }, [hostUrl, location.search]);

  return (
    <div>
      <SearchResults results={searchResults} />
    </div>
  );
}

export default SearchResultsPage;