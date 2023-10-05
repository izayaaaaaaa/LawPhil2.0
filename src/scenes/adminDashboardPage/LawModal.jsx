import React from 'react';
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

  const modalBodyStyle = {
    wordWrap: 'break-word', // Allow text to wrap
    overflowY: 'auto', // Vertical scrolling if needed
    whiteSpace: 'pre-wrap', // Preserve whitespace
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" dialogClassName="modal-fullscreen">
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
        <ReactQuill
          value={editedContent}
          onChange={(content, delta, source, editor) => {
            if (source === 'user') {
              handleSaveChanges(editor.getHTML());
            }
          }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light"  className="close-btn" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="secondary" className="save-btn" onClick={() => handleSaveChanges(editedContent)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LawModal;
