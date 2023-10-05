// LawModal.jsx

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

  const modalBodyStyle = {
    wordWrap: 'break-word', // Allow text to wrap
    overflowY: 'auto', // Vertical scrolling if needed
    whiteSpace: 'pre-wrap', // Preserve whitespace
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>
          {lawName}
          <p className="small-text"><b>&nbsp;Category:</b> {activeCategoryName} (<span className="subcategory">{activeCategoryName}</span>)</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body 
        className="d-flex justify-content-center"
        style={modalBodyStyle}
      >
        <textarea
          value={editedContent}
          onChange={(e) => onSave(e.target.value)} // Update editedContent as the user makes changes
          style={{ width: '90%', height: '100%' }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light"  className="close-btn" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" className="save-btn" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LawModal;
