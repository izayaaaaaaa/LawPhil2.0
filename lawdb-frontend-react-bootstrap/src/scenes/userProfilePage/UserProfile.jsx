import React, { useState, useEffect } from 'react';

const UserProfile = ({ hostUrl }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    username: '',
    email: '',
  });

  const userId = localStorage.getItem('id');

  useEffect(() => {
    // Fetch user data and populate the state
    fetch(`${hostUrl}/LawPhil2.0_Server/getUserProfile.php?userId=${userId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
        setEditedData(data); // Initialize editedData with user data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId, hostUrl]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Send an update request to the backend
    fetch(`${hostUrl}/LawPhil2.0_Server/updateUserProfile.php?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Update response:', data);
        setIsEditing(false); // Disable editing mode after successful update
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
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
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
