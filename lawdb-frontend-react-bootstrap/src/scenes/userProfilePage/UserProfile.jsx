import React, { useState, useEffect } from 'react';
import '../../styles/general.css';
import '../../styles/userprofile.css';

const UserProfile = () => {
  // State to hold user profile details fetched from the database
  const [userProfile, setUserProfile] = useState(null);
  // State to track if the component is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to track if changes have been saved
  const [changesSaved, setChangesSaved] = useState(false);

  // Function to fetch user profile details from the database
  useEffect(() => {
    // Simulate a delay to mimic API call
    const delay = setTimeout(() => {
      // Mock user profile data
      const mockUserProfile = {
        username: 'JuanDelaCruz',
        email: 'jdcruz@law.gov.ph',
        // Add more profile details here
      };
      setUserProfile(mockUserProfile);
    }, 1500); // Delay of 1.5 seconds (1500 milliseconds)

    return () => clearTimeout(delay);
  }, []);

  // If user profile details are not loaded yet, show loading state
  if (!userProfile) {
    // loading state/nothing to show
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center text-center">
        <div>
          <img src="/logo.png" className="loading-logo mb-5" alt="LawPhil Logo" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Function to handle form submission on "Save Changes" click
  const handleSaveChanges = (event) => {
    event.preventDefault();
    // Perform API call to save changes to the user's profile
    // For simplicity, we will just log the updated profile data for now
    console.log('Updated Profile Data:', userProfile);
    // Exit edit mode after saving changes
    setEditMode(false);
    // Show the changes saved alert
    setChangesSaved(true);
    // Hide the alert after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setChangesSaved(false);
    }, 3000);
  };

  // JSX to display the user profile details
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
            <img src={userProfile.profilePicture} alt="Profile Picture" className="img-fluid pfp" />
          ) : (
            <img src="/logo.png" alt="Default Profile Picture" className="pfp img-fluid" />
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
