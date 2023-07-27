import React from 'react';
// import ReactDOM from 'react-dom';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';

const SearchPage = () => {
  /* 
  const handleSearch = (query) => {
    // Perform the search using the query.
    // You can make an API call or implement your search logic here.
    console.log('Perform search for:', query);
  };
 */
  return (
    <div className="search-bg">
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <Form className="text-center"/>
        </div>
    </div>
  );
};

export default SearchPage;