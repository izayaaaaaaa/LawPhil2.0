// LawModal.jsx

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LawModal = ({
  show,
  activeCategoryName,
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
        <Modal.Title>{lawName}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalBodyStyle}>
        <textarea
          value={editedContent}
          onChange={(e) => onSave(e.target.value)} // Update editedContent as the user makes changes
          style={{ width: '100%', height: '300px' }}
        />
      </Modal.Body>

      <Modal.Footer>
        Category: {activeCategoryName}

        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LawModal;
