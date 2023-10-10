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
    wordWrap: 'break-word',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    width: '100%',
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
    onSave(content);
    onUpdateCategory(editedCategory);
    onUpdateSubcategory(editedSubcategory);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>
          {lawName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column" style={modalBodyStyle}>
        <div className="container">
          <div className="row my-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="categorySelect" className="category edit-form-label">
                <b>Category:</b>
              </label>
            </div>
            <div className="col-auto">
              <select
                id="categorySelect"
                className="category form-select edit-form-field"
                value={editedCategory}
                onChange={handleCategoryChange}
              >
                {lawCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="col-auto">
              <label htmlFor="subcategoryInput" className="subcategory edit-form-label">
                <b>Subcategory:</b>
              </label>
            </div>
            <div className="col-auto">
              <input
                id="subcategoryInput"
                type="text"
                className="subcategory form-control edit-form-field"
                style={{ width: 'unset' }}
                value={editedSubcategory}
                onChange={handleSubcategoryChange}
              />
            </div>
          </div>

          <div className="row">
            <ReactQuill
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
