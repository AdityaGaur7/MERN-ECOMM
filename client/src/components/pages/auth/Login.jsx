import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=>{
    const auth =
    localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
  },[])
  const handlelogin = async () => {
    console.log( email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();

    console.log(result);
    if (result.success) {
      alert("Login successful");
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }else{
      alert("invalid input")
    }
  };

  return (
    <div className="register">
      <h1>Login Here</h1>
     
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlelogin} className="appButton" type="button">
        Login 
      </button>
    </div>
  );
};
export default Login;
