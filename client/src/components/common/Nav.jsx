import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Nav = () => {
 
    const auth = localStorage.getItem("user");
 
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
          <button onClick={()=>localStorage.removeItem('user')}>Logout</button>: <li>
          <Link to="/signup">Signup</Link>
        </li>
        }
       
       
      </ul>
    </div>
  );
};

export default Nav;
