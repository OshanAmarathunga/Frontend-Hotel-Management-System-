import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeaturesList] = useState([]);
  const [iamge, setImage] = useState("");
  const navigate =useNavigate();

  useEffect(() => {
    loadCatgories();
  }, []);

  const loadCatgories = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((rsp) => {
        setCategoryList(rsp.data.categories);
      })
      .catch((e) => {
        alert("Load Error!");
      });
  };

  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`)
        .then(() => {
          alert("Category deleted successfully!");
          loadCatgories(); // Reload categories after deletion
        })
        .catch((e) => {
          alert("Delete Error!");
        });
    }
  };

  function handleAddPlusButton(){
    navigate("/admin/addNewCategory");
  }

  const handleUpdate = (categoryId) => {
    
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={()=>{handleAddPlusButton()}} className="bg-yellow-300 shadow-lg hover:bg-yellow-200 fixed bottom-5 right-7 w-[50px] h-[50px] rounded-full flex justify-center items-center">
        <FaPlus/>
      </button>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-blue-800 font-bold pb-3 text-[30px] drop-shadow-lg">
        Category List
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
            
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Description
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Features
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList.map((category) => (
              <tr
                key={category.id}
                style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
              >
                
                <td style={{ padding: "12px" }}>{category.name}</td>
                <td style={{ padding: "12px" }}>
                  {category.description || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  Rs. {category.price.toFixed(2)}
                </td>
                <td style={{ padding: "12px" }}>
                  <ul
                    style={{ listStyleType: "none", padding: "0", margin: "0" }}
                  >
                    {category.features && category.features.length > 0 ? (
                      category.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </td>
                <td style={{ padding: "12px" }}>
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate("/admin/updateCategory",{state:category})}
                    
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      cursor: "pointer",
                      marginRight: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(category.name)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
