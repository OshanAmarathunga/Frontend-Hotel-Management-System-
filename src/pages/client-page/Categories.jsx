import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {
    const [categoryList,setCategoryList]=useState([]);

    function loadCategories(){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category").then((rsp)=>{
            setCategoryList(rsp.data.categories);
        }).catch((e)=>{
            console.log(e);
            
        })
    }
    useEffect( ()=>{
        loadCategories();
    },[]);

    function deleteCategory(categorName){
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+categorName).then((rsp)=>{
            console.log(rsp.data.message);
            loadCategories();
            
        }).catch((e)=>{
            console.log(e);
            
        })
    }

    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b border-gray-200">Image</th>
                <th className="px-4 py-2 border-b border-gray-200">Name</th>
                <th className="px-4 py-2 border-b border-gray-200">Description</th>
                <th className="px-4 py-2 border-b border-gray-200">Price</th>
                <th className="px-4 py-2 border-b border-gray-200">Features</th>
                <th className="px-4 py-2 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-4 py-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 font-medium">
                    {category.name}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3">
                    {category.description}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-green-500 font-semibold">
                    ${category.price.toFixed(2)}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3">
                    <ul className="list-disc list-inside">
                      {category.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-green-500 font-semibold">
                    <button onClick={()=>{ deleteCategory(category.name)}} className='bg-red-500 text-white px-1 py-1 rounded-md ml-2 hover:bg-red-400'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
