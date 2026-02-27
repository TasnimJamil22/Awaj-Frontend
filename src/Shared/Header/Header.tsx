import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"


const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ← get role here
  const token = localStorage.getItem("token"); // check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email"); // remove other user info if stored
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            // tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to='/'>Home</Link></li>

            <li><Link to='/authority'>Complaints</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-orange-600">
          Awaj
        </Link>

        {/* <Link to="/authority" className="btn btn-ghost text-xl text-orange-600">
        Dashboard
      </Link> */}

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-orange-500">
          <li><Link to='/'>Home</Link></li>

          {
            role === "authority" && <li><Link to='/authority'>Complaints</Link></li>
          }
          {
            role === "user" && <li><Link to='/my-complaints'>My Complaints</Link></li>
          }
          {role === "superadmin" && <li><Link to="/create-authority">Create Authority</Link></li>}
        </ul>
      </div>
      <div className="navbar-end">
        {
          role === "user" && <Button className='text-pink-100 mr-3 bg-orange-500 hover:bg-orange-300'><Link to='/complaintForm'>Submit Complaint</Link></Button>
        }
        {/* <button  className="btn"><Link to='/login'>Login</Link></button> */}
        {/* <Button className='text-pink-100 bg-orange-400 hover:bg-orange-300'><Link to='/login'>Login</Link></Button> */}

        {/* {role === "superadmin" && <Button className="text-pink-100 bg-orange-400 hover:bg-orange-300 ml-3"><Link to="/create-authority">Create Authority</Link></Button>} */}
        {/* <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button> */}
        {
          token ? (
            <Button
              className="text-pink-100 bg-orange-400 hover:bg-orange-300 ml-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button className="text-pink-100 bg-orange-400 hover:bg-orange-300 ml-2">
              <Link to="/login">Login</Link>
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default Header