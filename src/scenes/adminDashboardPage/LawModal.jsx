import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LawModal = ({ activeCategoryName, selectedLawContent, handleEditLaw, handleCloseModal, show }) => {
// Check if selectedLawContent is an object and contains a 'content' property
  if (typeof selectedLawContent === 'object' && selectedLawContent.hasOwnProperty('content')) {
    selectedLawContent = selectedLawContent.content;
  }

  const modalBodyStyle = {
    wordWrap: 'break-word', // Allow text to wrap
    overflowY: 'auto',     // Vertical scrolling if needed
    whiteSpace: 'pre-wrap', // Preserve whitespace
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{activeCategoryName} Law</Modal.Title>
      </Modal.Header>
          <Modal.Body style={modalBodyStyle}>
        <div dangerouslySetInnerHTML={{ __html: selectedLawContent }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleEditLaw}>Edit Law</Button>
          </Modal.Footer>
    </Modal>
  );
};

export default LawModal;
