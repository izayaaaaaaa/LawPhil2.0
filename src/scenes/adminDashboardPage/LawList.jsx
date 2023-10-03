import React from 'react';

const LawList = ({ laws, onEditLaw }) => {
  return (
    <div className="law-list" style={{ flex: '1' }}>
      <div className="card" style={{ width: '100%' }}>
        <div className="card-header">
          Law List
        </div>
        <ul className="list-group list-group-flush">
          {laws.map((law) => (
            <li className="list-group-item d-flex justify-content-between" key={law.id}>
              <span>{law.title}</span>
              <button className="btn btn-primary" onClick={() => onEditLaw(law)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawList;