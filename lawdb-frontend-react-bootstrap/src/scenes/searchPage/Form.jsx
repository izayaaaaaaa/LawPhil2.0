import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Form = ({ onSubmit }) => {
  /* 
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
  }; 
  */

  return (
    <div>
        <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div class='search-body text-center'>
            <h4>ARELLANO FOVNDATION</h4>
            <h1>LawPhil Project</h1>

            <div class='search-bar'> 
                <form action="" class="search-form">
                    <div class="form-group has-feedback">
                        <div class="input-group my-5">
                            <input type="text" class="form-control" className="search-bar" placeholder="Search Keywords" aria-label="Search Bar"/>
                            <div class="input-group-append">
                                <button class="btn search-btn" type="button"> {/* button redirects to search results */}
                                <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <h5>FREE ACCESS TO LAW</h5>
            </div>

            <div class='adv-search-body'>

            </div>
        </div>
    
    </div>
  );
};

export default Form;
