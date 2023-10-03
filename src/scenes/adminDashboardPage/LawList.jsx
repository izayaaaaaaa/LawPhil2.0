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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const toggleModal = (law) => {
    // Fetch the law content when the ellipsis button is clicked
    axios.get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getLawContent.php?lawID=${law.id}`)
      .then((response) => {
        console.log(response.data);
        setSelectedLawContent(response.data);
        setSelectedLaw(law);
        setIsModalOpen(true); // Open the modal
      })
      .catch((error) => console.error('Error fetching law content:', error));
  };
  
  const handleEditLaw = () => {
    // Handle the "Edit Law" functionality within the LawList component
    // For example, you can open an edit form or perform other actions here.
    console.log('Edit Law clicked for:', selectedLaw);
    // Close the modal
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  
  return (
    <div className="col-md-9" id="listbar">
      <div className="card">
        <div className="card-header p-3">
          <span className="fs-4">{activeCategoryName}</span>
        </div>
        <ul className="px-3 list-group list-group-flush">
          {laws.map((law) => (
            <li className="py-3 list-group-item d-flex justify-content-between" key={law.id}>
              <span>{law.title}</span>
              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-link" 
                  onClick={() => toggleModal(law)} 
                  style={ellipsisStyle}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <LawModal
          activeCategoryName={activeCategoryName}
          selectedLawContent={selectedLawContent}
          handleEditLaw={handleEditLaw}
          handleCloseModal={handleCloseModal}
          show={isModalOpen}
        />
      )}
    </div>
  );
};

export default LawList;