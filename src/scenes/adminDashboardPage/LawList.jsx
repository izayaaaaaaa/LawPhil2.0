import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LawModal from './LawModal'; 

const LawList = ({ hostUrl, lawsInCategory, activeCategoryName, setLawsInCategory }) => {
  const ellipsisStyle = {
    width: 'auto',
  };

  const [selectedLaw, setSelectedLaw] = useState(null);
  const [selectedLawContent, setSelectedLawContent] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (law) => {
    console.log('Law clicked:', law);

    axios
    .get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getLawContent.php?lawID=${law.id}`)
    .then((response) => {
      console.log(response.data);
      setSelectedLawContent(response.data);
      setSelectedLaw(law);
      setEditedContent(response.data.content);
      setIsModalOpen(true);
    })
    .catch((error) => console.error('Error fetching law content:', error));
  };
  
  const handleSaveChanges = (editedContent) => {
    axios
    .put(`${hostUrl}/LawPhil2.0_Server/lawCRUD/updateLawContent.php`, {
      id: selectedLaw.id,
      content: editedContent,
    })
    .then((response) => {
      console.log(response.data);
      // Handle success response
    })
    .catch((error) => {
      console.error('Error updating law content:', error);
      // Handle error response
    });

    setIsModalOpen(false);
  };

  const handleDeleteLaw = (lawId) => {
    axios
      .delete(`${hostUrl}/LawPhil2.0_Server/lawCRUD/deleteLaw.php?id=${lawId}`)
      .then((response) => {
        console.log(response.data);
        // Handle success response
        setLawsInCategory((prevLaws) =>
          prevLaws.filter((law) => law.id !== lawId)
        );
      })
      .catch((error) => {
        console.error('Error deleting law:', error);
        // Handle error response
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                        <button className="dropdown-item" onClick={() => toggleModal(law)}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => handleDeleteLaw(law.id)}>
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
          activeSubcategoryName={selectedLaw.subcategory}
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