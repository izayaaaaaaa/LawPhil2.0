const RegisterForm = ({
    formData,
    handleChange,
    handleSubmit,
}) => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-xl-10 mx-auto">
                    <div className="card reg-card reg-card-bg">
                        <div className="text-center">
                            <h3>Welcome back to</h3>
                            <h2>LawPhil Project!</h2>
                            <br />
                        </div>
                    
                        <form onSubmit={handleSubmit} className="px-5">
                            <div className="form-outline mb-4 input-wrapper">
                                <label className="form-label reg-form-label" htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control reg-form-control form-control-md"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className="form-outline mb-4 input-wrapper">
                                <label className="form-label reg-form-label" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control reg-form-control form-control-md"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className="form-outline mb-4 input-wrapper">
                                <label className="form-label reg-form-label" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control reg-form-control form-control-md"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className="text-center mt-4 mx-auto">
                                <button type="submit" className="btn btn-light reg-btn btn-md">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;