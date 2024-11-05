import React, { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function AddGalleryItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleImageChange = async (e) => {
    handleOpen();
    const selectedImage = e.target.files[0];
    const url = await uploadMedia(selectedImage);
    if (url) {
      setImage(url);
      toast.success("Image uploaded successfully!");
      handleClose();
    }
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function clearFields() {
    setName("");
    setDescription("");
    setImage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const galleryItem = {
      name: name,
      description: description,
      image: image,
    };

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/gallery",
        galleryItem,
        config
      );
      toast.success("Gallery item added successfully!");
      navigate("/admin/galleryItem");
    
    } catch (error) {
      console.error(error);
      toast.error("Failed to add gallery item.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-3 rounded-lg">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Add New Gallery Item
      </h2>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 mt-4 rounded-lg object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Gallery Item
        </button>
      </form>
    </div>
  );
}
