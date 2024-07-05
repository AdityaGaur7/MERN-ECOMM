import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import AllProducts from "../pages/Main"
import Addproducts from "../pages/Addproduct"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Update from "../pages/Updateproduct"
import SignUp from './auth/Signup'
const Home = () => {
  return (
    <div >
        

        <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/add" element={<Addproducts />} /> 
            <Route path="/update" element={<Update />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default Home