import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../../styles/general.css';
import '../../styles/content.css';

const LawContentPage = ({ hostUrl }) => {
  const { id } = useParams();
  const [lawContent, setLawContent] = useState(null);
  const [formattedContent, setFormattedContent] = useState(null); // Changed variable name

  // Function to find and replace the "Section <number>." pattern with bold text
  const formatContent = (content) => {
    const sectionPattern = /Section \d+\./g;
    return content.replace(sectionPattern, (match) => `<br /><br /><strong>${match}</strong><br />`);
  };

  useEffect(() => {
    // Fetch law content based on the ID
    Axios.get(`${hostUrl}/LawPhil2.0_Server/lawContent.php?id=${id}`)
      .then((response) => {
        // Handle the successful response
        console.log('Law content ID:', id);
        console.log('Law content:', response.data);
        const content = response.data.content;
        const formatted = formatContent(content); // Changed variable name
        setLawContent(response.data);
        setFormattedContent(formatted); // Changed variable name
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

  if (!lawContent) {
    return (
      <div className="container d-flex align-items-center justify-content-center text-center">
        <div>
          <img src="/logo.png" className="loading-logo mb-5" alt="LawPhil Logo" />
          <h5>Loading...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-5 p-5 law-content">
      <h2>{lawContent.title}</h2>
      <p className="small-text"><b>Category:</b> {lawContent.category}</p>
      <p className="mx-5" dangerouslySetInnerHTML={{ __html: formattedContent }}></p> {/* Changed variable name */}
    </div>
  );
};

export default LawContentPage;
