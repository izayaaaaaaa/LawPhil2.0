import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/general.css';
import '../../styles/userprofile.css';

const UserProfile = ({ hostUrl }) => {
  // State to hold user profile details fetched from the database
  const [userProfile, setUserProfile] = useState(null);
  // State to track if the component is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to track if changes have been saved
  const [changesSaved, setChangesSaved] = useState(false);

  // Function to fetch user profile details from the database
  useEffect(() => {
    fetch(`${hostUrl}/LawPhil2.0_Server/getUserProfile.php?userId=${userId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON response
        console.log('Response:', data); // Log the data, not the response.json() function
        return data; // Return the parsed data
      })
      .then((data) => {
        // Update the state with the user data
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId, hostUrl]);

  if (!userData) {
    // log userdata
    console.log('userData:', userData);
    return <div>Loading...</div>;
  }

  return (
    <div className="container position-relative">
      {/* Show alert when changes are saved */}
      {changesSaved && (
        <div className="alert alert-success position-absolute top-0 end-0 mt-3 me-3" role="alert">
          Changes have been saved!
        </div>
      )}
      <h2 className="text-start mb-5">Hi, {userProfile.username}!</h2>
      <div className="row">
        {/* Profile Picture (Left Column) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center mt-3">
          {/* Check if userProfile has a profile picture */}
          {userProfile.profilePicture ? (
            <img src={userProfile.profilePicture} alt="Profile" className="img-fluid pfp" />
          ) : (
            <img src="/logo.png" alt="Default Profile" className="pfp img-fluid" />
          )}
        </div>

        {/* User Profile Details (Right Column) */}
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control prof-form-control"
                id="username"
                value={userProfile.username}
                readOnly={!editMode}
                onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control prof-form-control"
                id="email"
                value={userProfile.email}
                readOnly={!editMode}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              />
            </div>
            {/* Password change - should be the same as Forgot Password */}
            <a href="#!" className="link-dark">Request Password Change</a>
            <br />
          </form>
        </div>
      </div>
      {/* Buttons - Aligned to the bottom right corner */}
      <div className="d-flex justify-content-end end-0 my-3">
        {/* Toggle between View/Edit mode */}
        <button type="button" className="btn edit-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {/* Show "Save Changes" button only in Edit mode */}
        {editMode && (
          <button type="submit" className="btn save-btn ms-2" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;