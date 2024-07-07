"use client";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let result = await fetch("http://localhost:5000/allproduct");
    result = await result.json();
    console.log(result);
    setdata(result.result);
  };
  return (
    <div className="home">
      <h1>All Products</h1>
     
        
         <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.company}</td>
            </tr>
          ))}
           </tbody>
)} 
         </table>
      
};

export default      n;
