import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserData({scrollToAboutUs,image, scrollToGallery}) {

  const [savedToken,setSavedToken]=useState(localStorage.getItem("token"));
  const [name,setName]=useState("");

  useEffect( ()=>{
    const config={
      headers:{
        Authorization:`Bearer ${savedToken}`,
        "content-Type":"application/json"
      },
     }
    if(savedToken!=null){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/get-user",config).then((rsp)=>{
  
        setName(rsp.data.user.firstName);
        
      }).catch((e)=>{
        alert(e)
        
      });
    }
  },[]);
  

  return (
    <div className="absolute right-0 flex items-center">
       <button onClick={scrollToGallery}  className="text-sm mr-3 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
          Gallery
        </button>
        <button onClick={scrollToAboutUs}  className="text-sm mr-3 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
          About Us
        </button>
     
      <Link to={"/"}>
        <button onClick={(e)=>{setSavedToken(localStorage.removeItem("token"))}} className="text-sm mr-3 px-4 py-2 bg-yellow-300 text-black font-medium rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
          LogOut
        </button>
      </Link>
      

      <div></div>
      <h1 className="text-black ml-[5px] mr-[10px] text-xl cursor-pointer">
        Hi {name}
      </h1>
      <div className="pr-4">
      <img className="rounded-full w-[80px] h-[80px]" src={image} />
      </div>
      
    </div>
  );
}

export default UserData;
