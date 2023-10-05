import React from 'react';

const Sidebar = ({ lawCategories, selectedCategory, handleCategorySelect }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3" id="sidebar">
      <div className="d-flex align-items-center mb-md-0 link-dark text-decoration-none" id="sidebar-title">
        <span className="fs-4 pb-3">Law Categories</span>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {lawCategories.map((category) => (
          <li
            key={category.id}
            className={`category-list-item nav-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;