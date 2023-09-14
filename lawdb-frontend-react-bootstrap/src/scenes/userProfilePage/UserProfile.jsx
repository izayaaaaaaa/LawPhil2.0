import React, { useState, useEffect } from 'react';

const UserProfile = ({ hostUrl }) => {
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem('id');

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
    <div>
      <h1>User Profile</h1>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>
      {/* Add more user data fields as needed */}
    </div>
  );
};

export default UserProfile;