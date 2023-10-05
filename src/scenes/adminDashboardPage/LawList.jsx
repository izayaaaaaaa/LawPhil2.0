import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LawModal from './LawModal'; 

const LawList = ({ laws, activeCategoryName, hostUrl }) => {
  const ellipsisStyle = {
    width: 'auto',
  };

  const [selectedLaw, setSelectedLaw] = useState(null);
  const [selectedLawContent, setSelectedLawContent] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (law) => {
    // Fetch the law content when the ellipsis button is clicked
    axios
      .get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getLawContent.php?lawID=${law.id}`)
      .then((response) => {
        console.log(response.data);
        setSelectedLawContent(response.data);
        setSelectedLaw(law);
        setEditedContent(response.data.content); // Initialize editedContent with the existing content
        setIsModalOpen(true); // Open the modal
      })
      .catch((error) => console.error('Error fetching law content:', error));
  };
  
  const handleSaveChanges = (editedContent) => {
    // Handle saving changes here, you can make an API call to update the content
    console.log('Save Changes clicked for:', selectedLaw);

    // Close the modal
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  
  return (
    <div className="d-flex flex-column flex-shrink-0 mx-2" id="lawlist">
      <div className="p-3" id="lawlist-title">
        <span className="fs-4">{activeCategoryName}</span>
      </div>

      <ul className="list-group list-group-flush">
        {laws.map((law) => (
          <li className="align-items-center py-3 list-group-item d-flex justify-content-between" key={law.id}>
            <div className="container">
              <div className="row">
                <div className="col-md-11">
                  <span>{law.title}</span>
                </div>
                <div className="col-md-1 d-flex justify-content-end">
                  <button 
                    className="btn btn-link" 
                    onClick={() => toggleModal(law)} 
                    style={ellipsisStyle}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-12">
                <span className="subcategory">{law.subcategory ? law.subcategory : ''}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <LawModal
          show={isModalOpen}  
          activeCategoryName={activeCategoryName}
          lawName={selectedLaw.title}
          selectedLawContent={selectedLawContent}
          editedContent={editedContent}
          onSave={handleSaveChanges} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default LawList;