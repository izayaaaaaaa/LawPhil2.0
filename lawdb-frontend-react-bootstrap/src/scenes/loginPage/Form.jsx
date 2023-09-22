/* The code defines a functional component called `LoginForm` in JavaScript React. It takes three
props: `formData`, `handleChange`, and `handleSubmit`. */

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="container px-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <div className="card log-card">
            <div className="row g-0">
              
              <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center" id="welcome-side">
                <h3>Welcome back to</h3>
                <h2>LawPhil Project!</h2>
              </div>

              <div className="col-md-6 col-lg-6 d-flex align-items-center" id="login-side">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    
                    <div className="form-group mb-4">
                      <label className="form-label login-form-label" htmlFor="email">Email</label>
                      <input 
                        type="text" 
                        id="email" 
                        className="form-control form-control-md login-form-control" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <label className="form-label login-form-label" htmlFor="password">Password</label>
                      <input 
                        type="password" 
                        id="password" 
                        className="form-control form-control-md login-form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                
                    {/* <div className="text-center mt-4">
                      <a href="#!" className="link-light">Forgot Password?</a>
                    </div> */}
                
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-light btn-md login-btn">
                        Login
                      </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;