import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function GalleryItems() {
  const [galleryItems, setGalleryItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
      .then((rsp) => { 
        setGalleryItems(rsp.data.list);
      })
      .catch((e) => {
        alert("Load Error!");
      });
  };

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${_id}`)
        .then(() => {
          alert("Item deleted successfully!");
          loadGalleryItems(); // Reload items after deletion
        })
        .catch((e) => {
          alert("Delete Error!");
        });
    }
  };

  function handleAddPlusButton() {
    navigate("/admin/addNewGalleryItem");
  }

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => handleAddPlusButton()}
        className="bg-yellow-300 shadow-lg hover:bg-yellow-200 fixed bottom-5 right-7 w-[50px] h-[50px] rounded-full flex justify-center items-center"
      >
        <FaPlus />
      </button>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-blue-800 font-bold pb-3 text-[30px] drop-shadow-lg">
        Gallery
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
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Description
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {galleryItems &&
            galleryItems.map((item) => (
              <tr
                key={item._id}
                style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
              >
                <td style={{ padding: "12px" }}>{item.name}</td>
                <td style={{ padding: "12px" }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
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
                <td style={{ padding: "12px" }}>{item.description || "N/A"}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate("/admin/updateGalleryItem", { state: item })}
                    className="font-bold shadow-lg bg-green-300 m-2 hover:bg-green-600 border-none p-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="font-bold shadow-lg bg-red-400 m-2 hover:bg-red-500 border-none p-2 rounded-md"
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
