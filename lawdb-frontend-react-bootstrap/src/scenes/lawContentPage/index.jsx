import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/general.css';
import '../../styles/content.css';

/* Law Content Checklist:
 * [ ] Connect to the database to fetch the law content using: lawId, lawTitle, headings, sections, content
 * [ ] Fix up the properties to match the database/ERD - if possible (again, mb!)
 * [?] is only having index.jsx for lawContent enough - should there be a separate jsx for something?
*/

const LawContentPage = () => {
  const { lawId } = useParams();
  const [lawContent, setLawContent] = useState(null);

  useEffect(() => {
    // Dummy data for now - populate with actual data from the database!

    const dummyLawData = [
        {
          lawId: 1,
          lawTitle: 'Sample Law Title 1',
          headings: [
            {
              headingTitle: 'Sample Heading 1',
              sections: [
                {
                  content: 'Section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus. Ornare aenean euismod elementum nisi quis eleifend quam.',
                },
                {
                  content: ' Section 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus. Ornare aenean euismod elementum nisi quis eleifend quam.',
                },
              ],
            },
            {
                headingTitle: 'Sample Heading 2',
                sections: [
                  {
                    content: 'Section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus. Ornare aenean euismod elementum nisi quis eleifend quam.',
                  },
                  {
                    content: ' Section 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus. Ornare aenean euismod elementum nisi quis eleifend quam.',
                  },
                ],
              },
          ],
        },
      ];
  
    // Find the law with the matching lawId
    const selectedLaw = dummyLawData.find((law) => law.lawId === parseInt(lawId));
  
    // Set the law content based on the selected law
    setLawContent(selectedLaw);
  }, [lawId]);
  

  if (!lawContent) {
    return <div className="container-fluid d-flex align-items-center justify-content-center text-center">
      <div>
        <img src="/logo.png" className="loading-logo mb-5" alt="LawPhil Logo" />
        <h5>Loading...</h5>
      </div>
    </div>;
  }

    // Function to find and replace the "Section <number>." pattern with bold text
    const highlightSections = (content) => {
        const sectionPattern = /Section \d+\./g;
        return content.replace(sectionPattern, (match) => `<strong>${match}</strong>`);
    };

  return (
    <div className="container law-content">
      <h2 className="mb-3">{lawContent.lawTitle}</h2>

      {/* Loop through headings and sections and display heading and content */}

      {lawContent.headings.map((heading, headingIndex) => (
        <div key={headingIndex}>
          <h5 className="my-5">{heading.headingTitle.toUpperCase()}</h5>

          {/* Loop through sections and display content */}

          {heading.sections.map((section, sectionIndex) => (
            <p className="px-5" key={sectionIndex} dangerouslySetInnerHTML={{ __html: highlightSections(section.content) }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LawContentPage;