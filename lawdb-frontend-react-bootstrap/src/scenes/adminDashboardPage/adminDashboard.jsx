// adminDashboard.jsx
// show each content upon clicking edit; fix the backend connection with this

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general.css';
import '../../styles/admin.css';

const ITEMS_PER_PAGE = 7;

const AdminDashboard = ({ hostUrl }) => {
  const [laws, setLaws] = useState([]); // list of laws
  const [selectedLaw, setSelectedLaw] = useState(null); // currently selected law item
  const [editMode, setEditMode] = useState(false); // determines whether the component
  const [editedLaw, setEditedLaw] = useState(null);
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch laws data from the server 
  useEffect(() => { // runs when the component is mounted
    fetch(`${hostUrl}/LawPhil2.0_Server/crud.php?action=getLaws`)
      .then((response) => response.json()) // parses the response body as JSON -> data
      .then((data) => setLaws(data)) // update the laws state with the fetched data; "laws" will now hold "data" 
      .catch((error) => console.error('Error fetching laws:', error));
  }, [hostUrl]); // re-run this effect when the hostUrl changes

  // for viewing individual Laws 
  const handleLawClick = (law) => {
    setSelectedLaw(law);
    setEditMode(false);
    setEditedLaw({ ...law });
  };

  const handleSaveChanges = () => {
    // Update the law on the server
    fetch(`${hostUrl}/LawPhil2.0_Server/crud.php?action=updateLaw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedLaw),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the local laws state with the edited law data
        setLaws((prevLaws) =>
          prevLaws.map((law) => (law.id === editedLaw.id ? editedLaw : law))
        );
        // Show the saved notification
        setShowSavedNotification(true);
        // Exit edit mode after saving changes
        setEditMode(false);
      })
      .catch((error) => console.error('Error updating law:', error));
  };

  const handleCancelEdit = () => {
    // Revert any changes made to the editedLaw state
    setEditedLaw(selectedLaw);
    // Exit edit mode
    setEditMode(false);
  };

  // pagination
  // calculate the index of the first and last law item to display on the current page
  const indexOfLastLaw = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstLaw = indexOfLastLaw - ITEMS_PER_PAGE;
  const currentLaws = laws.slice(indexOfFirstLaw, indexOfLastLaw);

  // handle pagination button click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="row law-container">
       {/* Law List */}
        <div className="col-md-3 law-list">
          <div className="d-flex justify-content-end">
            <button type="button" className="btn">
              <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
              Law Content
            </button>
          </div>
          {/* List of laws */}
          <ul className="list-group mt-3">
            {currentLaws.map((law) => (
              <li
                key={law.id}
                className={`list-group-item${selectedLaw === law ? ' active' : ''}`}
                onClick={() => handleLawClick(law)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span>{law.title}</span>
                  <a href="https://lawphil.net/" onClick={(e) => handleLawClick(law, e)} className="ms-2 link-style">
                    Edit
                  </a>
                </div>
                <hr />
              </li>
            ))}
          </ul>
          
          {/* Pagination */}
          <div>
            {Array.from({ length: Math.ceil(laws.length / ITEMS_PER_PAGE) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePaginationClick(index + 1)}
                style={{ margin: '4px' }}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Law Details */}
        <div className="col-md-8 law-details">
          {selectedLaw && (
            <>
              <p className="ml-4 mt-1">Details</p>
              <hr />
              {!editMode ? (
                // Display law content without edit form
                <>
                  {/* Display law details */}
                </>
              ) : (
                // Edit form for the selected law
                <>
                  <form>
                    {/* Form fields for editing */}
                  </form>
                  {/* Save and Cancel buttons */}
                  <div className="d-flex justify-content-end my-3">
                    <button
                      type="button"
                      className="btn edit-btn me-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn save-btn" onClick={handleSaveChanges}>
                      Save Changes
                    </button>
                  </div>
                </>
              )}
              {/* Saved Notification */}
              {showSavedNotification && (
                <div className="alert alert-success" role="alert">
                  Changes have been saved!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;