/* This code is a React component called `LawContentPage`. It is responsible for fetching and
displaying the content of a law based on an ID parameter. */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/content.css';
import Form from './Form';

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
    const fetchLawContent = async () => {
      try {
        const response = await fetch(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getSpecificLaw.php?id=${id}`);

        if (!response.ok) {
          throw new Error(`Error fetching law content: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content;
        const formatted = formatContent(content);
        setLawContent(data);
        setFormattedContent(formatted);
      } catch (error) {
        console.error('Error fetching law content:', error);
      }
    };

    fetchLawContent();
  }, [id, hostUrl]);

  return (
    <Form 
      lawContent={lawContent}
      formattedContent={formattedContent}
    />
  );
};

export default LawContentPage;
