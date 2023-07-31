import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/searchResults.css';

const SearchResults = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        <>
          {/* Display the number of results */}
          <p className="results-found">{data.length} results found.</p>

          {/* Loop through the search results */}
          {data.map((item, index) => (
            <div className="law-item" key={index}>
              <div className="px-5 py-4">
                <Link to={`/law-content/${item.lawId}`} className="link-style">
                  <h5>{item.lawTitle.toUpperCase()}</h5> {/* Redirect to lawContent - via ID */}
                </Link>
                <div>
                  <p className="law-desc">{item.lawDescription}</p>
                  <Link to={`/law-content/${item.lawId}`} className="link-style">
                    Read More
                  </Link>
                  <p className="keywords"><b>Keyword(s):</b> {item.keywords.join(', ')}</p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <p>No Results</p>
      )}
    </div>
  );
};

export default SearchResults;