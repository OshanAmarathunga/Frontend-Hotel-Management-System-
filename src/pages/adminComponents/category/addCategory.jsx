import React, { useState } from 'react'

export default function AddCategory() {
    // const [category, setCategory] = useState({
    //     name: '',
    //     description: '',
    //     price: 0,
    //     features: [''],
    //     image: ''
    //   });

      const [name, setName]=useState("");
      const [description,setDescription]=useState("");
      const [price,setPrice]=useState(0);
      const [features,setFeaturesList]=useState([]);
      const [image ,setImage]=useState("");

    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCategory((prevCategory) => ({
    //       ...prevCategory,
    //       [name]: value
    //     }));
    //   };

    //   const handleFeatureChange = (index, value) => {
    //     const updatedFeatures = [...category.features];
    //     updatedFeatures[index] = value;
    //     setCategory((prevCategory) => ({    
    //       ...prevCategory,
    //       features: updatedFeatures
    //     }));
    //   };

    //   const addFeature = () => {
    //     setCategory((prevCategory) => ({
    //       ...prevCategory,
    //       features: [...prevCategory.features, '']
    //     }));
    //   };

    //   const removeFeature = (index) => {
    //     const updatedFeatures = category.features.filter((_, i) => i !== index);
    //     setCategory((prevCategory) => ({
    //       ...prevCategory,
    //       features: updatedFeatures
    //     }));
    //   };

    //   const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         setCategory((prevCategory) => ({
    //           ...prevCategory,
    //           image: reader.result
    //         }));
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };


    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success('Successfully toasted!');
        // try {
        //   await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/category", category);
        //   alert("Category added successfully!");
        //   setCategory({ name: '', description: '', price: 0, features: [''], image: '' });
        // } catch (error) {
        //   alert("Failed to add category!");
        // }
      };


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Features:</label>
          {features && features.map((feature, index) => (
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
          {category.image && (
            <img
              src={category.image}
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
  )
}
