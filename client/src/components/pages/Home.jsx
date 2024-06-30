import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import AllProducts from "../pages/Main"
const Home = () => {
  return (
    <div >
        

        <Routes>
            <Route path="/" element={<AllProducts />} />
            {/* <Route path="/add" element={<AddProducts />} /> */}
            {/* <Route path="/update" element={<UpdateProducts />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} /> */}
        </Routes>
    </div>
  )
}

export default Home