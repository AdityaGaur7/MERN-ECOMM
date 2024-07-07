import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Updateproduct = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);


  const getsingleproduct=async()=>{
    let data = await fetch("http://localhost:5000/product/"+params.id);
    data = await data.json();
    data = data.result;
    console.log(data);
    setName(data.name);
    setprice(data.price);
    setcategory(data.category);
    setcompany(data.company);
    
  }




useEffect(()=>{
  console.log(params.id);
  getsingleproduct();
 
},[])

  const update = async () => {
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    }
    console.log(name, price, category, company);

   

  

    
  };
  return (
    <div>
      <div className="update register">
        <h3>Update products</h3>

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <p className="error">Please enter name</p>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        />
        {error && !category && <p className="error">Please enter category</p>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        {error && !price && <p className="error">Please enter price</p>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter company"
          value={company}
          onChange={(e) => setcompany(e.target.value)}
        />
        {error && !company && <p className="error">Please enter company</p>}
        <button onClick={update} className="appButton" type="button">
          Update
        </button>
      </div>
    </div>
  );
};

export default Updateproduct;
