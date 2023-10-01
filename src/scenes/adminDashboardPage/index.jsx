/**
 * The AdminDashboard component is a React component that manages the state and functionality for an
 * admin dashboard interface.
 * @returns The AdminDashboard component is being returned.
 */

// index.jsx - AdminDashboard index component

import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/admin.css';
import Form from './Form';
import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 8;

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const AdminDashboard = ({ hostUrl }) => {
  const initialState = {
    laws: [],
    selectedLaw: null,
    editMode: false,
    editedLaw: null,
    showSavedNotification: false,
    currentPage: 1,
    createMode: false,
    lawChangeState: [false],
    showDeleteAlert: false,
  };
  
  const [state, setState] = useState(initialState);

  const {
    laws,
    selectedLaw,
    editMode,
    editedLaw,
    showSavedNotification,
    currentPage,
    createMode,
    lawChangeState
  } = state;

  // UPDATE MULTIPLE STATE PROPERS IN A SINGLE CALL
  const setFormState = (updatedState) => {
    setState((prevState) => ({ ...prevState, ...updatedState }));
  }

  // READ (FETCH ALL LAWS)
  useEffect(() => {
    const fetchLaws = async () => {
      const data = await fetchData(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getAllLaws.php`);
      setFormState({
        laws: data,
        lawChangeState: false
      });
    };

    fetchLaws();
  }, [hostUrl, lawChangeState]);

  // CREATE/UPDATE LAW
  const handleSaveChanges = () => {
    const isNewLaw = editedLaw.id === undefined;

    const requestBody = {
      ...editedLaw,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    const url = isNewLaw ? `${hostUrl}/LawPhil2.0_Server/lawCRUD/createLaw.php` : `${hostUrl}/LawPhil2.0_Server/lawCRUD/updateLaw.php`;

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData) {
            console.log(jsonData);

            if (isNewLaw) {
              setFormState({
                laws: [...laws, jsonData],
                lawChangeState: true,
              });
            } else {
              setFormState({
                laws: laws.map((lawItem) => (lawItem.id === editedLaw.id ? editedLaw : lawItem)),
                lawChangeState: true,
              });
            }

            setFormState({
              showSavedNotification: true,
              editMode: false,
              editedLaw: null,
            });
          } else {
            console.error('Frontend: Received empty JSON response from the server.');
          }
        } catch (error) {
          console.error('Frontend: Error parsing JSON response:', error);
        }
      })
      .catch((error) => {
        console.error('Frontend: Error updating law:', error);
      });
  };

  // DELETE LAW
  const handleDeleteLaw = () => {
    console.log("handleDeleteLaw called");
  
    if (!selectedLaw || !selectedLaw.id) return;
  
    const url = `${hostUrl}/LawPhil2.0_Server/lawCRUD/deleteLaw.php?id=${selectedLaw.id}`;
    
    const requestOptions = {
      method: 'DELETE',
    };
  
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.message) {
        setFormState({
          laws: laws.filter((law) => law.id !== selectedLaw.id),
          selectedLaw: null,
          showSavedNotification: true,
          showDeleteAlert: true,
        });
      }
    })
    .catch((error) => console.error('Frontend handleDeleteLaw error:', error));
    };

  // SELECT LAW AND SHOW IT ON THE FORM
  const handleLawClick = (law, e) => {
    e.preventDefault();
    if (createMode || selectedLaw !== law) {
      setFormState({
        selectedLaw: law,
        editedLaw: { ...law },
        createMode: false,
        editMode: false,
      });
    } else {
      setFormState((prevState) => ({ editMode: !prevState.editMode }));
    }
  }

  // CLEAR FORM TO CREATE NEW LAW
  const handleCreateLaw = () => {
    setFormState({
      selectedLaw: null,
      editedLaw: {
        title: '',
        category: '',
        content: '',
      },
      createMode: true,
      editMode: false,
    });
  };

  const handleCancelEdit = () => {
    setFormState({
      editedLaw: selectedLaw,
      editMode: false,
    });
  };

  // PAGINATION
  const handlePaginationClick = (pageNumber) => {
    setFormState({ currentPage: pageNumber });
  };

  const totalPages = Math.ceil(laws.length / ITEMS_PER_PAGE);
  const showPrevious = currentPage > 1;
  const showNext = currentPage < totalPages;

return (
  <Form
    laws={laws}
    selectedLaw={selectedLaw}
    editMode={editMode}
    editedLaw={editedLaw}
    showSavedNotification={showSavedNotification}
    currentPage={currentPage}
    createMode={createMode}
    lawChangeState={lawChangeState}
    handleLawClick={handleLawClick}
    handleCancelEdit={handleCancelEdit}
    handlePaginationClick={handlePaginationClick}
    handleCreateLaw={handleCreateLaw}
    handleSaveChanges={handleSaveChanges}
    handleDeleteLaw={handleDeleteLaw}
    setFormState={setFormState}
    totalPages={totalPages}
    showPrevious={showPrevious}
    showNext={showNext}
  />
);
}

export default AdminDashboard;