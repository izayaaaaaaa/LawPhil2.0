import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/admin.css';
import AdminForm from './Form';
import React, { useState, useEffect } from 'react';

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

  // update multiple state properties in a single call
  const setFormState = (updatedState) => {
    setState((prevState) => ({ ...prevState, ...updatedState }));
  }

  useEffect(() => {
    const fetchLaws = async () => {
      // FETCH ALL LAWS
      const data = await fetchData(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getAllLaws.php`);
      setFormState({
        laws: data,
        lawChangeState: false
      });
    };

    fetchLaws();
  }, [hostUrl, lawChangeState]);

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

  const handleCancelEdit = () => {
    setFormState({
      editedLaw: selectedLaw,
      editMode: false,
    });
  };

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
      });
    }
  })
  .catch((error) => console.error('Frontend handleDeleteLaw error:', error));
  };


  const handlePaginationClick = (pageNumber) => {
    setFormState({ currentPage: pageNumber });
  }

  return (
    <AdminForm
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
    />
  );
};

export default AdminDashboard;