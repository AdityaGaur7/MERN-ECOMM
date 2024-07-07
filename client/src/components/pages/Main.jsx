"use client";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
const Main = () => {
  const [search,setsearch]=useState("");
  const navigate = useNavigate();
 useEffect(()=>{
  getdata();
 },[])
  const del = async(id)=>{
    // console.log(id);
    let result = await fetch("http://localhost:5000/product/"+id,{
      method:"DELETE"

    })
    result = await result.json();
    console.log(result);
    if(result.success){
      alert("Product Deleted");
      getdata();
      // navigate("/")

    }
    else{
      alert("Product not Deleted");
    }
  }
  const [response, setresponse] = useState([]);
   
  const getdata = async()=>{
    let resp = await fetch("http://localhost:5000/allproduct");
    resp = await resp.json();
    setresponse(resp.result);
    console.log(response.length);
  }
  const searchhandle= async(e)=>{
    setsearch(e.target.value);
    let resp = await fetch("http://localhost:5000/search/"+e.target.value);
    resp = await resp.json();
    setresponse(resp.result);


  }

  
  return (
    <div className="home">
      <h1>All Products</h1>
      <input type="text" placeholder="seach" value={search} onChange={searchhandle}/>
      
     
     
         <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Item</th>
            <th>Operation</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {response.length>0 ? response.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.company}</td>
              <td><button onClick={()=>del(item._id)}>delete</button></td>
              <td><button><Link to={"/update/"+item._id}>update</Link></button></td>
            </tr>
          )):<h3 style={{textAlign:'center',fontSize:'23px'}}>no data</h3>
        }
        </tbody>
         </table>
      
    </div>
  )

};

export default Main;
