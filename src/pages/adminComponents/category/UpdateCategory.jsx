import React, { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function UpdateCategory() {
    const location=useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [features, setFeaturesList] = useState(location.state.features);
  const [image, setImage] = useState(location.state.image);
 

  

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
    const image = e.target.files[0];
    const url = await uploadMedia(image);
    if (url) {
      setImage(url);
      toast.success("Successfully Uploaded!");
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
      const rsp=await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/category/${name}`, 
        category,
        config
      );
      toast.success("Successfully updated this Category !");
      clearText();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-3 rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Update Category
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
            disabled
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
          Update Category
        </button>
      </form>
    </div>
  );
}
