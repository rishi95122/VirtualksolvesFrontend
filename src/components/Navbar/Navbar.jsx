
import React, { useContext, useState } from 'react';
import './Navbar.css'; 
import { AuthContext } from '../../context/authContext';
import {Link} from 'react-router-dom'

import ProfileCard from '../../cards/profileCard/ProfileCard';
import axios from 'axios';
const Navbar = () => {
  const {currentUser,setCurrentUser}=useContext(AuthContext)

  const [profileOpen,setProfileOPen]=useState(false)
  async function handleLogout() {
    setCurrentUser(null);
    try {
      await axios.get(`http://localhost:8800/api/auth/logout`,{
        withCredentials:true
      });
    } catch (err) {
     console.error(err)
    }
  }


  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Virtual Classroom</Link>
    
        <div className={`nav-links }`}>
          <Link to="/" className="nav-link">Home</Link>
          

          {
            currentUser ? <div className='profilesec'><p onClick={()=>{setProfileOPen(!profileOpen)}}>{currentUser?.name}</p>
            <button className="loginbtn" onClick={handleLogout}>Logout</button>
            {(profileOpen  && currentUser?.role==='admin')&& <ProfileCard setProfileOPen={setProfileOPen}/>}
            </div> :<div>
            <Link to="/login">
            <button className="loginbtn">Login</button>
            </Link>
           <Link to="/register">
           <button className="loginbtn">Signup</button>
           </Link>
          
            </div>
          }
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
