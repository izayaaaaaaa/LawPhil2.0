import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const NewLawModal = ({ show, handleClose }) => {
  const [lawTitle, setLawTitle] = useState('');
  const [lawCategory, setLawCategory] = useState('');

  const handleTitleChange = (e) => {
    setLawTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setLawCategory(e.target.value);
  };

  const handleSaveClick = () => {
    // Add your logic here to save the new law with lawTitle and lawCategory
    // You can make an API call to save the law data to your backend
    // After saving, you can close the modal.
    // Example: axios.post('/api/create-law', { title: lawTitle, category: lawCategory })
    //   .then(() => {
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.error('Error creating a new law:', error);
    //   });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Law</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="lawTitle" className="form-label">Law Title</label>
          <input type="text" className="form-control" id="lawTitle" value={lawTitle} onChange={handleTitleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="lawCategory" className="form-label">Law Category</label>
          <select className="form-select" id="lawCategory" value={lawCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {/* Map your lawCategories to options */}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewLawModal;
