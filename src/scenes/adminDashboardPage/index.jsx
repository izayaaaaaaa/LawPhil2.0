/**
 * The AdminDashboard component is a React component that manages the state and functionality for an
 * admin dashboard interface.
 * @returns The AdminDashboard component is being returned.
 */

import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/admin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import LawList from './LawList';
import LawForm from "./LawForm";

const lawCategories = [
  { id: 'Constitutions', name: 'Constitutions' },
  { id: 'Statutes', name: 'Statutes' },
  { id: 'Executive Issuances', name: 'Executive Issuances' },
  { id: 'Judicial Issuances', name: 'Judicial Issuances' },
  { id: 'Other Judicial Issuances', name: 'Other Judicial Issuances' },
  { id: 'Other Issuances', name: 'Other Issuances' },
  { id: 'Jurisprudence', name: 'Jurisprudence' },
  { id: 'International Legal Resources', name: 'International Legal Resources' },
  { id: 'AUSL Exclusive', name: 'AUSL Exclusive' },
];

const AdminDashboard = ({ hostUrl }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lawsInCategory, setLawsInCategory] = useState([]);
  const [editedLaw, setEditedLaw] = useState(null);

  const handleCategorySelect = (categoryID) => {
    setSelectedCategory(categoryID);
    console.log(`AdminDashboard Selected category: ${categoryID}`);
  
    const apiUrl = `${hostUrl}/LawPhil2.0_Server/lawCRUD/getLawsByCategory.php?category=${categoryID}`;
  
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setLawsInCategory(response.data);
        } else {
          throw new Error(`Failed to fetch laws for category ${categoryID}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditLaw = (law) => {
    setEditedLaw(law);
  };

  const handleSaveChanges = (editedLaw) => {
    // Handle saving the edited law (e.g., make an API call to update the law)
    // After successful save, update `lawsInCategory` state and reset `editedLaw` state
  };

  // Fetch and set initial data (e.g., categories and laws) on component mount
  useEffect(() => {
    // Example: You can make API calls here to get categories and initial laws
    // Update states accordingly
  }, []);

  // Get the active category name based on selectedCategory
  const activeCategoryName = selectedCategory ? lawCategories.find((category) => category.id === selectedCategory)?.name : '';

  return (
    <div className="container AdminDashboard">      
      {/* row one */}
      <div className="row rowOne">
        <div className="col-md-10">
          <h2 className="">Admin Dashboard</h2>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-link">
            <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
            Add New Law
          </button>
        </div>
        {/* admin dashboard title + create new law button */}
      </div>
      <div className="row my-3">
        <hr />
      </div>

      {/* row two */}
      <div className="row rowTwo">
        <div className="col-md-3">
          <Sidebar
            categories={lawCategories} 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <LawList laws={lawsInCategory} onEditLaw={handleEditLaw} activeCategoryName={activeCategoryName} />
      </div>
    </div>
  );
};

export default AdminDashboard;