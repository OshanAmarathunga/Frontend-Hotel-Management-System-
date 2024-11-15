import React, { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeaturesList] = useState([]);
  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleFeatureChange = (index, value) => {
    setFeaturesList((prv) => {
      const updatedFeatures = [...prv];
      updatedFeatures[index] = value;
      return updatedFeatures;
    });
  };

  const addFeature = () => {
    setFeaturesList((prevFeatures) => [...prevFeatures, ""]);
  };

  const removeFeature = (index) => {
    setFeaturesList((prevFeatures) =>
      prevFeatures.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = async (e) => {
    handleOpen();
    const image = e.target.files[0];
    const url = await uploadMedia(image);
    if (url) {
      setImage(url);
      toast.success("Successfully Uploaded!");
      handleClose();
    }
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function clearText() {
    setName(""), setDescription("");
    setPrice("");
    setFeaturesList([]), setImage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      name: name,
      description: description,
      price: price,
      features: features,
      image: image,
    };
    try {
      const rsp=await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/category",
        category,
        config
      );
      toast.success("Successfully Added this Category");
      console.log("rsp",rsp);
      clearText();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-3 rounded-lg">
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Add New Category
      </h2>
      <div>
        <Toaster position="top-right" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Features:</label>
          {features &&
            features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2"
          >
            Add Feature
          </button>
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
          Add Category
        </button>
      </form>
    </div>
  );
}
