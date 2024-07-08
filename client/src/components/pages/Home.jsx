import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AllProducts from "../pages/Main";
import Addproducts from "../pages/Addproduct";
import Login from "../pages/auth/Login"
import Profile from "../pages/Profile";
import Update from "../pages/Updateproduct";
import SignUp from "./auth/Signup";
import PrivateComponent from "../pages/auth/PrivateComponent";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<AllProducts />} />
          <Route path="/add" element={<Addproducts />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Home;
