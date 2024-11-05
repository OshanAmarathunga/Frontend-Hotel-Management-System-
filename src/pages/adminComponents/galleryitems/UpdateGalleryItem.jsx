import React, { useEffect, useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function UpdateGalleryItem() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(location.state.image);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/gallery");
    }
  }, [token, navigate]);

  const handleImageChange = async (e) => {
    handleOpen();
    const selectedImage = e.target.files[0];
    const url = await uploadMedia(selectedImage);
    if (url) {
      setImage(url);
      handleClose();
      toast.success("Image uploaded successfully!");
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGalleryItem = {
      name: name,
      description: description,
      image: image,
    };
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/gallery`, 
        updatedGalleryItem,
        config
      );
      toast.success("Gallery item updated successfully!");
      
    navigate("/admin/galleryItem");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update gallery item.");
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
        Update Gallery Item
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
            disabled
            
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
          Update Gallery Item
        </button>
      </form>
    </div>
  );
}
