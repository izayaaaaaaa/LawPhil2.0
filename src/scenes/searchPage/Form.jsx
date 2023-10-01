import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = ({
  handleSubmit,
}) => {

  return (
    <div className="body-search">
      <div className="container d-flex flex-column">
        <div className="search-body text-center flex-grow-1 vh-100">
          
          <img src="/logo.png" className="logo mb-4" alt="LawPhil Logo" />
          <h1>LawPhil Project</h1>

          <div className="search-bar p-5">
            <form onSubmit={handleSubmit} className="search-form">
              <div className="form-group has-feedback">
                <div className="input-group search-input">
                  <input
                    type="text"
                    className="form-control search-form-control"
                    placeholder="Search Keywords"
                    aria-label="Search Bar"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn search-btn">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <h5>FREE ACCESS TO LAW</h5>
        </div>
      </div>
    </div>
    );
  };

export default Form;
