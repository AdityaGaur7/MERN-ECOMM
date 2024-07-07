import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Updateproduct = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);
console.log(params);
  const update = async () => {
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    }
    console.log(name, price, category, company);

  

    //   let result = await fetch("http://localhost:5000/addproduct", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name, price, category,company,userId }),
    //   });
    //   result = await result.json();

    //   console.log(result);
    //   if (result.success) {
    //     alert("Product Added successful");

    //   }
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
