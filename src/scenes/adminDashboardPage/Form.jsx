/* The above code is a React component called `AdminForm`. It is responsible for rendering a form that
allows the user to create, edit, and delete laws. The component receives several props that control
its behavior and data, such as `laws` (an array of laws), `selectedLaw` (the currently selected
law), `editMode` (a boolean indicating whether the form is in edit mode), `editedLaw` (the law being
edited), and various event handlers for different actions like creating a law, saving changes,
deleting a law, etc. */

// Form.jsx - Admin Dashboard Form Component

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Form = ({
  laws,
  selectedLaw,
  editMode,
  editedLaw,
  showSavedNotification,
  currentPage,
  createMode,
  lawChangeState,
  handleLawClick,
  handleCancelEdit,
  handlePaginationClick, 
  handleCreateLaw,
  handleSaveChanges,
  handleDeleteLaw,
  setFormState,
}) => {

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showSavedNotification) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setFormState({ showSavedNotification: false });
      }, 3000);
    }
  }, [showSavedNotification, setFormState]);

  const ITEMS_PER_PAGE = 8;
  const MAX_PAGES_DISPLAYED = 3;
  const indexOfLastLaw = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstLaw = indexOfLastLaw - ITEMS_PER_PAGE;
  const currentLaws = laws.slice(indexOfFirstLaw, indexOfLastLaw);
  const showPrevious = currentPage > 1;
  const totalPages = Math.ceil(laws.length / ITEMS_PER_PAGE);
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  // Define showNext based on the current page and total pages
  const showNext = currentPage < totalPages;

  return (
    <div className="container">
      <div className="row law-container justify-content-center">
        <div className="col-md-3 law-list">
          
          {/* CREATE LAW */}
          <div className="d-flex mx-auto justify-content-center">
            <button type="button" className="btn law-btn" onClick={handleCreateLaw}>
              <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
              Add New Law
            </button>
          </div>
          
          {/* READ LAWS (LIST OF LAWS) */}
          <ul className="list-group mt-3">
            {currentLaws.map((law) => (
              <li
                key={law.id}
                className={`list-group-item${selectedLaw === law ? ' active' : ''}`}
                onClick={(e) => handleLawClick(law, e)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span>{law.title}</span>
                  <Link to="#" onClick={(e) => handleLawClick(law, e)} className="ms-2 link-style">
                    Edit
                  </Link>
                </div>
                <hr />
              </li>
            ))}
          </ul>

          {/* PAGINATION */}
          <div>
            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={() => handlePaginationClick(currentPage - 1)}
                className="btn page-ctrl-btn"
                disabled={!showPrevious}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePaginationClick(page)}
                  className={`btn page-btn${currentPage === page ? ' active' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePaginationClick(currentPage + 1)}
                className="btn page-ctrl-btn"
                disabled={!showNext}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>

        </div>
        
        <div className="col-md-8 law-details">
          {selectedLaw && !createMode && (
            <>
              {!editMode ? (
                <>
                  <p className="ml-4 mt-3 mb-4">Details</p>
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, title: e.target.value } })}
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, category: e.target.value } })}
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, content: e.target.value } })}
                      />
                    </div>
                  </form>
                  <div className="d-flex justify-content-end my-3">
                    <button
                      type="button"
                      className="btn edit-btn"
                      onClick={() => setFormState({ editMode: true })}
                    >
                      Modify
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <div className="d-flex justify-content-between mb-0">
                    <p className="ml-4 mt-3">Edit Law</p>
                    <button
                      type="button"
                      className="btn btn-link p-0 m-0 link-style"
                      onClick={() => {
                        const confirmed = window.confirm("Are you sure you want to delete this law?");
                        if (confirmed) {
                          handleDeleteLaw();
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mx-2" />
                      Delete Law
                    </button>
                  </div>
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, title: e.target.value } })}
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, category: e.target.value } })}
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
                        onChange={(e) => setFormState({ editedLaw: { ...editedLaw, content: e.target.value } })}
                      />
                    </div>
                  </form>
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
                </div>
              )}
              {showAlert && (
                <div className="alert alert-success" role="alert">
                  Changes have been saved!
                </div>
              )}
            </>
          )}

          {createMode && (
            <>
              <p className="ml-4 mt-3 mb-4">Create New Law</p>
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
                    onChange={(e) => setFormState({ editedLaw: { ...editedLaw, title: e.target.value } })}
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
                    onChange={(e) => setFormState({ editedLaw: { ...editedLaw, category: e.target.value } })}
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
                    onChange={(e) => setFormState({ editedLaw: { ...editedLaw, content: e.target.value } })}
                  />
                </div>
              </form>
              <div className="d-flex justify-content-end my-3">
                <button
                  type="button"
                  className="btn edit-btn me-2"
                  onClick={() => setFormState({ createMode: false })}
                >
                  Cancel
                </button>
                <button type="button" className="btn save-btn" onClick={handleSaveChanges}>
                  Save Law
                </button>
              </div>
              {showAlert && (
                <div className="alert alert-success" role="alert">
                  New law successfully created!
                </div>
              )}  
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Form;