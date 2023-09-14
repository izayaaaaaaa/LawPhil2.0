// adminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../styles/general.css';
import '../../styles/admin.css';

const ITEMS_PER_PAGE = 7;

const AdminDashboard = ({ hostUrl }) => {
  const [laws, setLaws] = useState([]); // list of laws
  const [selectedLaw, setSelectedLaw] = useState(null); // currently selected law item
  const [editMode, setEditMode] = useState(false); // determines whether the component is in edit mode
  const [editedLaw, setEditedLaw] = useState(null);
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [createMode, setCreateMode] = useState(false); // Add create mode state
  const [lawChangeState, setChangeBool] = useState([false]); // var to change when the laws state changes

  // Function to delete a law by its ID
  const handleDeleteLaw = () => {
    if (!selectedLaw || !selectedLaw.id) {
      console.error('Cannot delete law: No selected law or ID available.');
      return;
    }

    // Send a DELETE request to delete the law from the server
    fetch(`${hostUrl}/LawPhil2.0_Server/crud.php?action=deleteLaw&id=${selectedLaw.id}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.message) {
        // Remove the deleted law from the local laws state
        setLaws((prevLaws) => prevLaws.filter((law) => law.id !== selectedLaw.id));
        // Clear the selectedLaw state
        setSelectedLaw(null);
        // Show a success message or handle it as needed
        console.log(data.message);
      } else if (data && data.error) {
        console.error('Frontend: ' + data.error);
        // Handle the error message from the server
      } else {
        console.error('Frontend: Received unexpected response from the server.');
        // Handle unexpected response gracefully, e.g., display an error message
      }
    })
    .catch((error) => {
      console.error('Frontend: Error deleting law:', error);
      // Handle the deletion error gracefully, e.g., display an error message
    });
  };


  // fetch laws data from the server 
  useEffect(() => { // runs when the component is mounted
    fetch(`${hostUrl}/LawPhil2.0_Server/crud.php?action=getLaws`)
      .then((response) => response.json()) // parses the response body as JSON -> data
      .then((data) => {
        setLaws(data); // update the laws state with the fetched data; "laws" will now hold "data" 
        setChangeBool(false); 
      })
      .catch((error) => console.error('Error fetching laws:', error));
  }, [hostUrl, lawChangeState]); // re-run this effect when the hostUrl changes

  // Handle law selection
  const handleLawClick = (law, e) => {
    e.preventDefault(); // Prevent the default link behavior

    if (createMode || selectedLaw !== law) {
      // If you're in "Create New Law" mode and click on an existing law,
      // switch back to displaying the law content with the edit form.
      setCreateMode(false);
      setSelectedLaw(law);
      setEditMode(false);
      setEditedLaw({ ...law });
    } else {
      setEditMode((prevEditMode) => !prevEditMode);
    }
  };

  // Handle create new law
  const handleCreateNewLaw = () => {
    // Clear selectedLaw and set createMode to true
    setSelectedLaw(null);
    setCreateMode(true);
    setEditMode(false);
    setEditedLaw({
      title: '', // Initialize with empty values
      category: '',
      content: '',
    });
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Check if it's a new law or an existing one
    const isNewLaw = editedLaw.id === undefined;
  
    // Prepare the request body
    const requestBody = {
      action: isNewLaw ? 'createLaw' : 'updateLaw',
      ...editedLaw,
    };
  
    // Update the law on the server
    fetch(`${hostUrl}/LawPhil2.0_Server/crud.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.text())
      .then((data) => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData) {
            console.log(jsonData);
  
            if (isNewLaw) {
              // If it's a new law, add it to the local laws state
              setLaws((prevLaws) => [...prevLaws, jsonData]);
              setChangeBool(true); // var is changed
            } else {
              // Update the local laws state with the edited law data
              setLaws((prevLaws) =>
                prevLaws.map((law) => (law.id === editedLaw.id ? editedLaw : law))
              );
              setChangeBool(true); // var is changed
            }
  
            // Show the saved notification
            setShowSavedNotification(true);
            // Exit edit mode after saving changes
            setEditMode(false);
  
            // Clear the editedLaw state
            setEditedLaw(null);
          } else {
            console.error('Frontend: Received empty JSON response from the server.');
            // Handle the empty response gracefully, e.g., display an error message
          }
        } catch (error) {
          console.error('Frontend: Error parsing JSON response:', error);
          // Handle the JSON parsing error gracefully, e.g., display an error message
        }
      })
      .catch((error) => {
        console.error('Frontend: Error updating law:', error);
      });
  };

  const handleCancelEdit = () => {
    // Revert any changes made to the editedLaw state
    setEditedLaw(selectedLaw);
    // Exit edit mode
    setEditMode(false);
  };

  // Pagination
  // Calculate the index of the first and last law item to display on the current page
  const indexOfLastLaw = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstLaw = indexOfLastLaw - ITEMS_PER_PAGE;
  const currentLaws = laws.slice(indexOfFirstLaw, indexOfLastLaw);

  // Handle pagination button click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="row law-container">
        {/* Law List */}
        <div className="col-md-3 law-list">
          <div className="d-flex mx-auto justify-content-center">
            <button type="button" className="btn law-btn" onClick={handleCreateNewLaw}>
              <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
              Add New Law
            </button>
          </div>
          {/* List of laws */}
          <ul className="list-group mt-3">
            {currentLaws.map((law) => (
              <li
                key={law.id}
                className={`list-group-item${selectedLaw === law ? ' active' : ''}`}
                onClick={(e) => handleLawClick(law, e)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span>{law.title}</span>
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
            <div className="d-flex justify-content-center mt-3">
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
        </div>

        {/* Law Details */}
        <div className="col-md-8 law-details">
          {selectedLaw && !createMode && (
            // Display law content without edit form
            <>
              {!editMode ? (
                // Display law content without edit form
                <>
                  <p className="ml-4 mt-1">Details</p>
                  <hr />
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={editedLaw?.title || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={editedLaw?.category || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, category: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Content
                      </label>
                      <textarea
                        className="form-control"
                        id="content"
                        rows="4"
                        value={editedLaw?.content || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, content: e.target.value })}
                      />
                    </div>
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
                  <p className="ml-4 mt-1">Edit Law</p>
                  <hr />
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={editedLaw?.title || ''}
                        onChange={(e) => setEditedLaw({ ...editedLaw, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={editedLaw?.category || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, category: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Content
                      </label>
                      <textarea
                        className="form-control"
                        id="content"
                        rows="4"
                        value={editedLaw?.content || ''}
                        readOnly={!editMode}
                        onChange={(e) => setEditedLaw({ ...editedLaw, content: e.target.value })}
                      />
                    </div>
                  </form>
                  <div className="ml-4 mt-1 mb-0 d-flex justify-content-start">
                    <button
                      type="button"
                      className="btn law-btn"
                      onClick={handleDeleteLaw}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mx-2" />
                      Delete Law
                    </button>
                  </div>
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
                <div className="alert alert-dismissible alert-success" role="alert">
                  Changes have been saved!
                </div>
              )}
            </>
          )}

          {createMode && (
            // Create new law form
            <>
              <p className="ml-4 mt-1">Create New Law</p>
              <hr />
              <form>
                <div className="mb-3">
                  <label htmlFor="createTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="createTitle"
                    value={editedLaw?.title || ''}
                    onChange={(e) => setEditedLaw({ ...editedLaw, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="createCategory" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="createCategory"
                    value={editedLaw?.category || ''}
                    onChange={(e) => setEditedLaw({ ...editedLaw, category: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="createContent" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="createContent"
                    rows="4"
                    value={editedLaw?.content || ''}
                    onChange={(e) => setEditedLaw({ ...editedLaw, content: e.target.value })}
                  />
                </div>
              </form>
              {/* Save and Cancel buttons for create mode */}
              <div className="d-flex justify-content-end my-3">
                <button
                  type="button"
                  className="btn edit-btn me-2"
                  onClick={() => setCreateMode(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn save-btn" onClick={handleSaveChanges}>
                  Save Law
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
