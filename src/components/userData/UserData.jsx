import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserData(props) {

  const [savedToken,setSavedToken]=useState(localStorage.getItem("token"));
  const [name,setName]=useState("");

  
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

  return (
    <div className="absolute right-0 flex items-center">
      <Link to={"/login"}>
        <button onClick={(e)=>{setSavedToken(localStorage.removeItem("token"))}} className="text-sm mr-3 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
          LogOut
        </button>
      </Link>

      <div></div>
      <h1 className="text-white ml-[5px] mr-[10px] text-xl cursor-pointer">
        {name}
      </h1>
      <div className="pr-4">
      <img className="rounded-full w-[80px] h-[80px]" src={props.image} />
      </div>
      
    </div>
  );
}

export default UserData;
