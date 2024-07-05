import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
const Nav = () => {
   const navigate = useNavigate();
    const auth = localStorage.getItem("user");
  const logout = async()=>{
    localStorage.removeItem('user');

    navigate('/login')
  }
  return (
    <div style={{ color: "red" }}>
      <ul style={{ display: "flex", gap: "10px" }} className="nav-bar">
      <li>
          <Link to="/">All Products</Link>
        </li>
      {
          auth?
          <>
       

        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update">Update Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
       
          <li><Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link></li>
          </>: 
        
        <>
        
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        
        </>
        
        }
       
       
      </ul>
    </div>
  );
};

export default Nav;
