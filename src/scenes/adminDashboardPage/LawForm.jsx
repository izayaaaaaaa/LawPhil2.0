import React, { useState } from "react";

const LawForm = ({ law, onCancelEdit, onSaveChanges }) => {
  const [editedTitle, setEditedTitle] = useState(law.title);
  const [editedCategory, setEditedCategory] = useState(law.category);
  const [editedContent, setEditedContent] = useState(law.content);

  const handleSave = () => {
    // Update the law object with edited data
    const editedLaw = {
      ...law,
      title: editedTitle,
      category: editedCategory,
      content: editedContent,
    };

    // Call the onSaveChanges function to save the changes
    onSaveChanges(editedLaw);
  };

  return (
    <div className="edit-law-form">
      <h3>Edit Law</h3>
      <form>
        <div>
          <label htmlFor="editedTitle">Title:</label>
          <input
            type="text"
            id="editedTitle"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="editedCategory">Category:</label>
          <input
            type="text"
            id="editedCategory"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="editedContent">Content:</label>
          <textarea
            id="editedContent"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </div>
      </form>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancelEdit}>Cancel</button>
      </div>
    </div>
  );
};

export default LawForm;