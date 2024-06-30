import React from 'react'
import {Link} from "react-router-dom"

const Nav = () => {
  return (
    <div style={{color:'red'}}>
      <ul style={{display:'flex',gap:'10px'}} className='nav-bar'>
        <li><Link to="/">All Products</Link></li>
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/update">Update Products</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  )
}

export default Nav