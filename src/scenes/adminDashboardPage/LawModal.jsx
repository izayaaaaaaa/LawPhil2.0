import React, { useState } from 'react';
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
  handleSaveChanges,
  handleCloseModal,
}) => {
  const [content, setContent] = useState(editedContent);

  const modalBodyStyle = {
    wordWrap: 'break-word', // Allow text to wrap
    overflowY: 'auto', // Vertical scrolling if needed
    whiteSpace: 'pre-wrap', // Preserve whitespace
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSaveClick = () => {
    handleSaveChanges(content);
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>
          {lawName}
          <p className="small-text">
            <b>&nbsp;Category:</b> {activeCategoryName} (<span className="subcategory">{activeCategoryName}</span>)
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
        <Button variant="light" className="close-btn" onClick={handleCloseModal}>
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
