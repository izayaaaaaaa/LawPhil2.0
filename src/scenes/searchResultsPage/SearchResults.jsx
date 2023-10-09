import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/search.css';
import '../../styles/searchResults.css';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        <div>
          {/* Display the number of results */}
          <h6 className="mx-3">{results.length} result(s) found.</h6>

          {/* Loop through the search results */}
          {results.map((item, index) => (
            <div className="law-item" key={index}>
              <div className="px-5 py-4">

                <Link to={`/law-content/${item.id}`} className="link-style">
                  <h5>{item.title.toUpperCase()}</h5>
                </Link>

                <div>
                  <Link to={`/law-content/${item.id}`} className="text-link-style">
                    <p className="law-desc mt-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                  </Link>
                  <div className="mt-4">
                    <span className="search-result-font category">
                      <b>{item.category}</b> 
                    </span>
                    <span className="search-result-font category subcategory">
                      {item.subcategory}
                    </span>
                  </div>
                  
                </div>

              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h6>No Results</h6>
      )}
    </div>
  );
};

export default SearchResults;
