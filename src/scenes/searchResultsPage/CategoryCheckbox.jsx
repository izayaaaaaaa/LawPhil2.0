import React from 'react';

function CategoryCheckbox({ value, checked, onChange, label}) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={`checkbox${value}`}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={`checkbox${value}`}>
        {label}
      </label>
    </div>
  );
}

export default CategoryCheckbox;
