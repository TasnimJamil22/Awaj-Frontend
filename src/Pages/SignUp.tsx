import { Link } from "react-router-dom";




const SignUp = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
             
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <label className="label">User Name</label>
                            <input type="userName" className="input" placeholder="User Name" />
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                            
                            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                            <button className="btn btn-neutral mt-4">Sign Up</button>
                        </fieldset>
                          <p>Already have an account? <Link to='/login'>Login</Link></p>
                    </div>
                  
                </div>
                
           
        </div>
    );

};

export default SignUp;