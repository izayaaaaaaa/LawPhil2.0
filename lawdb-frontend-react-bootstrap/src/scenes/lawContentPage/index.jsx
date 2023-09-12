import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../../styles/general.css';
import '../../styles/content.css';
import SearchResults from '../searchResultsPage/SearchResults';

const LawContentPage = ({ hostUrl }) => {
  const { id } = useParams();
  const [lawContent, setLawContent] = useState(null);

  useEffect(() => {
  // Fetch law content based on the ID
  Axios.get(`${hostUrl}/LawPhil2.0_Server/lawContent.php?id=${id}`)
    .then((response) => {
      // Handle the successful response
      console.log('Law content ID:', id);
      console.log('Law content:', response.data);
      setLawContent(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error('Error fetching law content:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    });
  }, [id, hostUrl]);

  // if (!lawContent) {
  //   return <div className="container-fluid d-flex align-items-center justify-content-center text-center">
  //     <div>
  //       <img src="/logo.png" className="loading-logo mb-5" alt="LawPhil Logo" />
  //       <h5>Loading...</h5>
  //     </div>
  //   </div>;
  // }

  // Function to find and replace the "Section <number>." pattern with bold text
  // const highlightSections = (content) => {
  //     const sectionPattern = /Section \d+\./g;
  //     return content.replace(sectionPattern, (match) => `<strong>${match}</strong>`);
  // };

  return (
    <div>
      {/* <h1>Law Content Page</h1> */}
      {lawContent && (
        <>
          <h2>{lawContent.title}</h2>
          <p><b>Category:</b> {lawContent.category}</p>
          <p>{lawContent.content}</p>
          {/* Display related laws using the SearchResults component */}
          {/* <h3>Related Laws</h3> */}
          {/* <SearchResults results={[lawContent]} /> */}
        </>
      )}
    </div>
  );
};

export default LawContentPage;