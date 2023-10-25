import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const UserProfile = ({ hostUrl }) => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        username: '',
        email: '',
    });
    
    const [modifiedUser, setModifiedUser] = useState(false);
    
    const userId = localStorage.getItem('id');
    
    const navigate = useNavigate();
    
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
            setModifiedUser(false);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, [userId, hostUrl, modifiedUser]);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    const handleSaveClick = () => {
        // Send an update request to the backend
        fetch(`${hostUrl}/LawPhil2.0_Server/updateUserProfile.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                username: editedData.username,
                email: editedData.email,
            }),
        })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Update response:', data);
            setModifiedUser(true);
            setIsEditing(false); // Disable editing mode after successful update
        })
        .catch((error) => {
            console.error('Error updating user profile:', error);
        });
    };
    
    const handleDeleteClick = () => {
        // Send a delete request to the backend
        fetch(`${hostUrl}/LawPhil2.0_Server/deleteUserProfile.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
            }),
        })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Delete response:', data);
            // Handle successful deletion, such as logging out the user or redirecting
            // redirect to / route
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            navigate('/');
        })
        .catch((error) => {
            console.error('Error deleting user profile:', error);
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
            {/* Use the Form component here */}
            <Form
                isEditing={isEditing}
                editedData={editedData}
                handleInputChange={handleInputChange}
                handleSaveClick={handleSaveClick}
                userData={userData} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />
        </div>
    );
};
            
export default UserProfile;