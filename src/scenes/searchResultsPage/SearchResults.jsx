import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/search.css';
import '../../styles/searchResults.css';

// Helper function to remove HTML tags from content
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

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
                  <p className="small-text "><b>Category:</b> {item.category} (<span className="subcategory">{item.subcategory}</span>)</p>
                  {/* Remove HTML formatting from law.desc content */}
                  <p className="law-desc">{stripHtmlTags(item.content)}</p>
                  <Link to={`/law-content/${item.id}`} className="link-style">
                    Read More
                  </Link>
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