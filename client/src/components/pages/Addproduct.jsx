import { useState } from 'react';
import React from 'react'

const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const collectData = async () => {
    console.log(name, price, category,company);
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, category,company }),
    });
    result = await result.json();

    console.log(result);
    if (result.success) {
      alert("Product Added successful");
      
    }
  };

    
  

  return (
    <div className='home register'>
      <h3>Add products</h3>
     
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setcategory(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter company"
        value={company}
        onChange={(e) => setcompany(e.target.value)}
      />
      <button onClick={collectData} className="appButton" type="button">
      Add 
      </button>
    </div>
  
  )
}

export default Addproduct