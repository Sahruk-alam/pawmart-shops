
import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
const {user,signoutUser}=use(AuthContext);
     const handleSignOutUser=()=>{
    signoutUser()
    .then(()=>{
      
    })
    .catch(error=>{
      alert('Error signing out user:', error);
    });
    }
    const links=<>
    
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/pets-supplies">Pets & Supplies</NavLink></li>

   {
    user &&  <>
    <li><NavLink to="/add-listing">Add Listing</NavLink></li>
    <li><NavLink to="/my-listing">My Listings</NavLink></li>
    <li><NavLink to="/my-orders">My Orders</NavLink></li>
    </>
   }
    </>
    return (
        <div>
            <div className="navbar bg-base-200 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost text-xl text-green-600 ">PawMart</Link>
  </div>
  <div className="navbar-center hidden md:flex">
    <ul className="menu menu-horizontal px-1">
        {links}
    </ul>
  </div>
  <div className="navbar-end gap-2 ">
     {
      
      user && <a ><img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" /> </a>
    }
   {
      user ?  
     <div className="dropdown dropdown-hover dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1"><IoIosArrowDropdownCircle size={24} className='text-green-600' /></div>
  <ul tabIndex="-1" className="dropdown-content gap-1.5 menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
    <p className=" text-center py-2 text-sm font-semibold">
            {user.displayName}
          </p>
           <button
            onClick={handleSignOutUser}
            className="w-full btn text-left py-2 text-red-500 hover:bg-gray-100">
            Logout
          </button>

  </ul>
</div> :
       <div className='flex gap-2'>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/signup" className="btn">Register</Link>
    </div>
      }
  </div>
</div>
        </div>
    );
};

export default Navbar;