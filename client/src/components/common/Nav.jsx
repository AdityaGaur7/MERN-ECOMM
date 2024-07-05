import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
const Nav = () => {
   const navigate = useNavigate();
    const auth = localStorage.getItem("user");
  const logout = async()=>{
    localStorage.removeItem('user');

    navigate('/signup')
  }
  return (
    <div style={{ color: "red" }}>
      <ul style={{ display: "flex", gap: "10px" }} className="nav-bar">
        <li>
          <Link to="/">All Products</Link>
        </li>
        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update">Update Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {
          auth?
          <button onClick={logout}>Logout</button>: <li>
          <Link to="/signup">Signup</Link>
        </li>
        }
       
       
      </ul>
    </div>
  );
};

export default Nav;
