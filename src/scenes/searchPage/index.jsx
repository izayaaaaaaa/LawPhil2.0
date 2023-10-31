import React from 'react';
import Form from './Form';
import '../../styles/general.css';
import '../../styles/search.css';
import { useNavigate } from 'react-router-dom';

// FIXME:
    // 1. background color changed after I added the login/register pages back and changed the routing (App.js)

const SearchPage = ({ hostUrl }) => {
    const navigate = useNavigate();
    
    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.querySelector('input').value;
        
        // console.log('SearchPage Search query:', searchQuery);
        
        const queryParams = new URLSearchParams();
        queryParams.append('searchQuery', searchQuery);
        
        console.log('SearchPage URL:', `/search-results/?${queryParams.toString()}`);
        
        navigate(`/search-results/?${queryParams.toString()}`);
    };
    
    return (
        <div>
            <Form handleSubmit={handleSearch} />
        </div>
    );
};

export default SearchPage;