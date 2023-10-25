import React from 'react';

const Form = ({ isEditing, editedData, handleInputChange, handleSaveClick, userData, handleEditClick, handleDeleteClick }) => {
    return (
        <div>
            {isEditing ? (
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={editedData.username}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                    <button onClick={handleDeleteClick}>Delete Profile</button>
                </div>
            )}
        </div>
    );
};

export default Form;
