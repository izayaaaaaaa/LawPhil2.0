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
}) => {
const [content, setContent] = useState('');

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
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSaveClick = () => {
    onSave(content);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>
          {lawName}
          <p>
            <b>&nbsp;Category:</b> {activeCategoryName}
          </p>
          <p className="subcategory">
            <b>&nbsp;Subcategory:</b> {activeSubcategoryName}
          </p>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="d-flex justify-content-center" style={modalBodyStyle}>
        <ReactQuill
          value={content}
          style={{ width: '90%', height: '100%' }}
          onChange={handleContentChange}
        />
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
