import React from 'react';
import '../../styles/general.css';
import '../../styles/searchResults.css';

const SearchResults = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        <>
          {/* Display the number of results */}
          <p className="results-found ml-5">{data.length} results found.</p>

          {/* Loop through the search results */}
          {data.map((item, index) => (
            <div className="law-item" key={index}>
              <div className="px-5 py-4">
                <h5>{item.lawTitle.toUpperCase()}</h5>
                <div>
                  <p className="law-desc">{item.description}</p>
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