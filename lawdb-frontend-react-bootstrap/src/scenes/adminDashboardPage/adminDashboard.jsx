import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general.css';
import '../../styles/admin.css';

// To delete
import Testing from './testing';
// To delete

/* Checklist for Admin Dashboard:
* [ ] Fix Add Law Content button to be functional
* [ ] Fix Properties to match the database/ERD
* [ ] Fix buttons' functionalities
* [ ] Add Actions menu(?) - from figma
*/

const ITEMS_PER_PAGE = 5;

const AdminDashboard = () => {
  const [laws, setLaws] = useState([]);
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedLaw, setEditedLaw] = useState(null);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  {/* For Pagination */}
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last law item to display on the current page
  const indexOfLastLaw = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstLaw = indexOfLastLaw - ITEMS_PER_PAGE;
  const currentLaws = laws.slice(indexOfFirstLaw, indexOfLastLaw);

  // Handle pagination button click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch laws data from the server using API call
    fetch('http://localhost:3001/api/laws')
      .then((response) => response.json())
      .then((data) => setLaws(data))
      .catch((error) => console.error('Error fetching laws:', error));
  }, []);

  {/* For Viewing Individual Laws */}
  const handleLawClick = (law, event) => {
    setSelectedLaw(law);
    setEditMode(false);
    setEditedLaw({ ...law });
  };  

  {/* For Saving Changes */}
  const handleSaveChanges = () => {
    // Perform API call to save changes to the selected law
    // Use the editedLaw object to update the selected law
    // For simplicity, we will just log the updated law data for now
    console.log('Updated Law Data:', editedLaw);

    // Update the laws state with the edited law data
    setLaws((prevLaws) =>
      prevLaws.map((law) => (law.lawId === editedLaw.lawId ? editedLaw : law))
    );

    // Show the saved notification
    setShowSavedNotification(true);

    // Hide the notification after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setShowSavedNotification(false);
    }, 3000);

    // Exit edit mode after saving changes
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    // Revert any changes made to the editedLaw state
    setEditedLaw(selectedLaw);
    // Exit edit mode
    setEditMode(false);
  };

  return (
    <div className="container">

{/* Testing - delete when connected to db */}
 <Testing setLaws={setLaws} />
{/* End */}

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
                key={law.lawId}
                className={`list-group-item${selectedLaw === law ? ' active' : ''}`}
                onClick={() => handleLawClick(law)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span>{law.lawTitle}</span>
                  <a href="#" onClick={(e) => handleLawClick(law, e)} className="ms-2 link-style">
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
                  <form>
                    <div className="mb-3">
                      <label htmlFor="lawId" className="form-label">
                        Law ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lawId"
                        value={editedLaw?.lawId || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, lawId: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={editedLaw?.lawTitle || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, lawTitle: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="4"
                        value={editedLaw?.lawDescription || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, lawDescription: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="keywords" className="form-label">
                        Keywords
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="keywords"
                        value={editedLaw?.keywords?.join(', ') || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, keywords: e.target.value.split(', ') })}
                      />
                    </div>
                    {/* Loop through headings and sections */}
                    {editedLaw?.headings.map((heading, headingIndex) => (
                      <div key={headingIndex}>
                        <div className="mb-3">
                          <label htmlFor={`heading${headingIndex + 1}`} className="form-label">
                            Heading {headingIndex + 1} Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`heading${headingIndex + 1}`}
                            value={heading.headingTitle}
                            readOnly={!editMode}
                            onChange={(e) =>
                              setEditedLaw({
                                ...editedLaw,
                                headings: [
                                  ...editedLaw.headings.slice(0, headingIndex),
                                  { ...heading, headingTitle: e.target.value },
                                  ...editedLaw.headings.slice(headingIndex + 1),
                                ],
                              })
                            }
                          />
                        </div>
                        {/* Loop through sections */}
                        {heading.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-3">
                            <label htmlFor={`section${headingIndex + 1}.${sectionIndex + 1}`} className="form-label">
                              Section {headingIndex + 1}.{sectionIndex + 1} Content
                            </label>
                            <textarea
                              className="form-control"
                              id={`section${headingIndex + 1}.${sectionIndex + 1}`}
                              rows="3"
                              value={section.content}
                              readOnly={!editMode}
                              onChange={(e) =>
                                setEditedLaw({
                                  ...editedLaw,
                                  headings: [
                                    ...editedLaw.headings.slice(0, headingIndex),
                                    {
                                      ...heading,
                                      sections: [
                                        ...heading.sections.slice(0, sectionIndex),
                                        { ...section, content: e.target.value },
                                        ...heading.sections.slice(sectionIndex + 1),
                                      ],
                                    },
                                    ...editedLaw.headings.slice(headingIndex + 1),
                                  ],
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </form>
                  {/* Edit button */}
                  <div className="d-flex justify-content-end my-3">
                    <button
                      type="button"
                      className="btn edit-btn"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                // Edit form for the selected law
                <>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={editedLaw?.lawTitle || ''}
                        onChange={(e) => setEditedLaw({ ...editedLaw, lawTitle: e.target.value })}
                      />
                    </div>
                    {/* Add more law properties as needed */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="4"
                        value={editedLaw?.lawDescription || ''}
                        onChange={(e) =>
                          setEditedLaw({ ...editedLaw, lawDescription: e.target.value })
                        }
                      />
                    </div>
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