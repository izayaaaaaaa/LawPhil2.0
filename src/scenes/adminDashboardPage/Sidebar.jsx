import React from 'react';

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Law Categories</span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`nav-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;