import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const LawList = ({ laws, onEditLaw, activeCategoryName }) => {
  const ellipsisStyle ={
    width: 'auto'
  }

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <div className="col-md-9" id="listbar">
      <div className="card">
        <div className="card-header p-3">
          <span className="fs-4">{activeCategoryName}</span>
        </div>
        <ul className="px-3 list-group list-group-flush">
          {laws.map((law) => (
            <li className="py-3 list-group-item d-flex justify-content-between" key={law.id}>
              <span>{law.title}</span>
              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-link" 
                  onClick={toggleModal} 
                  style={ellipsisStyle}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <FontAwesomeIcon icon={ faEllipsisH } />
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">djsklajds changes</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawList;