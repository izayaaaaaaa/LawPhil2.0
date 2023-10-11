// LawModal component

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const LawModal = ({
  show,
  activeCategoryName,
  activeSubcategoryName,
  lawName,
  selectedLawContent,
  editedContent,
  onSave,
  onClose,
  onUpdateCategory,
  onUpdateSubcategory,
}) => {
  const [content, setContent] = useState('');
  const [editedCategory, setEditedCategory] = useState(activeCategoryName || '');
  const [editedSubcategory, setEditedSubcategory] = useState(activeSubcategoryName || '');

  const lawCategories = [
    { id: 'Constitutions', name: 'Constitutions' },
    { id: 'Statutes', name: 'Statutes' },
    { id: 'Executive Issuances', name: 'Executive Issuances' },
    { id: 'Judicial Issuances', name: 'Judicial Issuances' },
    { id: 'Other Judicial Issuances', name: 'Other Judicial Issuances' },
    { id: 'Other Issuances', name: 'Other Issuances' },
    { id: 'Jurisprudence', name: 'Jurisprudence' },
    { id: 'International Legal Resources', name: 'International Legal Resources' },
    { id: 'AUSL Exclusive', name: 'AUSL Exclusive' },
  ];

  // implement lazy loading to immediately render the text editor when the modal is opened
  useEffect(() => {
    if (show) {
      setContent(editedContent);
    }
  }, [show, editedContent]);

  const modalBodyStyle = {
    maxWidth: '100%',
    padding: '0',
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleCategoryChange = (event) => {
    setEditedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setEditedSubcategory(event.target.value);
  };

  const handleSaveClick = () => {
    console.log('LawModal handleSaveClick - Save button clicked');
    onSave(content);
    onUpdateCategory(editedCategory);
    onUpdateSubcategory(editedSubcategory);

    // Use native JavaScript alert for pop-up
    alert('Changes saved successfully!');
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>Edit Law</Modal.Title>
      </Modal.Header>

      <Modal.Body style={modalBodyStyle} className="d-flex justify-content-center align-content-center">
        <div className="container m-5 px-5">
        <div className="mb-3 row">
          <div className="col-md-12">
            <label htmlFor="lawTitle" className="form-label">Law Title</label>
            <input type="text" className="form-control" id="lawTitle" value={lawName} />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="mb-3 col-md-6">
            <label htmlFor="categorySelect" className="form-label">
              Category
            </label>
            <select
              id="categorySelect"
              className="category form-select"
              value={editedCategory}
              onChange={handleCategoryChange}
            >
              {lawCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="subcategoryInput" className="form-label">
              Subcategory
            </label>
            <input
              id="subcategoryInput"
              type="text"
              className="subcategory form-control"
              value={editedSubcategory}
              onChange={handleSubcategoryChange}
            />
          </div>
        </div>

          <div className="mb-3 row">
          <span className="form-label">Law Content</span>
            <ReactQuill
              id="lawContent"
              value={content}
              style={{ width: '100%', height: '100%' }}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" className="close-btn" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" className="save-btn" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LawModal;
