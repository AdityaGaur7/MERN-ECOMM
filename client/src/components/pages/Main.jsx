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
    
   
    let result = await fetch(`https://mern-ecomm-2z28.onrender.com/product/`+id,{
      method:"DELETE",
      headers:{
        Authorization:`bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }


    })
    result = await result.json();
    // console.log(result);
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
    let resp = await fetch(`https://mern-ecomm-2z28.onrender.com/allproduct`,{
      headers:{
        Authorization:`bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }

    });
    resp = await resp.json();
    setresponse(resp.result);
    // console.log(resp.result);
  }
  const searchhandle= async(e)=>{
    setsearch(e.target.value);
    
    let key = e.target.value;
    if(key){
      let resp = await fetch(`https://mern-ecomm-2z28.onrender.com/search/`+key,{
        headers:{
          Authorization:`bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
  
      });
      resp = await resp.json();
      if(resp){
  
        setresponse(resp.result);
      }
    }else{
      getdata();
    }
    
   



  }

  
  return (
    <div className="home">
      <h1>All Products</h1>
      <input type="text" placeholder="search" value={search} onChange={searchhandle}/>
      
     
      
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
        {
          response.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.company}</td>
              <td><button onClick={()=>del(item._id)} style={{background:'#e85252',color:'white'}}>delete</button></td>
              <td><button><Link to={"/update/"+item._id} style={{color:'black'}}>update</Link></button></td>
            </tr>
          ))
        }
          {
          response.length<=0 &&<h3 style={{textAlign:'center',fontSize:'23px'}}>no data</h3>

        }
        </tbody>
         </table>
      
    </div>
  )

};

export default Main;
