import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LawModal from './LawModal'; 

const LawList = ({ hostUrl, lawsInCategory, activeCategoryName }) => {
  const ellipsisStyle = {
    width: 'auto',
  };

  const [selectedLaw, setSelectedLaw] = useState(null);
  const [selectedLawContent, setSelectedLawContent] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (law) => {
    // log law to console
    console.log('Law clicked:', law);

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
        <span className="title fs-4">{activeCategoryName}</span>
      </div>

      <ul className="list-group list-group-flush">
        {lawsInCategory.map((law) => (
          <li className="align-items-center py-3 list-group-item d-flex justify-content-between" key={law.id}>
            <div className="container">
              <div className="row">
                <div className="col-md-11">
                  <h3>{law.title}</h3>
                </div>
                <div className="col-md-1 d-flex justify-content-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-link"
                      type="button"
                      id={`dropdownMenuButton-${law.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={ellipsisStyle}
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${law.id}`}>
                      <li>
                        <button className="dropdown-item" 
                          onClick={() => toggleModal(law)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        {/* Add your delete functionality here */}
                        <button className="dropdown-item" 
                          // onClick={() => handleDeleteLaw(law.id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
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
          handleSaveChanges={handleSaveChanges} 
          handleCloseModal={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default LawList;